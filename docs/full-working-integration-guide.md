# SafaiSetu — Full Working Integration Guide

यह document बताता है कि website को demo UI से full working application बनाने के लिए API कहाँ, किस file में और किस क्रम में जोड़नी है।

## 1. Current architecture

```text
frontend (Next.js :3000)
        |
        | REST/JSON + Bearer JWT
        v
backend (Spring Boot :8080)
        |
        v
MongoDB Atlas / local MongoDB
        |
        +-- image storage: Cloudinary / S3 / Supabase Storage
        +-- email OTP: SMTP / Resend / SendGrid
        +-- AI: Vision API
```

## 2. Required environment variables

### frontend/.env.local

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_MAP_TILE_URL=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

### backend environment

```env
MONGODB_URI=mongodb://localhost:27017/safaisetu
JWT_SECRET=replace-with-a-long-random-secret
FRONTEND_URL=http://localhost:3000
OTP_MODE=development
AI_VISION_API_KEY=
STORAGE_PROVIDER=local
```

Production values should be configured in Render/Railway, not committed to Git.

## 3. API integration order

### Step 1 — Health check

Backend file: `backend/src/main/java/com/safaisetu/controller/DashboardController.java`

Endpoint:

```http
GET /api/health
```

Expected response:

```text
SafaiSetu backend is running
```

Test:

```bash
curl http://localhost:8080/api/health
```

Do this first. If this fails, do not debug the frontend yet.

### Step 2 — MongoDB connection

Backend file: `backend/src/main/resources/application.properties`

```properties
spring.data.mongodb.uri=${MONGODB_URI:mongodb://localhost:27017/safaisetu}
```

Verify that MongoDB is running and that the backend starts without a Mongo connection error.

### Step 3 — OTP authentication

Backend files:
- `controller/AuthController.java`
- `dto/AuthRequest.java`
- `model/User.java`
- `repository/UserRepository.java`
- `security/JwtUtil.java`
- `security/JwtAuthenticationFilter.java`
- `config/SecurityConfig.java`

Frontend files:
- `app/login/page.js`
- `lib/api.js`
- `lib/auth.js`

Requests:

```http
POST /api/auth/send-otp
Content-Type: application/json

{
  "email": "citizen@example.com",
  "role": "citizen"
}
```

```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "citizen@example.com",
  "otp": "123456",
  "role": "citizen"
}
```

Successful verification must return:

```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "user": {
    "id": "...",
    "email": "citizen@example.com",
    "role": "citizen"
  }
}
```

Frontend must save the token:

```javascript
localStorage.setItem('safaisetu-token', data.token);
localStorage.setItem('safaisetu-user', JSON.stringify(data.user));
```

Important: the current development OTP may be returned in the response. Remove that field before production and send the OTP through an email provider.

### Step 4 — Central API client

Frontend file: `frontend/lib/api.js`

Every protected request should include:

```http
Authorization: Bearer JWT_TOKEN
```

Do not write separate raw `fetch` logic in every page. Add all API functions to `lib/api.js`:

- `sendOtp(email, role)`
- `verifyOtp(email, otp, role)`
- `getComplaints(filters)`
- `getComplaint(id)`
- `createComplaint(payload)`
- `updateComplaintStatus(id, status)`
- `updateResolution(id, payload)`
- `submitVerificationVote(payload)`
- `getNotifications(userId)`
- `markNotificationRead(id)`
- `getHotspots()`
- `getAnalytics()`
- `getSlaMetrics()`

### Step 5 — Complaint creation

Backend files:
- `controller/ComplaintController.java`
- `dto/ComplaintRequest.java`
- `model/Complaint.java`
- `repository/ComplaintRepository.java`
- `service/DuplicateComplaintService.java`
- `service/AiClassificationService.java`

Frontend file:
- `app/citizen/report/page.js`

Request:

