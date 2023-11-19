from fastapi import HTTPException, Depends
from fastapi import APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from loguru import logger

from timable_backend.db.session import get_db
from timable_backend.models import UserComplete
from timable_backend.services.users import get_db_user_by_username, get_db_user_by_id
from timable_backend.services.jwt_session import create_jwt_session, get_jwt_session, verify_password

router = APIRouter(tags=["session"])


@router.post("/session", description="Create a session")
async def create_session(form_data: OAuth2PasswordRequestForm = Depends(), db=Depends(get_db)):
    try:
        user = get_db_user_by_username(form_data.username, db)
    except HTTPException as e:
        logger.error(f"User login failed: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid username or password")
    if not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return create_jwt_session(user)


@router.get("/session", description="Get the current session", response_model=UserComplete)
async def get_session(session: str, db=Depends(get_db)):
    """
    This will receive a JWT token and return the user's id, username, and is_admin flag.
    """
    decoded_token = get_jwt_session(session)
    return get_db_user_by_id(decoded_token["sub"], db)