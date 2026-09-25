# SafaiSetu

SafaiSetu is a civic issue reporting and tracking platform for citizens, authorities, and field workers. It focuses on the transparent lifecycle of service requests: report -> verify -> assign -> resolve -> citizen feedback.

## Features included in this MVP

- Citizen login and registration using email OTP
- Separate citizen and authority dashboards
- Complaint reporting with category, description, photo, and GPS location
- Issue status lifecycle
- Live issue map (Leaflet-ready)
- Authority work queue and status management
- Before/after resolution evidence
- Citizen verification of resolved issues
- Notification center
- AI-assisted categorization hooks
- Dual-language support structure (English/Hindi)

## Tech stack

### Frontend
- Next.js
- React
- JavaScript
- Tailwind CSS
- Leaflet / OpenStreetMap

### Backend
- Java
- Spring Boot
- Spring Security
- REST API

### Database
- MongoDB

### AI
- Vision AI API integration layer

## Monorepo structure

```text
SafaiSetu/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── next.config.mjs
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── jsconfig.json
├── backend/
│   ├── src/main/java/com/safaisetu/
│   ├── src/main/resources/
│   ├── pom.xml
│   └── .gitignore
├── docs/
│   └── architecture.md
└── README.md
```

## Quickstart

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

## Environment variables

Set these in the frontend and backend as needed:

- NEXT_PUBLIC_API_URL
- NEXT_PUBLIC_MAP_TILE_URL
- MONGODB_URI
- JWT_SECRET
- AI_VISION_API_KEY

## MVP roadmap

1. Citizen registration and login
2. Filing complaints with image and GPS
3. Authority dashboard and work queue
4. Status transitions and before/after evidence
5. Community verification and notifications
6. AI classification and hotspot detection

## Notes

This repository contains the initial implementation structure for the SafaiSetu MVP. It is designed to be expanded into the full civic reporting platform described in the product brief.
