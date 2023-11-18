import os

from fastapi import FastAPI
from starlette.staticfiles import StaticFiles

from timable_backend.api import users, session, pin, image
from timable_backend.db.session import create_database_if_not_exists, create_tables
from timable_backend.db.db_models import BaseModel

app = FastAPI(
    title="Timable API",
    description="API for Timable",
    version="0.0.1",
)
app.mount("/resources", StaticFiles(directory=os.path.join("..", "resources")), name="resources")
app.include_router(users.router)
app.include_router(session.router)
app.include_router(pin.router)
app.include_router(image.router)


@app.on_event("startup")
async def initialize_database():
    create_database_if_not_exists()
    create_tables(metadata=BaseModel.metadata, drop_all=False, excepted_tables=['disability_types'])
