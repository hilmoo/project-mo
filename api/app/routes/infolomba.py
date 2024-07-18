import random
import re
import string
from datetime import datetime, timezone

import instaloader
from fastapi import APIRouter, Body, File, Response, status, UploadFile
from firebase_admin import db, firestore
from google.cloud.firestore_v1.base_query import FieldFilter
from PIL import Image
import requests

from app.config import HARDCODED_SECRET, FirebaseConfig, R2Config
from app.config.cloudflareR2 import r2
from app.config.gemini import get_competition_data
from app.func.infolomba import (
    check_unique_items,
    find_difference,
    short_ig_url,
    turnstile,
)
from app.models.infolomba import (
    Category,
    Competition,
    CompetitionArr,
    CompetitionForm,
    CompetitionGemini,
    OkResponseCompetitionGemini,
    OkResponseCompetition,
    OkResponseCompetitionArr,
)
from app.models.response import ErrorResponse, OkResponse

router = APIRouter(
    prefix="/v1/infolomba",
    tags=["infolomba"],
)


# region GET
@router.get(
    "/home",
    summary="get_competion_list",
    description="Endpoint to get Competition objects in bulk",
)
async def read_home() -> OkResponseCompetitionArr:
    data = []
    field_filter = FieldFilter("deadline", ">=", datetime.now(timezone.utc))

    docs = (
        firestore.client()
        .collection(FirebaseConfig.COLLECTION_INFOLOMBA)
        .where(filter=field_filter)
        .order_by("deadline")
        .get()
    )
    for doc in docs:
        data.append(doc.to_dict())

    competition = CompetitionArr(data)
    return OkResponseCompetitionArr(
        success=True, data=competition.model_dump()
    ).model_dump()


@router.get(
    "/detail/{competition_id}",
    summary="get_competiion",
    description="Endpoint to retrieve a single Competition object",
    responses={404: {"model": ErrorResponse}, 200: {"model": OkResponseCompetition}},
)
async def read_competition(
    competition_id: str,
    response: Response,
):
    field_filter = FieldFilter("id", "==", competition_id)

    docs = (
        firestore.client()
        .collection(FirebaseConfig.COLLECTION_INFOLOMBA)
        .where(filter=field_filter)
        .order_by("deadline")
        .get()
    )

    try:
        competition = Competition(**docs[0].to_dict())
        return OkResponseCompetition(
            success=True, data=competition.model_dump()
        ).model_dump()
    except Exception:
        response.status_code = status.HTTP_404_NOT_FOUND
        return ErrorResponse(
            success=False, errors=["Competition not found"]
        ).model_dump()


@router.get(
    "/category",
    summary="get_competiion_category",
    description="Endpoint to get all available categories",
)
async def read_category() -> list[Category]:
    category_ref = db.reference(FirebaseConfig.REF_INFOLOMBA_CATEGORY).get()
    categories_list = [
        {"id": key, "name": value} for key, value in category_ref.items()
    ]
    return categories_list


# endregion


