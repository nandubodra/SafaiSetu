package com.safaisetu.repository;

import com.safaisetu.model.Hotspot;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotspotRepository extends MongoRepository<Hotspot, String> {
}
