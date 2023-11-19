from typing import Type

from fastapi import HTTPException, Depends
from loguru import logger
from sqlalchemy.orm import Session, joinedload

from timable_backend.db.db_models import UserModelDB
from timable_backend.db.session import get_db
from timable_backend.models import UserBase
from timable_backend.services.jwt_session import hash_password


def create_db_user(user: UserBase):
    new_user = UserModelDB(
        username=user.username,
        password=hash_password(user.password),
        email=user.email,
        is_admin=user.is_admin,
        name=user.name,
        surname=user.surname,
        phone=user.phone,
    )
    return new_user


def get_db_user_by_id(id: int, db: Session) -> UserModelDB:
    user = db.query(UserModelDB).filter(UserModelDB.id == id).options(
        joinedload(UserModelDB.pins),
        joinedload(UserModelDB.votes)
    ).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def get_db_user_by_username(username: str, db: Session) -> UserModelDB:
    user = db.query(UserModelDB).filter(UserModelDB.username == username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def commit_user_to_db(user: UserModelDB, db: Session, add_user=False):
    try:
        if add_user:
            db.add(user)
        db.commit()
        db.refresh(user)
    except Exception as e:
        logger.error(f"Couldn't add user {user} to db. Reason: {e}")
        raise e


def get_users_pins_votes(db: Session = Depends(get_db)) -> list[Type[UserModelDB]]:
    return db.query(UserModelDB).options(
        joinedload(UserModelDB.pins),
        joinedload(UserModelDB.votes)
    ).all()
