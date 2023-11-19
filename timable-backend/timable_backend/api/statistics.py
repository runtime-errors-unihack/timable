import json
import os

from fastapi import APIRouter, Depends
from loguru import logger
from timable_backend.db.db_models import PinModelDB, DisabilityTypeModelDB
from timable_backend.db.session import get_db
from timable_backend.services.jwt_session import get_current_session
from timable_backend.services.statistics import get_area_score
from timable_backend.services.users import get_users_pins_votes

router = APIRouter(prefix="/statistics", tags=["statistics"])


@router.get("/pins-per-disability-type", description="Get the number of pins per disability type")
async def get_pins_per_disability_type(db=Depends(get_db), session=Depends(get_current_session)):
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


@router.get("/top-users", description="Get top users")
async def get_top_users(limit: int | None = 10, db=Depends(get_db)):
    user_contributers = get_users_pins_votes(db)

    # Calculate scores and populate the dictionary
    for user_contributer in user_contributers:
        user_contributer.score = len(user_contributer.pins) * 5 + len(user_contributer.votes)

    # Sort the user objects by scores in descending order
    sorted_users = sorted(user_contributers, key=lambda x: x.score, reverse=True)

    # Take the top 10 user objects
    top_10_users = sorted_users[:limit]

    # Optionally, you can create a list of dictionaries with usernames and scores
    result_list = [{"username": user.username, "score": user.score} for user in top_10_users]

    return result_list

