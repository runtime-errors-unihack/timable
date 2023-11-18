FROM ubuntu:latest

RUN apt-get update -y \
    && apt-get install curl -y \
    && apt-get install python3.11 python3-distutils bash vim rsync -y \
    && apt-get install python3-pip -y \
    && update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 1 \
    && curl -sSL https://install.python-poetry.org | python3 -

RUN mkdir -p /home/timable-backend
WORKDIR /home/timable-backend

# Take the files from repo to the container
COPY . /home/timable-backend/

# Install the dependencies
RUN /root/.local/bin/poetry install

# Expose application port
EXPOSE 8000

WORKDIR /home/timable-backend/timable_backend

# start the server
CMD ["/root/.local/bin/poetry", "run", "uvicorn", "timable_backend.app:app", "--host", "0", "--port", "8000", "--reload"]
