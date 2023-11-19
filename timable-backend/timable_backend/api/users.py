from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from loguru import logger
from sqlalchemy.orm import Session, joinedload

from ..db.db_models import UserModelDB
from ..db.session import get_db
from ..models import UserBase, UserExtended, UserComplete, UserEdit
from ..services.users import create_db_user, commit_user_to_db, get_db_user_by_id, get_users_pins_votes
from ..services.jwt_session import hash_password

router = APIRouter(tags=["users"])


@router.post("/users", description="Create a user", response_model=UserComplete)
async def create_user(user: UserBase, db: Session = Depends(get_db)):
    new_user = create_db_user(user)
    commit_user_to_db(new_user, db, True)
    return new_user


@router.get("/users", description="Get all users")
async def get_users(db: Session = Depends(get_db)):
    # for each user, also add it's votes and pins
    return get_users_pins_votes(db)


@router.get("/users/{id}", description="Get a user by id")
async def get_user(id: int, db: Session = Depends(get_db)):
    return get_db_user_by_id(id, db)


@router.patch("/users/{id}", description="Update a user by id", response_model=UserComplete)
async def update_user(id: int, user: UserEdit, db: Session = Depends(get_db)):
    db_user = db.query(UserModelDB).filter(UserModelDB.id == id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in user:
        if hasattr(db_user, key) and value is not None:
            logger.debug(f"Changed field {key} to {value} for user {id}")
            setattr(db_user, key, value)
        if key == 'password' and user.password:
            setattr(db_user, 'password', hash_password(user.password))

    commit_user_to_db(db_user, db)
    return db_user
