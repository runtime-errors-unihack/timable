from fastapi import APIRouter, HTTPException, Depends
from loguru import logger
from sqlalchemy.orm import joinedload

from timable_backend.db.db_models import PinModelDB, DisabilityTypeModelDB
from timable_backend.db.session import get_db
from timable_backend.models import PinModel
from timable_backend.services.pin import get_pin_by_id, get_all_disability_types

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
        disability_types=disability_types,  # List containing DisabilityTypeModelDB objects
        user_id=pin.user_id,
        description=pin.description,
    )

    try:
        db.add(new_pin)
        db.commit()
        db.refresh(new_pin)
    except Exception as e:
        logger.exception(e)
        raise HTTPException(status_code=500, detail=f"Couldn't create pin. {str(e)}")

    return new_pin


@router.get("/pin", description="Get all pins by type")
async def get_pins(disability_type: str | None = None, db=Depends(get_db)):
    if not disability_type:
        return db.query(PinModelDB).all()

    # Fetch the specific disability type based on the pin_type
    disability_type = db.query(DisabilityTypeModelDB).filter_by(name=disability_type).first()

    # Check if the disability type exists
    if not disability_type:
        raise HTTPException(status_code=404, detail=f"Disability type not found.")

    # Use the joinedload to retrieve pins with the specified disability type
    pins = db.query(PinModelDB).options(
        joinedload(PinModelDB.disability_types)
    ).filter(PinModelDB.disability_types.contains(disability_type)).all()

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

