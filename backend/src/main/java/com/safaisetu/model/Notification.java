package com.safaisetu.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "complaints")
public class Complaint {
    @Id
    private String id;

    private String citizenId;
    private String title;
    private String description;
    private String category;
    private String status;
    private Double latitude;
    private Double longitude;
    private String locationLabel;
    private String imageUrl;
    private String aiSuggestion;
    private Double aiConfidence;
    private List<String> tags;
    private String assignedTo;
    private String authorityDepartment;
    private String resolutionNote;
    private String beforeImageUrl;
    private String afterImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime resolvedAt;
}
