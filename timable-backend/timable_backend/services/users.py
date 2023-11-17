import bcrypt
from loguru import logger
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from timable_backend.db.db_models import UserModelDB
from timable_backend.models import UserBase


def hash_password(plain_text_password: str):
    bytecode_password = plain_text_password.encode('UTF-8')
    hashed_password = bcrypt.hashpw(
        bytecode_password,
        bcrypt.gensalt()
    )
    return hashed_password


def verify_password(plain_text_password: str, hashed_password: str):
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    return pwd_context.verify(plain_text_password, hashed_password)


def create_db_user(user: UserBase):
    new_user = UserModelDB(
        username=user.username,
        password=hash_password(user.password),
        email=user.email,
        is_admin=user.is_admin,                 #TODO
        profile_pic_url=user.profile_pic_url,   #TODO
        name=user.name,
        surname=user.surname,
        phone=user.phone
    )
    return new_user


def commit_user_to_db(user: UserModelDB, db: Session, add_user=False):
    try:
        if add_user:
            db.add(user)
        db.commit()
        db.refresh(user)
    except Exception as e:
        logger.error(f"Couldn't add user {user} to db. Reason: {e}")
        raise e
