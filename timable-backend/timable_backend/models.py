from pydantic import BaseModel, Field


class UserModel(BaseModel):
    username: str = Field(description="The user's username")
    email: str = Field(description="The user's email")
    password: str = Field(description="The user's password")
    is_admin: bool = Field(description="Whether the user is an admin")