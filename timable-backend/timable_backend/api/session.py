from fastapi import APIRouter

router = APIRouter(tags=["session"])


@router.post("/session", description="Create a session")
async def create_session():
    """
    This will receive a username and password, and return a JWT token.
    In the JWT we'll encode the user's id, username, and is_admin flag. Make sure there's an expiration time.
    :return:
    """
    return {"status": "ok"}

@router.get("/session", description="Get the current session")
async def get_session():
    """
    This will receive a JWT token and return the user's id, username, and is_admin flag.
    """
    return {"status": "ok"}