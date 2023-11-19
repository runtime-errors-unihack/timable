from fastapi import Depends
from shapely import Polygon, Point

from timable_backend.db.db_models import PinModelDB
from timable_backend.db.session import get_db
from timable_backend.models import PinStatusEnum


def get_area_score(area_coordinates: list[list[float]], db=Depends(get_db)):
    positive_vote_count = 0
    negative_vote_count = 0
    pins = db.query(PinModelDB).all()
    coordinates = []
    for point in area_coordinates:
        coordinates.append([point[1], point[0]])
    area_polygon = Polygon(coordinates)
    for pin in pins:
        if area_polygon.contains(Point(pin.latitude, pin.longitude)):
            if pin.status == PinStatusEnum.GOOD.value:
                positive_vote_count += 1
            elif pin.status == PinStatusEnum.BAD.value:
                negative_vote_count += 1
    vote_count = positive_vote_count + negative_vote_count
    if vote_count is 0:
        return 0
    accessibility_score = (10 * positive_vote_count) / (vote_count)
    return accessibility_score
