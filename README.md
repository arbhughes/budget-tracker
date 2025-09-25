# Budget Tracker

A simple full stack app for tracking campaign budgets and spend. The backend is powered by Django and Django REST Framework. 
The frontend is built with React, Tailwind, and Axios for API calls. It is containerised with Docker for easy setup and development.

## Requirements

- Docker and Docker Compose (Docker Desktop on Mac or Windows, or Docker Engine on Linux)
- Git (to clone the repository)

You do not need Python or Node installed locally, as both services run inside containers.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/arbhughes/budget-tracker
   cd budget-tracker
   ```

2. Copy the example environment files. The defaults will work for local development.
   The backend .env controls Django settings such as the secret key, debug mode, and allowed hosts.
   No updates are required, but you may change `DJANGO_SECRET_KEY` if desired.
   The frontend .env points React to the backend API.

   Backend:
   ```bash
   cp backend/.env.sample backend/.env
   ```

   Frontend:
   ```bash
   cp frontend/.env.sample frontend/.env
   ```

## Running the app

Build and start the containers:

```bash
docker compose up
```

Depending on your version of Docker, the command may be `docker-compose up` instead.

Once running please access the frontend of the app at http://localhost:3000

## First time database setup

Run migrations to initialise the SQLite database inside the backend container:

```bash
docker compose run backend python manage.py migrate
```

## To stop the containers:

```bash
docker compose down
```

If you want to remove volumes (for example to reset the database), use:

```bash
docker compose down -v
```

