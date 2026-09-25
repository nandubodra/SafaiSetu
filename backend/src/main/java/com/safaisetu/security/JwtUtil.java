package com.safaisetu.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {
    private final SecretKey key;
    private final long expirationMillis;

    public JwtUtil(
        @Value("${jwt.secret}") String secret,
        @Value("${jwt.expiration-ms:86400000}") long expirationMillis
    ) {
        byte[] decoded = Decoders.BASE64.decode(secret);
        if (decoded.length < 32) {
            throw new IllegalArgumentException("JWT_SECRET must be a base64 value of at least 256 bits");
        }
        this.key = Keys.hmacShaKeyFor(decoded);
        this.expirationMillis = expirationMillis;
    }

    public String generateToken(String email, String role) {
        Date now = new Date();
        return Jwts.builder()
            .claims(Map.of("role", role))
            .subject(email)
            .issuedAt(now)
            .expiration(new Date(now.getTime() + expirationMillis))
            .signWith(key)
            .compact();
    }

    public Claims claims(String token) {
        return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload();
    }
}
