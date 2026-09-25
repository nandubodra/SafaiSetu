package com.safaisetu.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AiClassificationService {

    public Map<String, Object> classifyImage(String imageUrl) {
        Map<String, Object> result = new HashMap<>();
        result.put("category", "Garbage");
        result.put("confidence", 0.94);
        result.put("severity", "High");
        result.put("suggestedDepartment", "Municipal Waste");
        result.put("reason", "Garbage accumulation and blocked public space");
        return result;
    }
}
