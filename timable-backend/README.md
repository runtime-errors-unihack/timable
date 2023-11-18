## Timable Backend

poetry run uvicorn timable_backend.app:app --host 0 --port 8000 --reload

Windows command: poetry run uvicorn timable_backend.app:app --host 127.0.0.1 --port 8000 --reload


## Docker deployment

### Build image
docker build -t timable-backend .

### Run container with a mounted local folder
docker run --name timable-backend-tracking-changes -it -p 8000:8000 -v /Users/alexserban/hackathon/timable/timable-backend/:/home/timable-backend timable-backend

(swap what's after -v, before `:` with your local full path to the timable-backend folder)

### Turn on the container if it's stopped
docker start timable-backend-tracking-changes