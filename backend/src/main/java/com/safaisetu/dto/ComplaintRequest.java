package com.safaisetu.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String otp;
    private String name;
    private String role;
}
