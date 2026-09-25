package com.safaisetu.controller;

import com.safaisetu.model.SlaMetric;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SlaController {

    @GetMapping("/sla")
    public List<SlaMetric> getSlaMetrics() {
        return List.of(
            new SlaMetric("1", "SS-10245", "Garbage", "AT_RISK", 2),
            new SlaMetric("2", "SS-10311", "Water", "WATCH", 1),
            new SlaMetric("3", "SS-10312", "Roads", "ON_TRACK", 0)
        );
    }
}
