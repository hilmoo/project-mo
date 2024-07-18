from . import R2Config
import boto3

r2 = boto3.resource(
    "s3",
    endpoint_url=R2Config.CLOUDFLARE_R2_API_ENDPOINT,
    aws_access_key_id=R2Config.CLOUDFLARE_R2_ACCESS_KEY_ID,
    aws_secret_access_key=R2Config.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
)
