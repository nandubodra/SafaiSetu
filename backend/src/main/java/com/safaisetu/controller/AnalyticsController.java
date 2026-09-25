package com.safaisetu.controller;

import com.safaisetu.service.AiClassificationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    private final AiClassificationService aiClassificationService;

    public AiController(AiClassificationService aiClassificationService) {
        this.aiClassificationService = aiClassificationService;
    }

    @PostMapping("/classify")
    public Map<String, Object> classify(@RequestParam String imageUrl) {
        return aiClassificationService.classifyImage(imageUrl);
    }
}
