package com.safaisetu.controller;

import com.safaisetu.dto.ComplaintRequest;
import com.safaisetu.model.Complaint;
import com.safaisetu.repository.ComplaintRepository;
import com.safaisetu.service.AiClassificationService;
import com.safaisetu.service.DuplicateComplaintService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ComplaintController {

    private final ComplaintRepository complaintRepository;
    private final DuplicateComplaintService duplicateComplaintService;
    private final AiClassificationService aiClassificationService;

    public ComplaintController(
        ComplaintRepository complaintRepository,
        DuplicateComplaintService duplicateComplaintService,
        AiClassificationService aiClassificationService
    ) {
        this.complaintRepository = complaintRepository;
        this.duplicateComplaintService = duplicateComplaintService;
        this.aiClassificationService = aiClassificationService;
    }

    @GetMapping("/complaints")
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @GetMapping("/complaints/{id}")
    public ResponseEntity<Complaint> getComplaintById(@PathVariable String id) {
        return complaintRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/complaints")
    public Map<String, Object> createComplaint(@RequestBody ComplaintRequest request) {
        Complaint duplicate = duplicateComplaintService.findLikelyDuplicate(
            request.getLatitude(),
            request.getLongitude(),
            request.getCategory()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("duplicateFound", duplicate != null);

        if (duplicate != null) {
            response.put("duplicateComplaintId", duplicate.getId());
            response.put("message", "This issue may already be reported");
        }

        Map<String, Object> aiResult = aiClassificationService.classifyImage(request.getImageUrl());

        Complaint complaint = new Complaint();
        complaint.setCitizenId(request.getCitizenId());
        complaint.setTitle(request.getTitle() != null ? request.getTitle() : "Civic Issue");
        complaint.setDescription(request.getDescription());
        complaint.setCategory(request.getCategory());
        complaint.setLatitude(request.getLatitude() != null ? request.getLatitude() : 0.0);
        complaint.setLongitude(request.getLongitude() != null ? request.getLongitude() : 0.0);
        complaint.setLocationLabel(request.getLocationLabel());
        complaint.setImageUrl(request.getImageUrl());
        complaint.setAiSuggestion((String) aiResult.get("category"));
        complaint.setAiConfidence((Double) aiResult.get("confidence"));
        complaint.setStatus("Reported");
        complaint.setCreatedAt(LocalDateTime.now());
        complaint.setUpdatedAt(LocalDateTime.now());

        Complaint savedComplaint = complaintRepository.save(complaint);
        response.put("complaint", savedComplaint);
        response.put("aiSuggestion", aiResult);
        return response;
    }

    @PutMapping("/complaints/{id}/status")
    public ResponseEntity<Complaint> updateStatus(@PathVariable String id, @RequestParam String status) {
        return complaintRepository.findById(id)
            .map(existing -> {
                existing.setStatus(status);
                existing.setUpdatedAt(LocalDateTime.now());
                if ("Resolved".equalsIgnoreCase(status)) {
                    existing.setResolvedAt(LocalDateTime.now());
                }
                return ResponseEntity.ok(complaintRepository.save(existing));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/complaints/{id}/resolution")
    public ResponseEntity<Complaint> updateResolution(
        @PathVariable String id,
        @RequestParam String resolutionNote,
        @RequestParam String afterImageUrl
    ) {
        return complaintRepository.findById(id)
            .map(existing -> {
                existing.setResolutionNote(resolutionNote);
                existing.setAfterImageUrl(afterImageUrl);
                existing.setStatus("Citizen Verification");
                existing.setUpdatedAt(LocalDateTime.now());
                return ResponseEntity.ok(complaintRepository.save(existing));
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
