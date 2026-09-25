package com.safaisetu.repository;

import com.safaisetu.model.VerificationVote;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationVoteRepository extends MongoRepository<VerificationVote, String> {
}
