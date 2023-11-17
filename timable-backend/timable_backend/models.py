from enum import Enum

from pydantic import BaseModel, Field


class UserModel(BaseModel):
    username: str = Field(description="The user's username")
    email: str = Field(description="The user's email")
    password: str = Field(description="The user's password")
    is_admin: bool = Field(description="Whether the user is an admin")


class PinStatusEnum (Enum):
    GOOD = "good"
    BAD = "bad"
    CLOSED = "closed"

class PinModel(BaseModel):
    latitude: float = Field(description="The pin's latitude")
    longitude: float = Field(description="The pin's longitude")
    status: PinStatusEnum = Field(description="The status of the pin")
    image_url: str = Field(description="The URL of the Image")
    type: str = Field(description="The pin's category")
    user_id: int = Field(description="The ID of the user that created the pin")