from enum import Enum
from pydantic import BaseModel, Field


class UserBase(BaseModel):
    username: str = Field(description="The user's username")
    email: str = Field(description="The user's email")
    password: str = Field(description="The user's password")
    is_admin: bool = Field(description="Whether the user is an admin", default=False)
    name: str | None = Field(description="The user's name", default=None)
    surname: str | None = Field(description="The user's surname", default=None)
    phone: str = Field(description="The user's phone number")
    is_visually_impaired: bool | None = Field(description="Whether the user is visually impaired", default=False)


class UserEdit(BaseModel):
    """
    UserBase with optional fields
    """
    username: str | None = Field(description="The user's username", default=None)
    email: str | None = Field(description="The user's email", default=None)
    password: str | None = Field(description="The user's password", default=None)
    is_admin: bool | None = Field(description="Whether the user is an admin", default=None)
    name: str | None = Field(description="The user's name", default=None)
    surname: str | None = Field(description="The user's surname", default=None)
    phone: str | None = Field(description="The user's phone number", default=None)
    profile_pic_url: str | None = Field(description="The URL of the user's profile picture", default=None)
    is_visually_impaired: bool | None = Field(description="Whether the user is visually impaired", default=False)


class UserExtended(UserBase):
    profile_pic_url: str | None = Field(description="The URL of the user's profile picture")


class UserComplete(UserExtended):
    id: int = Field(description="The ID of the user")


class PinStatusEnum(Enum):
    GOOD = "good"
    BAD = "bad"
    CLOSED = "closed"


class ResourceLocationEnum(Enum):
    PROFILE_PICS = "profile_pics"
    PIN_PICS = "pin_pics"


class PinTagEnum(Enum):
    PARKING = "parking"


class PinModel(BaseModel):
    latitude: float = Field(description="The pin's latitude")
    longitude: float = Field(description="The pin's longitude")
    status: PinStatusEnum = Field(description="The status of the pin")
    tag: PinTagEnum | None = Field(description="The tag of the pin", default=None)
    disability_types: list[str] = Field(
        description="The type of disability the pin is for"
    )
    user_id: int = Field(description="The ID of the user that created the pin")
    description: str | None = Field(
        description="A description of the pin", default=None
    )
    is_anonymous: bool | None = Field(description="Whether the vote is anonymous", default=False)


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


class VoteExtended(VoteModel):
    id: int | None = Field(description="The ID of the vote", default=None)


class MapPointModel(BaseModel):
    latitude: int = Field(description="Latitude of the point", default=0.0)
    longitude: int = Field(description="Longitude of the point", default=0.0)
