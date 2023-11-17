from fastapi import APIRouter, HTTPException, Depends
from loguru import logger

from timable_backend.db.models import PinModelDB
from timable_backend.db.session import get_db
from timable_backend.models import PinModel
from timable_backend.services.pin import get_pin_by_id

router = APIRouter(tags=["pin"])


@router.post("/pin", description="Create a pin")
async def create_pin(pin: PinModel, db=Depends(get_db)):
    new_pin = PinModelDB(
        latitude=pin.latitude,
        longitude=pin.longitude,
        status=pin.status.value,
        image_url=pin.image_url,
        type=pin.type,
        # user_id=pin.user_id
    ) #TODO user id relation
    try:
        db.add(new_pin)
        db.commit()
        db.refresh(new_pin)
    except Exception as e:
        logger.exception(e)
        raise HTTPException(status_code=500, detail=f"Couldn't create pin.")

    return new_pin


@router.get("/pin", description="Get all pins")
async def get_pins(db=Depends(get_db)):
    pins = db.query(PinModelDB).all()
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
