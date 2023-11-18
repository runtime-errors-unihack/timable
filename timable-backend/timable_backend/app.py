from fastapi import FastAPI
from loguru import logger
from starlette.responses import JSONResponse

from timable_backend.api import users, session, pin
from timable_backend.db.session import create_database_if_not_exists, create_tables
from timable_backend.db.db_models import BaseModel

app = FastAPI(
    title="Timable API",
    description="API for Timable",
    version="0.0.1",
)
app.include_router(users.router)
app.include_router(session.router)
app.include_router(pin.router)


@app.on_event("startup")
async def initialize_database():
    create_database_if_not_exists()
    create_tables(metadata=BaseModel.metadata, drop_all=False, excepted_tables=['disability_types'])


@app.exception_handler(Exception)
async def exception_handler(request, exc):
    logger.exception(exc)
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error", "details": str(exc)},
    )