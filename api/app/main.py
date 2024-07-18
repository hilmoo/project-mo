import firebase_admin
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_redoc_html
from fastapi.openapi.utils import get_openapi

from app.config import PROD_ORIGINS
from app.config.firebase import cred, databaseURL, storageBucket
from app.routes import infolomba

app = FastAPI(docs_url=None, redoc_url=None)
firebase_admin.initialize_app(
    cred, {"storageBucket": storageBucket, "databaseURL": databaseURL}
)


origins = [
    PROD_ORIGINS,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
async def root():
    return {"message": "Hello World"}


@app.get("/v1", include_in_schema=False)
def overridden_redoc():
    return get_redoc_html(
        openapi_url="/openapi.json",
        title="API | Project MO Docs",
        redoc_favicon_url="https://raw.githubusercontent.com/hilmoo/hilmoo/main/public_logo/logo.svg",
    )


app.include_router(infolomba.router)


def openapi_root():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Project MO",
        version="v1",
        summary="All API endpoints for Project MO",
        routes=app.routes,
    )
    openapi_schema["info"]["x-logo"] = {
        "url": "https://raw.githubusercontent.com/hilmoo/hilmoo/main/public_logo/API.png"
    }
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = openapi_root