# region POST
@router.post(
    "/upload",
    summary="post_competition",
    description="Endpoint to create a new Competition object",
    responses={
        200: {"model": OkResponseCompetition},
        403: {"model": ErrorResponse},
        413: {"model": ErrorResponse},
        415: {"model": ErrorResponse},
        422: {"model": ErrorResponse},
    },
)
async def upload_competition(
    response: Response,
    data: CompetitionForm,
    captcha: str = Body(...),
    img_url: str = Body(None),
    image: UploadFile = File(None),
):
    captcha_response = await turnstile(captcha)
    if not captcha_response.success:
        response.status_code = status.HTTP_403_FORBIDDEN
        return ErrorResponse(
            success=False, errors=captcha_response.error_code
        ).model_dump()

    if (img_url and image) or (not img_url and not image):
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return ErrorResponse(
            success=False,
            errors=["Provide at least one image URL or image but not both"],
        ).model_dump()

    if image:
        if image.size > 5 * 1024**2:
            response.status_code = status.HTTP_413_REQUEST_ENTITY_TOO_LARGE
            return ErrorResponse(
                success=False, errors=["Image size too large"]
            ).model_dump()

        try:
            img = Image.open(image.file)
            img.verify()
        except Exception:
            response.status_code = status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
            await image.close()
            return ErrorResponse(
                success=False, errors=["Invalid image file"]
            ).model_dump()

        if image.content_type not in ["image/jpeg", "image/png"]:
            response.status_code = status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
            return ErrorResponse(
                success=False, errors=["Image type not supported"]
            ).model_dump()

    category_ref = db.reference(FirebaseConfig.REF_INFOLOMBA_CATEGORY).get()
    categories_list = [
        {"id": key, "name": value} for key, value in category_ref.items()
    ]
    name_to_dict = {entry["name"]: entry for entry in categories_list}
    category_list = [
        name_to_dict[name] for name in data.category if name in name_to_dict
    ]
    try:
        check_unique_items(category_list)
    except ValueError as e:
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return ErrorResponse(success=False, errors=[str(e)]).model_dump()
    try:
        find_difference(category_list, categories_list)
    except ValueError as e:
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return ErrorResponse(success=False, errors=[str(e)]).model_dump()

    name_safe = re.sub(r"[^a-zA-Z0-9]", "-", data.name).lower()
    random_str = "".join(random.choices(string.ascii_letters + string.digits, k=5))
    name_safe_random = f"{name_safe}-{random_str}"
    if image:
        name_safe_content = (
            f"infolomba/{name_safe_random}.{image.filename.split('.')[-1]}"
        )
        try:
            contents = image.file.read()
            image.file.seek(0)
            r2.meta.client.upload_fileobj(
                image.file,
                Key=name_safe_content,
                Bucket=R2Config.BUCKET,
            )
        except Exception as e:
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            return ErrorResponse(success=False, errors=[str(e)]).model_dump()
        finally:
            image.file.close()
    if img_url:
        name_safe_content = f"infolomba/{name_safe_random}.jpg"
        try:
            response_img = requests.get(img_url)
            r2.meta.client.put_object(
                Body=response_img.content,
                Key=name_safe_content,
                Bucket=R2Config.BUCKET,
            )
        except Exception as e:
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            return ErrorResponse(success=False, errors=[str(e)]).model_dump()

    data = {
        "id": name_safe_random,
        "name": data.name,
        "organizer": data.organizer,
        "url": data.url,
        "deadline": data.deadline,
        "description": data.description,
        "category": category_list,
        "image": f"https://r2.hilmo.my.id/{name_safe_content}",
        "upload_date": datetime.now(),
    }
    try:
        firestore.client().collection(FirebaseConfig.COLLECTION_INFOLOMBA).add(data)
    except Exception as e:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return ErrorResponse(success=False, errors=[str(e)]).model_dump()

    result = Competition(**data)
    db.reference(FirebaseConfig.REF_INFOLOMBA_POST).set(
        db.reference(FirebaseConfig.REF_INFOLOMBA_POST).get() + 1
    )
    return OkResponseCompetition(success=True, data=result.model_dump()).model_dump()


@router.post(
    "/impor",
    summary="post_import_competition",
    description="Endpoint to import a competition from Instagram post",
    responses={
        200: {"model": OkResponseCompetitionGemini},
        403: {"model": ErrorResponse},
        404: {"model": ErrorResponse},
    },
)
async def import_competition(
    response: Response, url_ig: str = Body(...), captcha: str = Body(...)
):
    captcha_response = await turnstile(captcha)
    if not captcha_response.success:
        response.status_code = status.HTTP_403_FORBIDDEN
        return ErrorResponse(
            success=False, errors=captcha_response.error_code
        ).model_dump()

    L = instaloader.Instaloader()
    short_ig = short_ig_url(url_ig)
    try:
        post = instaloader.Post.from_shortcode(L.context, short_ig)
    except Exception:
        response.status_code = status.HTTP_404_NOT_FOUND
        return ErrorResponse(success=False, errors=["Post not found"]).model_dump()

    gemini = get_competition_data(post.caption)
    if not gemini:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return ErrorResponse(success=False, errors=gemini.errors).model_dump()
    if gemini["last_registration_date"] == "None":
        gemini["last_registration_date"] = datetime.now()
    else:
        gemini["last_registration_date"] = datetime.fromisoformat(
            gemini["last_registration_date"]
        )
    result = CompetitionGemini(
        name=gemini["competition_name"],
        organizer=gemini["organizer"],
        url=gemini["register_link"],
        deadline=gemini["last_registration_date"],
        description=post.caption,
        url_image=post.url,
    )

    return OkResponseCompetitionGemini(
        success=True, data=result.model_dump()
    ).model_dump()


# endregion


# region DELETE
@router.delete(
    "/clear",
    summary="delete_competition",
    description="Endpoint to delete all expired Competition objects",
    responses={
        200: {"model": OkResponse},
        403: {"model": ErrorResponse},
    },
)
async def clear_competition(
    response: Response,
    auth: str = Body(...),
):
    if auth != HARDCODED_SECRET:
        response.status_code = status.HTTP_403_FORBIDDEN
        return ErrorResponse(success=False, errors=["Invalid secret key"]).model_dump()

    field_filter = FieldFilter("deadline", "<=", datetime.now(timezone.utc))
    docs = (
        firestore.client()
        .collection(FirebaseConfig.COLLECTION_INFOLOMBA)
        .where(filter=field_filter)
        .get()
    )

    for doc in docs:
        data = Competition(**doc.to_dict())
        r2.meta.client.delete_object(
            Key=data.image.split("r2.hilmo.my.id/")[-1], Bucket=R2Config.BUCKET
        )

        firestore.client().collection(FirebaseConfig.COLLECTION_INFOLOMBA).document(
            doc.id
        ).delete()

    return OkResponse(
        success=True, message=[f"succsess delete {len(docs)} competition"]
    ).model_dump()


# endregion