```http
POST /api/complaints
Authorization: Bearer JWT_TOKEN
Content-Type: application/json

{
  "citizenId": "USER_ID",
  "title": "Overflowing garbage bin",
  "description": "Garbage is blocking the footpath",
  "category": "Garbage",
  "latitude": 23.3441,
  "longitude": 85.3096,
  "locationLabel": "Ranchi Sector 4",
  "imageUrl": "https://storage.example/before.jpg"
}
```

The response should include:

```json
{
  "duplicateFound": false,
  "complaint": {
    "id": "...",
    "status": "Reported"
  },
  "aiSuggestion": {
    "category": "Garbage",
    "confidence": 0.94,
    "severity": "High"
  }
}
```

Frontend must display the AI suggestion and let the citizen confirm/edit it before final submission. AI must never silently submit a category.

### Step 6 — Citizen dashboard

Frontend file: `app/citizen/dashboard/page.js`

Replace the current hard-coded array with:

```javascript
const user = JSON.parse(localStorage.getItem('safaisetu-user') || '{}');
const complaints = await getComplaints({ citizenId: user.id });
```

Backend should eventually expose a filtered endpoint:

```http
GET /api/complaints?citizenId=USER_ID
```

Do not expose private citizen information in the public map response.

### Step 7 — Authority dashboard

Frontend files:
- `app/authority/dashboard/page.js`
- `app/authority/complaints/[id]/page.js`

Backend endpoints:

```http
GET /api/dashboard/summary
GET /api/complaints?status=Reported
GET /api/complaints/{id}
PUT /api/complaints/{id}/status?status=Assigned
```

Authority actions:

```json
{
  "status": "Assigned",
  "assignedTo": "WORKER_ID",
  "authorityDepartment": "Municipal Waste"
}
```

For production, assignment should use a JSON request DTO rather than query parameters.

### Step 8 — Worker workflow

Frontend files:
- `app/worker/dashboard/page.js`
- `app/worker/tasks/[id]/page.js`

Backend endpoints:

```http
GET /api/worker/tasks?workerId=WORKER_ID
PUT /api/complaints/{id}/status?status=In%20Progress
PUT /api/complaints/{id}/resolution
```

Resolution payload:

```json
{
  "resolutionNote": "Waste removed and area cleaned",
  "afterImageUrl": "https://storage.example/after.jpg"
}
```

After resolution, backend should set status to `Citizen Verification` and store `updatedAt`.

### Step 9 — Citizen verification

Frontend file:
- `app/citizen/verify/page.js`

Backend files:
- `controller/VerificationController.java`
- `model/VerificationVote.java`
- `repository/VerificationVoteRepository.java`

Request:

```http
POST /api/complaints/verify
Authorization: Bearer JWT_TOKEN
Content-Type: application/json

{
  "complaintId": "COMPLAINT_ID",
  "userId": "USER_ID",
  "vote": "RESOLVED"
}
```

Required business rules:
- only the citizen who reported the complaint can vote on it
- one vote per user per complaint
- a changed vote updates the existing record
- valid votes are `RESOLVED` or `UNRESOLVED`
- conflicting votes remain visible to authority for review

### Step 10 — Notifications

Frontend file:
- `app/notifications/page.js`

Backend file:
- `controller/NotificationController.java`

Requests:

```http
GET /api/notifications/USER_ID
PUT /api/notifications/NOTIFICATION_ID/read
```

Create notifications when:
- complaint is created
- complaint is assigned
- status changes
- worker uploads resolution evidence
- citizen verification is submitted

### Step 11 — Live map

Frontend files:
- `app/map/page.js`
- `app/hotspots/page.js`

Backend endpoints:

```http
GET /api/complaints
GET /api/hotspots
```

Use the complaint latitude/longitude fields to create Leaflet markers. Use status filters in the UI. The public map must not show citizen email, phone, or exact private identity.

### Step 12 — AI classification

Backend files:
- `controller/AiController.java`
- `service/AiClassificationService.java`

Current implementation is a fallback/demo stub. Replace its body with a real server-side call to a Vision AI provider. Keep the response format stable:

```json
{
  "category": "Garbage",
  "confidence": 0.94,
  "severity": "High",
  "suggestedDepartment": "Municipal Waste",
  "reason": "..."
}
```

