from fastapi import HTTPException, Depends
from fastapi import APIRouter
from loguru import logger

from timable_backend.db.session import get_db
from timable_backend.models import CreateSessionModel, UserBase
from timable_backend.services.users import get_db_user_by_username
from timable_backend.services.jwt_session import create_jwt_session, get_jwt_session, verify_password

router = APIRouter(tags=["session"])


@router.post("/session", description="Create a session")
async def create_session(session: CreateSessionModel, db=Depends(get_db)):
    try:
        user = get_db_user_by_username(session.username, db)
    except HTTPException as e:
        logger.error(f"User login failed: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid username or password")
    if not verify_password(session.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return create_jwt_session(user)


@router.get("/session", description="Get the current session", response_model=UserBase)
async def get_session(session: str):
    """
    This will receive a JWT token and return the user's id, username, and is_admin flag.
    """
    #TODO: return fresh info about the user
    return get_jwt_session(session)