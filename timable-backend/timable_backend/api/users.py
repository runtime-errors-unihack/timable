from fastapi import APIRouter

from timable_backend.models import UserModel

router = APIRouter(tags=["users"])


@router.post("/users", description="Create a user")
async def create_user(user: UserModel):
    # TODO: use the UserRepo.get() method to check if the user already exists, if not throw an exception
    return {"status": "ok"}


@router.get("/users", description="Get all users")
async def get_users():

    return {"status": "ok"}

@router.get("/users/{user_id}", description="Get a user by id")
async def get_user(user_id: int):
    return {"status": "ok"}


@router.patch("/users/{user_id}", description="Update a user by id")
async def update_user(user_id: int):
    return {"status": "ok"}
