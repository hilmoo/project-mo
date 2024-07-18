import os

from dotenv import load_dotenv

load_dotenv()

PROD_ORIGINS = os.getenv("PROD_ORIGINS")
TURNSTILE_SECRET_KEY = os.getenv("TURNSTILE_SECRET_KEY")
HARDCODED_SECRET = os.getenv("HARDCODED_SECRET")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

class FirebaseConfig:
    FIREBASE_TYPE = os.getenv("FIREBASE_type")
    FIREBASE_PROJECT_ID = os.getenv("FIREBASE_project_id")
    FIREBASE_PRIVATE_KEY_ID = os.getenv("FIREBASE_private_key_id")
    FIREBASE_PRIVATE_KEY = os.getenv("FIREBASE_private_key").replace("\\n", "\n")
    FIREBASE_CLIENT_EMAIL = os.getenv("FIREBASE_client_email")
    FIREBASE_CLIENT_ID = os.getenv("FIREBASE_client_id")
    FIREBASE_AUTH_URI = os.getenv("FIREBASE_auth_uri")
    FIREBASE_TOKEN_URI = os.getenv("FIREBASE_token_uri")
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL = os.getenv(
        "FIREBASE_auth_provider_x509_cert_url"
    )
    FIREBASE_CLIENT_X509_CERT_URL = os.getenv("FIREBASE_client_x509_cert_url")
    FIREBASE_UNIVERSE_DOMAIN = os.getenv("FIREBASE_universe_domain")
    FIREBASE_STORAGE_BUCKET = os.getenv("FIREBASE_storageBucket")
    FIREBASE_DATABASE_URL = os.getenv("FIREBASE_databaseURL")
    COLLECTION_INFOLOMBA = os.getenv("COLLECTION_fire_infolomba")
    REF_INFOLOMBA_CATEGORY = os.getenv("REF_fire_infolomba_category")
    REF_INFOLOMBA_POST = os.getenv("REF_fire_infolomba_post")


class R2Config:
    CLOUDFLARE_R2_TOKEN_VALUE = os.getenv("CLOUDFLARE_R2_token_value")
    CLOUDFLARE_R2_ACCESS_KEY_ID = os.getenv("CLOUDFLARE_R2_access_key_id")
    CLOUDFLARE_R2_SECRET_ACCESS_KEY = os.getenv("CLOUDFLARE_R2_secret_access_key")
    CLOUDFLARE_R2_API_ENDPOINT = os.getenv("CLOUDFLARE_R2_api_endpoint")
    CLOUDFLARE_R2_CUSTOM_ENDPOINT = os.getenv("CLOUDFLARE_R2_custom_endpoint")
    BUCKET = os.getenv("BUCKET_r2")
