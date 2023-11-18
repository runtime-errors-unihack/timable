from typing import Optional
from enum import Enum
from pydantic import BaseModel, Field


class UserBase(BaseModel):
    username: str = Field(description="The user's username")
    email: str = Field(description="The user's email")
    password: str = Field(description="The user's password")
    is_admin: bool = Field(description="Whether the user is an admin", default=False)
    profile_pic_url: str = Field(description="The user's profile picture location")
    name: str = Field(description="The user's name")
    surname: str = Field(description="The user's surname")
    phone: str = Field(description="The user's phone number")


class PinStatusEnum(Enum):
    GOOD = "good"
    BAD = "bad"
    CLOSED = "closed"


class PinModel(BaseModel):
    latitude: float = Field(description="The pin's latitude")
    longitude: float = Field(description="The pin's longitude")
    status: PinStatusEnum = Field(description="The status of the pin")
    image_url: str = Field(description="The URL of the Image")
    disability_types: list[str] = Field(description="The type of disability the pin is for")
    user_id: int = Field(description="The ID of the user that created the pin")


class CreateSessionModel(BaseModel):
    username: str = Field(description="The user's username")
    password: str = Field(description="The user's password")