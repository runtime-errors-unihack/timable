import os
from datetime import datetime
from os import path

from fastapi import File
from loguru import logger

from timable_backend.exceptions import FileUploadFailed
from timable_backend.models import ResourceLocationEnum


async def upload_image_service(file: File, resource_location: ResourceLocationEnum):
    try:
        pic_contents = await file.read()
        if not pic_contents:
            raise FileUploadFailed(message="Couldn't upload pic", details=f"No picture given.")
        current_time = datetime.now().strftime("%d-%m-%Y-%H-%M-%S")
        pic_name = f"{resource_location.value}_{current_time}.jpeg"
        pic_path = path.join("..", "resources", resource_location.value, pic_name)
        pic_return = path.join("/", "resources", resource_location.value, pic_name)
        pic_dir = os.path.join("..", "resources", resource_location.value)

        os.makedirs(pic_dir, exist_ok=True)
        print("Current Working Directory:", os.getcwd())

        with open(pic_path, 'wb') as out_file:
            out_file.write(pic_contents)
        return pic_return
    except Exception as e:
        logger.exception(e)
        raise FileUploadFailed(message="Couldn't upload pic", details=str(e))

