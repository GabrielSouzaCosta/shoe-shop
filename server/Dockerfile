FROM python:3.10-alpine

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

COPY . /server

WORKDIR /server

RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    /py/bin/pip install -r requirements.txt && \
    adduser --disabled-password --no-create-home django

ENV PATH="/py/bin:$PATH"

USER django



