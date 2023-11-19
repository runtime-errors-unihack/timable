from datetime import datetime, timedelta, timezone

import bcrypt
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2PasswordBearer
from loguru import logger
from passlib.context import CryptContext
from jose import jwt
from starlette import status

from timable_backend.db.db_models import UserModelDB
from timable_backend.models import UserComplete

JWT_ISSUER = "timable"

secret = "really-secret-key"


def create_jwt_session(user: UserModelDB):
    expire = datetime.utcnow() + timedelta(hours=3)
    expire = expire.replace(tzinfo=timezone.utc)  # Make it timezone-aware
    encoded_user = UserComplete.model_validate(user.__dict__).model_dump()
    encoded_user["exp"] = expire
    encoded_user["iat"] = datetime.utcnow().replace(tzinfo=timezone.utc)
    encoded_user["sub"] = str(user.id)
    encoded_user["iss"] = JWT_ISSUER
    print(encoded_user)
    return jwt.encode(
        encoded_user,
        secret,
        algorithm="HS256"
    )


def get_jwt_session(token: str):
    try:
        decoded_token = jwt.decode(
            token,
            secret,
            algorithms=["HS256"]
        )
        # decoded_token["exp"] will be an int, make a date out of it
        exp_date = datetime.fromtimestamp(decoded_token["exp"], tz=timezone.utc)
        if datetime.now(timezone.utc) > exp_date:
            raise HTTPException(status_code=401, detail="Token expired.")
        if decoded_token["iss"] != JWT_ISSUER:
            raise HTTPException(status_code=401, detail="Invalid token.")
        if decoded_token["sub"] is None:
            raise HTTPException(status_code=401, detail="Invalid token.")
        return decoded_token
    except Exception as e:
        logger.exception(f"Invalid token. Details: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid token.")


def verify_password(plain_text_password: str, hashed_password: str):
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    return pwd_context.verify(plain_text_password, hashed_password)


def hash_password(plain_text_password: str):
    bytecode_password = plain_text_password.encode('UTF-8')
    hashed_password = bcrypt.hashpw(
        bytecode_password,
        bcrypt.gensalt()
    )
    return hashed_password


# bearer with CreateSession body
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/session", scheme_name="Bearer")


def get_current_session(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token = token.replace("Bearer ", "")
        payload = get_jwt_session(token)
    except HTTPException as e:
        raise credentials_exception from e

    return payload


