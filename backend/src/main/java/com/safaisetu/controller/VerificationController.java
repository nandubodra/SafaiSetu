package com.safaisetu.controller;

import com.safaisetu.model.Notification;
import com.safaisetu.repository.NotificationRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @GetMapping("/notifications/{userId}")
    public List<Notification> getNotifications(@PathVariable String userId) {
        return notificationRepository.findAll().stream()
            .filter(notification -> notification.getUserId().equals(userId))
            .toList();
    }

    @PostMapping("/notifications")
    public Notification createNotification(@RequestBody Notification notification) {
        notification.setRead(false);
        notification.setCreatedAt(LocalDateTime.now());
        return notificationRepository.save(notification);
    }

    @PutMapping("/notifications/{id}/read")
    public Notification markAsRead(@PathVariable String id) {
        Notification notification = notificationRepository.findById(id).orElseThrow();
        notification.setRead(true);
        return notificationRepository.save(notification);
    }
}
