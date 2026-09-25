package com.safaisetu.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "hotspots")
public class Hotspot {
    @Id
    private String id;

    private String category;
    private Double latitude;
    private Double longitude;
    private Integer complaintCount;
    private String severity;
    private Double radiusInMeters;
}
