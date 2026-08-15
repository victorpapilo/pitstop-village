# Pitstop Village — Website + Booking System

React + Vite + Tailwind v4 + Framer Motion (frontend) · Node/Express + MongoDB (backend).

## Project structure
- `/` — the React frontend (the website itself)
- `/server` — the Node/Express API that talks to MongoDB

## Local setup

### 1. Backend
```
cd server
npm install
cp .env.example .env   # fill in MONGODB_URI, JWT_SECRET, ADMIN_SETUP_KEY
npm run dev
```

### 2. Create your admin account (one time)
With the server running, send one request (Postman, curl, or a REST client):
```
POST http://localhost:4000/api/auth/setup
{
  "email": "you@example.com",
  "password": "a-strong-password",
  "setupKey": "whatever you set ADMIN_SETUP_KEY to"
}
```

### 3. Frontend
```
npm install
cp .env.example .env   # set VITE_API_URL=http://localhost:4000
npm run dev
```

Visit `/admin` to log in, `/admin/dashboard` to manage bookings.

## Deploy
See the deployment walkthrough provided with this project.
