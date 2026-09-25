package com.safaisetu.controller;

import com.safaisetu.dto.AuthRequest;
import com.safaisetu.model.User;
import com.safaisetu.repository.UserRepository;
import com.safaisetu.security.JwtUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final Map<String, OtpEntry> otpStore = new ConcurrentHashMap<>();
    private final boolean exposeOtp;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil,
                          @Value("${otp.expose-in-response:false}") boolean exposeOtp) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.exposeOtp = exposeOtp;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody AuthRequest request) {
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Email is required"));
        }
        String role = request.getRole() == null ? "citizen" : request.getRole().toLowerCase();
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);
        otpStore.put(request.getEmail().toLowerCase() + ":" + role, new OtpEntry(otp, LocalDateTime.now().plusMinutes(5)));
        var response = new java.util.HashMap<String, Object>();
        response.put("success", true);
        response.put("message", "OTP sent successfully");
        if (exposeOtp) response.put("otp", otp);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody AuthRequest request) {
        String role = request.getRole() == null ? "citizen" : request.getRole().toLowerCase();
        String key = request.getEmail().toLowerCase() + ":" + role;
        OtpEntry entry = otpStore.get(key);
        if (entry == null || entry.expiresAt().isBefore(LocalDateTime.now()) || !entry.code().equals(request.getOtp())) {
            return ResponseEntity.status(401).body(Map.of("success", false, "message", "Invalid or expired OTP"));
        }
        Optional<User> existing = userRepository.findByEmailIgnoreCase(request.getEmail());
        User user = existing.orElseGet(() -> {
            User created = new User();
            created.setName(request.getName() == null ? "User" : request.getName());
            created.setEmail(request.getEmail().toLowerCase());
            created.setRole(role);
            created.setEmailVerified(true);
            created.setCreatedAt(LocalDateTime.now());
            return created;
        });
        user.setUpdatedAt(LocalDateTime.now());
        user.setRole(role);
        user = userRepository.save(user);
        otpStore.remove(key);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "token", jwtUtil.generateToken(user.getEmail(), user.getRole()),
            "user", Map.of("id", user.getId(), "email", user.getEmail(), "role", user.getRole())
        ));
    }

    private record OtpEntry(String code, LocalDateTime expiresAt) {}
}
