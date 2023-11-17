from fastapi import APIRouter

router = APIRouter(tags=["pin"])


@router.post("/pin", description="Create a pin")
async def create_pin():
    return {"status": "ok"}


@router.get("/pin", description="Get all pins")
async def get_pins(
    category: str = None,
    status: str = None,
    user_id: int = None,
    sort_by_votes: bool = False,
    sort_by_date: bool = False,
    limit: int = 100,
):
    return {"status": "ok"}


@router.get("/pin/{pin_id}", description="Get a pin by id")
async def get_pin(pin_id: int):
    return {"status": "ok"}