If `AI_VISION_API_KEY` is missing, return a safe fallback and mark it as `source: fallback`.

### Step 13 — Duplicate detection

Backend file: `service/DuplicateComplaintService.java`

Current logic compares latitude/longitude differences. Improve it by:
- checking only `Reported`, `Verified`, `Assigned`, or `In Progress` complaints
- limiting to same category
- using a distance calculation in meters
- using a time window, such as 90 days
- adding a `duplicateOf` field when confirmed

For large datasets, use MongoDB geospatial indexes instead of loading all complaints with `findAll()`.

### Step 14 — Hotspots

Backend files:
- `model/Hotspot.java`
- `repository/HotspotRepository.java`
- `controller/HotspotController.java`

Implement a scheduled job that groups complaints by category and proximity. Recommended first rule:
- radius: 200 meters
- minimum complaints: configurable, e.g. 5
- time window: 30 days
- severity: based on count and category weight

The current hotspot endpoint serves stored records; it still needs a real recomputation job for production.

### Step 15 — Analytics and SLA

Backend endpoints:

```http
GET /api/analytics/summary
GET /api/sla
```

Frontend file:
- `app/analytics/page.js`

Replace hard-coded metrics with API data. SLA rules should be configured by category, for example:

```text
Garbage: 24 hours
Water leakage: 12 hours
Road damage: 7 days
Street light: 3 days
```

Calculate overdue status from `createdAt`, current status, and category SLA rather than storing only static sample values.

## 4. Build and run checklist

### Backend

```bash
cd backend
./mvnw clean test
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run build
npm run dev
```

### Smoke tests

```bash
curl http://localhost:8080/api/health
curl http://localhost:8080/api/complaints
```

Then test in this order:
1. send OTP
2. verify OTP
3. save token
4. create complaint
5. list complaint
6. update status
7. upload/attach resolution evidence
8. submit citizen vote
9. read notifications
10. open map and analytics

## 5. Production blockers to fix before launch

- add JWT dependencies and stable secret configuration
- use a thread-safe, expiring OTP store such as Redis
- remove OTP from API responses
- restrict CORS to the deployed frontend domain
- add role-based authorization on authority and worker APIs
- add request validation with `@Valid`
- implement real image upload storage
- implement real email/SMS delivery
- replace AI fallback with a secured server-side provider
- add MongoDB indexes and geospatial queries
- add automated tests
- never commit `.env.local` or secrets

## 6. API testing order in Postman

Create an environment:

```text
baseUrl = http://localhost:8080/api
token =
userId =
complaintId =
```

Requests:
1. `GET {{baseUrl}}/health`
2. `POST {{baseUrl}}/auth/send-otp`
3. `POST {{baseUrl}}/auth/verify-otp`
4. save `token` and `userId`
5. `POST {{baseUrl}}/complaints`
6. `GET {{baseUrl}}/complaints`
7. `PUT {{baseUrl}}/complaints/{{complaintId}}/status?status=Assigned`
8. `PUT {{baseUrl}}/complaints/{{complaintId}}/resolution`
9. `POST {{baseUrl}}/complaints/verify`
10. `GET {{baseUrl}}/notifications/{{userId}}`
11. `GET {{baseUrl}}/hotspots`
12. `GET {{baseUrl}}/analytics/summary`

For protected requests add:

```text
Authorization: Bearer {{token}}
```

## 7. Final definition of done

The website is full working when:
- a user can authenticate without hard-coded data
- the user can create a complaint and see it in MongoDB
- authority can view and assign it
- worker can update it and add evidence
- citizen can verify it
- every status change creates a notification
- map and dashboards load API data
- invalid roles and unauthenticated requests are rejected
- frontend production build succeeds
- backend tests pass

## 8. PDF export

This Markdown file is intentionally print-friendly. To create a PDF locally:

```bash
npx md-to-pdf docs/full-working-integration-guide.md
```

Alternatively open this file in GitHub, choose Print, and select “Save as PDF”.
