# Backend Dockerfile (Django + DRF + Pipenv)
FROM python:3.13-slim

# Prevent Python from writing .pyc files and using stdout/stderr buffers
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN pip install --no-cache-dir pipenv

COPY Pipfile Pipfile.lock ./

RUN pipenv install --system --deploy --ignore-pipfile

COPY backend .

EXPOSE 8000

# Run server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
