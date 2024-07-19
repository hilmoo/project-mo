import json
from datetime import datetime

from pydantic import BaseModel, Field, model_validator, RootModel


class Category(BaseModel):
    id: str
    name: str


class Competition(BaseModel):
    id: str
    name: str
    description: str
    organizer: str
    url: str
    image: str
    category: list[Category]
    deadline: datetime
    upload_date: datetime


class OkResponseCompetition(BaseModel):
    success: bool
    data: Competition


class CompetitionSimple(BaseModel):
    id: str
    name: str
    organizer: str
    image: str
    category: list[Category]
    deadline: datetime
    upload_date: datetime


class CompetitionArr(RootModel):
    root: list[CompetitionSimple]


class OkResponseCompetitionArr(BaseModel):
    success: bool
    data: CompetitionArr


class CompetitionForm(BaseModel):
    name: str
    description: str
    organizer: str
    url: str
    category: list[str]
    deadline: datetime

    @model_validator(mode="before")
    @classmethod
    def validate_to_json(cls, value):
        if isinstance(value, str):
            return cls(**json.loads(value))
        return value


class CompetitionGemini(BaseModel):
    name: str
    description: str
    organizer: str
    url: str
    deadline: datetime
    url_image: str


class OkResponseCompetitionGemini(BaseModel):
    success: bool
    data: CompetitionGemini
