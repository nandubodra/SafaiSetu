# SafaiSetu Architecture Guide

## Overview

SafaiSetu is designed as a civic issue reporting and resolution platform where citizens can submit complaints, authorities can monitor and assign them, and the public can verify that action has actually happened.

## Domain model

### Roles
- Citizen
- Authority
- Worker
- Admin

### Core entities
- User
- Complaint
- Notification
- ResolutionEvidence
- VerificationVote
- Hotspot

## Lifecycle

Reported -> Verified -> Assigned -> In Progress -> Resolved -> Citizen Verification

## Recommended frontend flow

1. Citizen opens landing page
2. Registers with email OTP
3. Uploads complaint photo and GPS
4. AI suggests category and severity
5. User confirms and submits complaint
6. Authority sees issue in dashboard and assigns worker
7. Worker updates progress and uploads after-photo
8. Citizen verifies whether issue is resolved

## Recommended backend API

### Auth
- POST /api/auth/send-otp
- POST /api/auth/verify-otp
- POST /api/auth/register

### Complaint
- GET /api/complaints
- POST /api/complaints
- GET /api/complaints/{id}
- PUT /api/complaints/{id}/status
- POST /api/complaints/{id}/verify
- POST /api/complaints/{id}/resolution

### Dashboard
- GET /api/dashboard/summary
- GET /api/dashboard/hotspots
- GET /api/dashboard/notifications

## MongoDB collections

- users
- complaints
- notifications
- evidence
- verificationVotes
- hotspots

## AI hooks

- Suggest category from image
- Detect duplicate complaint near same location
- Estimate severity and urgency
- Detect recurring issue patterns

## Production enhancement plan

- Add JWT-based authentication
- Add MongoDB GridFS for media uploads
- Add Leaflet map clustering
- Add Supabase or cloud object storage for evidence
- Add admin analytics and hotspot detection jobs
