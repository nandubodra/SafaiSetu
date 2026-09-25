package com.safaisetu.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "verificationVotes")
public class VerificationVote {
    @Id
    private String id;

    private String complaintId;
    private String userId;
    private String vote;
    private LocalDateTime createdAt;
    private Boolean valid;
}
