package com.safaisetu.controller;

import com.safaisetu.model.Hotspot;
import com.safaisetu.repository.HotspotRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class HotspotController {

    private final HotspotRepository hotspotRepository;

    public HotspotController(HotspotRepository hotspotRepository) {
        this.hotspotRepository = hotspotRepository;
    }

    @GetMapping("/hotspots")
    public List<Hotspot> getHotspots() {
        return hotspotRepository.findAll();
    }
}
