# Budget Tracker

A simple full stack app for tracking campaign budgets and spend.

The backend is powered by Django and Django REST Framework.  
The frontend is built with React, Tailwind, and Axios for API calls.  

The whole project is containerised with Docker for easy setup and development.

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
   
   The backend `.env` controls Django settings such as the secret key, debug mode, and allowed hosts.  
   No updates are required, but you may change `DJANGO_SECRET_KEY` if desired.
   The frontend `.env` points React to the backend API.

   **Backend**:
   ```bash
   cp backend/.env.sample backend/.env
   ```

   **Frontend**:
   ```bash
   cp frontend/.env.sample frontend/.env
   ```

## Running the app

Build and start the containers:

```bash
docker compose up
```

Depending on your version of Docker, the command may be `docker-compose up` instead.

Once running, access the frontend of the app at:

👉 [http://localhost:3000](http://localhost:3000)

## First time database setup

Run migrations to initialise the SQLite database inside the backend container:

```bash
docker compose run backend python manage.py migrate
```

## Stopping the app

To stop the containers:

```bash
docker compose down
```

If you want to remove volumes (for example to reset the database), use:

```bash
docker compose down -v
```

## Using the app

When you open the app you will see a table of campaigns. Each campaign has:

- **Name**  
- **Budget** (the total available spend)  
- **Spend** (the current spend so far)  
- **Status** (calculated dynamically)

To add a campaign, fill in the form at the bottom of the page with a name, budget, and spend, then click **Add Campaign**.  
The campaign will be saved in the backend and appear immediately in the table.

The **status** column highlights whether the campaign is on track:

- **On track** – spend is between 90% and 110% of budget  
- **Underspending** – spend is less than 90% of budget  
- **Overspending** – spend is more than 110% of budget  

