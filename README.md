# SafaiSetu

SafaiSetu is a civic issue reporting and tracking platform designed to bridge the gap between citizens, authorities, and field workers. The platform focuses on transparency, issue lifecycle tracking, and public accountability.

## Project overview

SafaiSetu allows citizens to:
- report civic issues (garbage, road damage, water leakage, street lights, public facilities, etc.)
- attach image evidence
- share location data
- track issue status

Authorities can:
- review incoming complaints
- assign tasks to workers
- update issue status
- upload resolution evidence

Workers can:
- access assigned tasks
- update progress
- upload before/after images

The public can:
- view hotspot clusters
- inspect civic issue trends
- verify whether a complaint was resolved

## Tech stack

### Frontend
- Next.js
- React
- JavaScript
- Tailwind CSS
- Leaflet
- OpenStreetMap

### Backend
- Java
- Spring Boot
- Spring Security
- REST APIs
- MongoDB

### AI / intelligence
- Vision AI classification hook
- duplicate complaint detection
- severity estimation
- hotspot detection

## Repository structure

```text
SafaiSetu/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── i18n/
│   ├── lib/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── next.config.mjs
│   ├── jsconfig.json
│   └── .env.local
├── backend/
│   ├── src/main/java/com/safaisetu/
│   ├── src/main/resources/
│   ├── pom.xml
│   └── .gitignore
├── docs/
│   └── architecture.md
├── README.md
└── .gitignore
```

## Features included in this MVP

- citizen OTP login flow
- authority dashboard
- citizen issue reporting form
- issue lifecycle status handling
- worker dashboard
- notification center
- complaint map
- hotspot visualization
- analytics dashboard
- English / Hindi support structure
- Spring Boot backend with MongoDB-ready models

## Local setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
- http://localhost:3000

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Backend runs on:
- http://localhost:8080

## Environment variables

### Frontend
Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

### Backend
Set MongoDB URI if needed:

```env
MONGODB_URI=mongodb://localhost:27017/safaisetu
JWT_SECRET=change-me
```

## API endpoints

### Auth
- POST `/api/auth/send-otp`
- POST `/api/auth/verify-otp`
- POST `/api/auth/register`

### Complaints
- GET `/api/complaints`
- GET `/api/complaints/{id}`
- POST `/api/complaints`
- PUT `/api/complaints/{id}/status`
- PUT `/api/complaints/{id}/resolution`

### Dashboard
- GET `/api/dashboard/summary`
- GET `/api/health`

### Notifications
- GET `/api/notifications/{userId}`
- POST `/api/notifications`
- PUT `/api/notifications/{id}/read`

### Verification
- POST `/api/complaints/verify`
- GET `/api/complaints/{complaintId}/votes`

### Intelligence
- GET `/api/hotspots`
- GET `/api/analytics/summary`
- GET `/api/sla`
- POST `/api/ai/classify`

## Future roadmap

1. Add JWT-based auth and protected routes
2. Integrate actual email/SMS OTP service
3. Connect complaints to MongoDB collections in production
4. Store uploaded images in Cloudinary or AWS S3
5. Add real AI image classification via Vision API
6. Add hotspot recomputation and duplicate detection jobs
7. Add admin analytics and ward-wise reporting
8. Add a real deployment pipeline for Vercel + Render + MongoDB Atlas

## Notes

This repository contains the SafaiSetu MVP foundation and feature architecture. It is designed as a practical starting point for a civic reporting and resolution platform that matches the product brief.
