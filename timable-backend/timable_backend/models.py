from typing import Optional

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
