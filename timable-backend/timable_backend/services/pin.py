from fastapi import HTTPException
from sqlalchemy.orm import Session

from timable_backend.db.db_models import PinModelDB


def get_pin_by_id(pin_id: int, db: Session) -> PinModelDB:
    found_pin = db.query(PinModelDB).filter(PinModelDB.id == pin_id).first()
    if not found_pin:
        raise HTTPException(status_code=404, detail=f"Pin not found.")
    return found_pin