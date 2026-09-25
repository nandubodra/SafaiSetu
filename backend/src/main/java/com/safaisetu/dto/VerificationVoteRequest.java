package com.safaisetu.dto;

import lombok.Data;

@Data
public class ComplaintRequest {
    private String citizenId;
    private String title;
    private String description;
    private String category;
    private Double latitude;
    private Double longitude;
    private String locationLabel;
    private String imageUrl;
}
