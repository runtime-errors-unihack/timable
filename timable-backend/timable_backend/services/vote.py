from fastapi import HTTPException
from sqlalchemy.orm import Session

from timable_backend.db.db_models import VoteModelDB


def get_vote_by_id(vote_id: int, db: Session):
    found_vote = db.query(VoteModelDB).filter(VoteModelDB.id == vote_id).first()
    if not found_vote:
        raise HTTPException(status_code=404, detail=f"Vote not found.")
    return found_vote
