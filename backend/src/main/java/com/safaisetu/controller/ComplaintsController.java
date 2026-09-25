package com.safaisetu.controller;

import com.safaisetu.model.Complaint;
import com.safaisetu.repository.ComplaintRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintsController {

    private final ComplaintRepository complaintRepository;

    public ComplaintsController(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaintById(@PathVariable String id) {
        return complaintRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Complaint createComplaint(@RequestBody Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Complaint> updateStatus(@PathVariable String id, @RequestParam String status) {
        return complaintRepository.findById(id)
            .map(existing -> {
                existing.setStatus(status);
                return ResponseEntity.ok(complaintRepository.save(existing));
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
