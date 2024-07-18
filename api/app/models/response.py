from datetime import datetime
from pydantic import BaseModel


class OkResponse(BaseModel):
    success: bool
    message: list[str]


class ErrorResponse(BaseModel):
    success: bool
    errors: list[str]


class TurnstileRes(BaseModel):
    success: bool
    error_code: list[str]
    challenge_ts: datetime = None
    hostname: str = None
    message: str = None
