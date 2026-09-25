package com.safaisetu.controller;

import com.safaisetu.dto.VerificationVoteRequest;
import com.safaisetu.model.VerificationVote;
import com.safaisetu.repository.VerificationVoteRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class VerificationController {

    private final VerificationVoteRepository verificationVoteRepository;

    public VerificationController(VerificationVoteRepository verificationVoteRepository) {
        this.verificationVoteRepository = verificationVoteRepository;
    }

    @PostMapping("/complaints/verify")
    public VerificationVote submitVote(@RequestBody VerificationVoteRequest request) {
        VerificationVote vote = new VerificationVote();
        vote.setComplaintId(request.getComplaintId());
        vote.setUserId(request.getUserId());
        vote.setVote(request.getVote());
        vote.setCreatedAt(LocalDateTime.now());
        vote.setValid(true);
        return verificationVoteRepository.save(vote);
    }

    @GetMapping("/complaints/{complaintId}/votes")
    public List<VerificationVote> getVotes(@PathVariable String complaintId) {
        return verificationVoteRepository.findAll().stream()
            .filter(vote -> vote.getComplaintId().equals(complaintId))
            .toList();
    }
}
