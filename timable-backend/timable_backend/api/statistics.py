import json
import os

from fastapi import APIRouter, Depends
from loguru import logger

from timable_backend.db.db_models import PinModelDB, DisabilityTypeModelDB
from timable_backend.db.session import get_db
from timable_backend.services.statistics import get_area_score

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


@router.get("/area-accessibility-score", description="Get the average score of an area")
async def calculate_average_area_score(db=Depends(get_db)):
    file_path = os.path.join("timable_backend", "db", "data.json")
    with open(file_path, "r") as file:
        data = json.load(file)
    score_dict = {}
    try:
        for feature in data["features"]:
            name = feature["properties"]["Name"]
            coordinates = feature["geometry"]["coordinates"][0]
            score_dict[name] = get_area_score(coordinates, db)
    except Exception as e:
        logger.exception(e)
        raise e
    return score_dict
