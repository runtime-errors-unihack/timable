from fastapi import APIRouter, Depends
from sqlalchemy import func

from timable_backend.db.db_models import PinModelDB, DisabilityTypeModelDB, pin_disability_association
from timable_backend.db.session import get_db

router = APIRouter(prefix="/statistics", tags=["statistics"])


@router.get("/pins-per-disability-type", description="Get the number of pins per disability type")
async def get_pins_per_disability_type(db=Depends(get_db)):
    pins = db.query(PinModelDB).all()
    disability_types = db.query(DisabilityTypeModelDB).all()

    disability_type_count = {}
    for disability_type in disability_types:
        disability_type_count[disability_type.name] = 0

    for pin in pins:
        for disability_type in pin.disability_types:
            disability_type_count[disability_type.name] += 1

    return disability_type_count