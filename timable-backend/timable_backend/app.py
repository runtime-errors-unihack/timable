from fastapi import FastAPI
from timable_backend.api import health, users, session, pin

app = FastAPI(
    title="Timable API",
    description="API for Timable",
    version="0.0.1",
)
app.include_router(health.router)
app.include_router(users.router)
app.include_router(session.router)
app.include_router(pin.router)

