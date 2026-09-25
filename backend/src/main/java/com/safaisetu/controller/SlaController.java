package com.safaisetu.controller;

import com.safaisetu.dto.AnalyticsSummary;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AnalyticsController {

    @GetMapping("/analytics/summary")
    public List<AnalyticsSummary> getAnalyticsSummary() {
        return List.of(
            new AnalyticsSummary("Average resolution time", "4.2 days"),
            new AnalyticsSummary("Resolution rate", "72%"),
            new AnalyticsSummary("Overdue complaints", "23"),
            new AnalyticsSummary("Citizen satisfaction", "88%")
        );
    }
}
