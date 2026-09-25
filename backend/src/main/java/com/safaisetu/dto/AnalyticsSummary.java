package com.safaisetu.dto;

import lombok.Data;

@Data
public class VerificationVoteRequest {
    private String complaintId;
    private String userId;
    private String vote;
}
