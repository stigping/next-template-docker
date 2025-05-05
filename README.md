# Next.js + Express + MongoDB Docker Template

This project is a clean, professional-grade template for deploying web applications using:
- **Frontend:** Next.js (React)
- **Backend:** Express.js API
- **Database:** MongoDB (containerized)

## Features
- 🔧 Fully Dockerized architecture
- 🔁 Frontend + Backend + MongoDB setup
- 🌐 Reverse-proxy compatible (e.g., with Nginx Proxy Manager)
- 🔒 Environment variable-based configuration
- 📁 Template for cloning multiple web apps with per-site isolation

---

## Getting Started

### 1. Clone this template
```bash
git clone https://github.com/stigping/next-template-docker.git
cd next-template-docker
cp .env.example .env
```

### 2. Update `.env`
Set your desired ports and project name:
```env
COMPOSE_PROJECT_NAME=your_project
NEXT_PUBLIC_PORT=3000
BACKEND_PORT=4000
MONGO_PORT=27017
MONGO_DB=yourdbname
MONGO_HOST=mongo_your_project
```

### 3. Build & start
```bash
docker compose --env-file .env up -d --build
```

---

## Folder Structure
```
next-template-docker/
├── frontend/     # Next.js app
├── backend/      # Express API server
│   ├── src/
│   │   ├── mongo.js  # MongoDB connection helper
│   │   └── index.js  # Express API entry point
├── .env.example
├── docker-compose.yml
└── README.md
```

---

## Health Test

After startup, verify that services are running:

### 🔹 If you're testing locally:
- Frontend: `http://localhost:<NEXT_PUBLIC_PORT>`
- Backend health: `http://localhost:<BACKEND_PORT>/health`
- Mongo ping: `http://localhost:<BACKEND_PORT>/api/ping`

### 🔹 If you're deploying with a domain (e.g. Nginx Proxy Manager or Cloudflare):
- Frontend: `https://yourdomain.com`
- Backend (custom route or subdomain): e.g. `https://api.yourdomain.com/health`

> Be sure your `NEXT_PUBLIC_*` and `BACKEND_PORT` match the reverse proxy or server configuration.

---

## License
MIT (or your choice)
