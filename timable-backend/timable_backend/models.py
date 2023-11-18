from enum import Enum
from pydantic import BaseModel, Field


class UserBase(BaseModel):
    username: str = Field(description="The user's username")
    email: str = Field(description="The user's email")
    password: str = Field(description="The user's password")
    is_admin: bool = Field(description="Whether the user is an admin", default=False)
    name: str = Field(description="The user's name")
    surname: str = Field(description="The user's surname")
    phone: str = Field(description="The user's phone number")


class UserExtended(UserBase):
    profile_pic_url: str = None


class PinStatusEnum(Enum):
    GOOD = "good"
    BAD = "bad"
    CLOSED = "closed"


class ResourceLocationEnum(Enum):
    PROFILE_PICS = "profile_pics"
    PIN_PICS = "pin_pics"


class PinModel(BaseModel):
    latitude: float = Field(description="The pin's latitude")
    longitude: float = Field(description="The pin's longitude")
    status: PinStatusEnum = Field(description="The status of the pin")
    image_url: str = Field(description="The URL of the Image")
    disability_types: list[str] = Field(
        description="The type of disability the pin is for"
    )
    user_id: int = Field(description="The ID of the user that created the pin")
    description: str | None = Field(
        description="A description of the pin", default=None
    )


class CreateSessionModel(BaseModel):
    username: str = Field(description="The user's username")
    password: str = Field(description="The user's password")


class VoteStateEnum(Enum):
    POSITIVE = "positive"
    NEUTRAL = "neutral"
    NEGATIVE = "negative"


class VoteModel(BaseModel):
    user_id: int = Field(description="The ID of the user that votes the pin")
    pin_id: int = Field(description="The ID of the pin")
    state: VoteStateEnum = Field(description="The type of the vote")
    is_anonymous: bool = Field(description="Whether the vote is anonymous", default=False)


class VoteExtended(VoteModel):
    id: int | None = Field(description="The ID of the vote", default=None)