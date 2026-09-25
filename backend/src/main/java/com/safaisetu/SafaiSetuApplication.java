spring.application.name=safaisetu
server.port=8080

spring.data.mongodb.uri=${MONGODB_URI:mongodb://localhost:27017/safaisetu}

logging.level.org.springframework=INFO
logging.level.com.safaisetu=DEBUG

jwt.secret=${JWT_SECRET:change-me}
