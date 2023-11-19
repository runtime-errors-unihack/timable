import os
from fastapi import FastAPI
from loguru import logger
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
from timable_backend.api import users, session, pin, votes, image, statistics
from starlette.staticfiles import StaticFiles
from timable_backend.db.session import create_database_if_not_exists, create_tables
from timable_backend.db.db_models import BaseModel

app = FastAPI(
    title="Timable API",
    description="API for Timable",
    version="0.0.1",
)
path_to_resources = os.path.join("..", "resources")
os.makedirs(path_to_resources, exist_ok=True)
app.mount("/resources", StaticFiles(directory=os.path.join("..", "resources")), name="resources")
app.include_router(users.router)
app.include_router(session.router)
app.include_router(pin.router)
app.include_router(votes.router)
app.include_router(image.router)
app.include_router(statistics.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://localhost:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def initialize_database():
    create_database_if_not_exists()
    create_tables(metadata=BaseModel.metadata, drop_all=True)


@app.exception_handler(Exception)
async def exception_handler(request, exc):
    logger.exception(exc)
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error", "details": str(exc)},
    )
