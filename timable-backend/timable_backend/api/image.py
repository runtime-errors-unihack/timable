from fastapi import APIRouter, UploadFile

from timable_backend.models import ResourceLocationEnum
from timable_backend.services.image import upload_image_service

router = APIRouter(tags=["image"])


@router.post("/images", description="Upload an image to a chosen location", response_model=dict)
async def upload_image(file: UploadFile, resource_location: ResourceLocationEnum):
    filename = await upload_image_service(file, resource_location)
    return {"filename": filename}

