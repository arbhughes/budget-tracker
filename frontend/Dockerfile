# Frontend Dockerfile (React + CRA + Tailwind)
FROM node:20-slim

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps

COPY frontend .

EXPOSE 3000

CMD ["npm", "start"]
