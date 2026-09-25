package com.safaisetu.controller;

import com.safaisetu.dto.AuthRequest;
import com.safaisetu.model.User;
import com.safaisetu.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final Map<String, String> otpStore = new HashMap<>();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, Object>> sendOtp(@RequestBody AuthRequest request) {
        String email = request.getEmail();
        String role = request.getRole();
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);

        otpStore.put(email + ":" + role, otp);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "OTP sent successfully");
        response.put("otp", otp);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, Object>> verifyOtp(@RequestBody AuthRequest request) {
        String key = request.getEmail() + ":" + request.getRole();
        String expectedOtp = otpStore.get(key);

        Map<String, Object> response = new HashMap<>();
        if (expectedOtp == null || !expectedOtp.equals(request.getOtp())) {
            response.put("success", false);
            response.put("message", "Invalid OTP");
            return ResponseEntity.status(401).body(response);
        }

        Optional<User> existingUser = userRepository.findAll().stream()
            .filter(user -> user.getEmail().equalsIgnoreCase(request.getEmail()))
            .findFirst();

        User user = existingUser.orElseGet(() -> {
            User newUser = new User();
            newUser.setName(request.getName() != null ? request.getName() : "User");
            newUser.setEmail(request.getEmail());
            newUser.setRole(request.getRole());
            newUser.setEmailVerified(true);
            newUser.setCreatedAt(LocalDateTime.now());
            newUser.setUpdatedAt(LocalDateTime.now());
            return userRepository.save(newUser);
        });

        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        response.put("success", true);
        response.put("message", "OTP verified successfully");
        response.put("user", Map.of(
            "id", user.getId(),
            "email", user.getEmail(),
            "role", user.getRole()
        ));

        otpStore.remove(key);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody AuthRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());
        user.setEmailVerified(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        User savedUser = userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("user", savedUser);
        return ResponseEntity.ok(response);
    }
}
