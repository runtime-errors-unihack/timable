from datetime import datetime, timedelta
from enum import Enum

from fastapi import APIRouter, HTTPException, Depends
from loguru import logger
from sqlalchemy import func, cast, Integer
from sqlalchemy.orm import joinedload

from timable_backend.db.db_models import PinModelDB, DisabilityTypeModelDB, VoteModelDB
from timable_backend.db.session import get_db
from timable_backend.models import PinModel, PinStatusEnum, VoteModel, PinTagEnum
from timable_backend.services.pin import get_pin_by_id

router = APIRouter(tags=["pin"])


@router.post("/pin", description="Create a pin")
async def create_pin(pin: PinModel, db=Depends(get_db)):
    disability_types = [db.query(DisabilityTypeModelDB).filter_by(name=name).first() for name in pin.disability_types]
    if not all(disability_types):
        raise HTTPException(status_code=404, detail=f"Disability type not found.")

    # Create the new pin with the disability_type relationship
    new_pin = PinModelDB(
        latitude=pin.latitude,
        longitude=pin.longitude,
        status=pin.status.value,
        tag=pin.tag.value if pin.tag else None,
        disability_types=disability_types,  # List containing DisabilityTypeModelDB objects
        user_id=pin.user_id,
        description=pin.description,
        is_anonymous=pin.is_anonymous,
    )

    try:
        db.add(new_pin)
        db.commit()
        db.refresh(new_pin)
    except Exception as e:
        logger.exception(e)
        raise HTTPException(status_code=500, detail=f"Couldn't create pin. {str(e)}")

    return db.query(PinModelDB).options(
        joinedload(PinModelDB.disability_types),
        joinedload(PinModelDB.user)
    ).filter_by(id=new_pin.id).first()


@router.get("/pin", description="Get all pins by type")
async def get_pins(
    disability_type: str | None = None,
    months_ago: int | None = None,
    min_votes: int | None = None,
    max_votes: int | None = None,
    status: PinStatusEnum | None = None,
    tag: PinTagEnum | None = None,
    db=Depends(get_db)
):
    # Filter by disability type
    if not disability_type:
        query = db.query(PinModelDB).options(
            joinedload(PinModelDB.disability_types),
            joinedload(PinModelDB.user),
            joinedload(PinModelDB.votes)
        )
    else:
        disability_type_instance = db.query(DisabilityTypeModelDB).filter_by(name=disability_type).first()

        if not disability_type_instance:
            raise HTTPException(status_code=404, detail=f"Disability type not found.")

        # Base query with disability type and joined loads
        query = db.query(PinModelDB).options(
            joinedload(PinModelDB.disability_types),
            joinedload(PinModelDB.user),
            joinedload(PinModelDB.votes)
        ).filter(PinModelDB.disability_types.contains(disability_type_instance))

    if status is not None:
        query = query.filter(PinModelDB.status == status.value)
    if tag is not None:
        query = query.filter(PinModelDB.tag == tag.value)
    if months_ago is not None:
        start_date = datetime.utcnow() - timedelta(days=30 * months_ago)
        query = query.filter(PinModelDB.date_created >= start_date)
    pins = query.all()

    # filter by min_votes
    if min_votes is not None:
        pins = [pin for pin in pins if len(pin.votes) >= min_votes]

    # filter by max_votes #copilo
    if max_votes is not None:
        pins = [pin for pin in pins if len(pin.votes) <= max_votes]

    return pins


@router.get("/pin/{pin_id}", description="Get a pin by id")
async def get_pin(pin_id: int, db=Depends(get_db)):
    return get_pin_by_id(pin_id, db)


@router.delete("/pin/{pin_id}", description="Delete a pin by id")
async def delete_pin(pin_id: int, db=Depends(get_db)):
    found_pin = get_pin_by_id(pin_id, db)
    try:
        db.delete(found_pin)
        db.commit()
        logger.info(f"Pin with id {pin_id} has been successfully deleted")
    except Exception as e:
        logger.error(f"Couldn't delete pin with id{pin_id}. Reason: {e}")
        raise HTTPException(status_code=403, detail=f"Couldn't delete pin.")


@router.patch("/pin/{pin_id}", description="Update a pin picture url by id")
async def update_pin(pin_id: int, path_to_file: str | None = None, db=Depends(get_db)):
    found_pin = get_pin_by_id(pin_id, db)
    if found_pin is None:
        raise HTTPException(status_code=404, detail="Pin not found")
    if path_to_file:
        setattr(found_pin, "image_url", path_to_file)
    try:
        db.commit()
        db.refresh(found_pin)
    except Exception as e:
        logger.error(f"Couldn't add found {found_pin} to db. Reason: {e}")
        raise e
    return found_pin

