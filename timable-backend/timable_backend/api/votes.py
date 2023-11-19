from fastapi import APIRouter, HTTPException, Depends
from loguru import logger

from timable_backend.db.db_models import VoteModelDB
from timable_backend.db.session import get_db
from timable_backend.models import VoteModel, VoteExtended
from timable_backend.services.pin import get_pin_by_id
from timable_backend.services.users import get_db_user_by_id
from timable_backend.services.vote import get_vote_by_id

router = APIRouter(tags=["vote"])


@router.get("/vote", description="Get all votes", response_model=list[VoteExtended])
async def get_votes(db=Depends(get_db)):
    return db.query(VoteModelDB).all()


@router.get("/vote/{id}", description="Get a vote by ID", response_model=VoteExtended)
async def get_vote(id: int, db=Depends(get_db)):
    return get_vote_by_id(id, db)


@router.post("/vote", description="Create a vote", response_model=VoteExtended)
async def create_vote(vote: VoteModel, db=Depends(get_db)):
    get_db_user_by_id(vote.user_id, db)
    get_pin_by_id(vote.pin_id, db)
    vote_exists = (
        db.query(VoteModelDB)
        .filter(VoteModelDB.user_id == vote.user_id, VoteModelDB.pin_id == vote.pin_id)
        .first()
    )
    if vote_exists:
        raise HTTPException(status_code=403, detail=f"A vote for this pin already exists for this user.")
    new_vote = VoteModelDB(
        user_id=vote.user_id, pin_id=vote.pin_id, state=vote.state.value
    )
    try:
        db.add(new_vote)
        db.commit()
        db.refresh(new_vote)
    except Exception as e:
        logger.exception(e)
        raise HTTPException(status_code=500, detail=f"Couldn't create vote. {str(e)}")
    return new_vote


@router.patch("/vote/{id}", description="Update a vote by ID", response_model=VoteExtended)
async def update_vote(id: int, vote: VoteModel, db=Depends(get_db)):
    db_vote = get_vote_by_id(id, db)
    if db_vote.state == vote.state.value:
        return db_vote
    db_vote.state = vote.state.value
    db.commit()
    return db_vote


@router.delete(
    "/vote/{id}", description="Delete a vote by ID", response_model=VoteExtended
)
async def delete_vote(vote_id: int, db=Depends(get_db)):
    found_vote = get_vote_by_id(vote_id, db)
    try:
        db.delete(found_vote)
        db.commit()
        logger.info(f"Vote with id {vote_id} has been successfully deleted")
    except Exception as e:
        logger.error(f"Couldn't delete vote with id{vote_id}. Reason: {e}")
        raise HTTPException(status_code=403, detail=f"Couldn't delete vote.")
