from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session

from ..db.db_models import UserModelDB
from ..db.session import get_db
from ..models import UserBase, UserExtended
from ..services.users import create_db_user, hash_password, commit_user_to_db, get_db_user

router = APIRouter(tags=["users"])


@router.post("/users", description="Create a user", response_model=UserExtended)
async def create_user(user: UserBase, db: Session = Depends(get_db)):
    new_user = create_db_user(user)
    commit_user_to_db(new_user, db, True)
    return new_user


@router.get("/users", description="Get all users")
async def get_users(db: Session = Depends(get_db)):
    return db.query(UserModelDB).all()


@router.get("/users/{id}", description="Get a user by id")
async def get_user(id: int, db: Session = Depends(get_db)):
    return get_db_user(id, db)


@router.patch("/users/{id}", description="Update a user by id", response_model=UserExtended)
async def update_user(id: int, user: UserExtended, path_to_file: str | None = None, db: Session = Depends(get_db)):
    db_user = db.query(UserModelDB).filter(UserModelDB.id == id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in user:
        if hasattr(db_user, key):
            setattr(db_user, key, value)
        if key == 'password':
            setattr(db_user, 'password', hash_password(user.password))
        if key == 'profile_pic_url' and path_to_file:
            setattr(db_user, key, path_to_file)

    commit_user_to_db(db_user, db)
    return db_user
