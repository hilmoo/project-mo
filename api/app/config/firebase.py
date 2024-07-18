from . import FirebaseConfig
from firebase_admin import credentials


def firebase_json() -> dict:
    return {
        "type": FirebaseConfig.FIREBASE_TYPE,
        "project_id": FirebaseConfig.FIREBASE_PROJECT_ID,
        "private_key_id": FirebaseConfig.FIREBASE_PRIVATE_KEY_ID,
        "private_key": FirebaseConfig.FIREBASE_PRIVATE_KEY,
        "client_email": FirebaseConfig.FIREBASE_CLIENT_EMAIL,
        "client_id": FirebaseConfig.FIREBASE_CLIENT_ID,
        "auth_uri": FirebaseConfig.FIREBASE_AUTH_URI,
        "token_uri": FirebaseConfig.FIREBASE_TOKEN_URI,
        "auth_provider_x509_cert_url": FirebaseConfig.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": FirebaseConfig.FIREBASE_CLIENT_X509_CERT_URL,
    }


cred = credentials.Certificate(firebase_json())
storageBucket = FirebaseConfig.FIREBASE_STORAGE_BUCKET
databaseURL = FirebaseConfig.FIREBASE_DATABASE_URL
