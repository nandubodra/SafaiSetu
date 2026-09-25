package com.safaisetu.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class DashboardController {

    @GetMapping("/health")
    public String health() {
        return "SafaiSetu backend is running";
    }

    @GetMapping("/dashboard/summary")
    public Map<String, Long> getSummary() {
        return Map.of(
            "totalReports", 1248L,
            "pending", 183L,
            "inProgress", 241L,
            "resolved", 824L
        );
    }
}
