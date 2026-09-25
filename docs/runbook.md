# SafaiSetu local run

## Prerequisites
- Java 17+
- Maven 3.9+ (or Maven Wrapper)
- Node.js 18+
- MongoDB 6+ or MongoDB Atlas

## Backend

```bash
cd backend
export MONGODB_URI=mongodb://localhost:27017/safaisetu
export JWT_SECRET=VGhpcy1kZXZlbG9wbWVudC1zZWNyZXQta2V5LW11c3QtYmUtMzItYnl0ZXM=
./mvnw spring-boot:run
# If mvnw is not present: mvn spring-boot:run
```

For demo OTP, `OTP_EXPOSE_IN_RESPONSE=true` returns the OTP in the response. Set it to `false` after configuring an email/SMS provider.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000. Backend health: http://localhost:8080/api/health.

## Important
The application is now a runnable MVP, but “100% production” still requires external services: MongoDB deployment, real OTP delivery, image storage, and a real AI provider. Those cannot be created from source code alone and must be configured with provider credentials.
