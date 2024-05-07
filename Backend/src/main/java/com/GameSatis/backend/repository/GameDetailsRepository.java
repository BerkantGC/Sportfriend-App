package com.GameSatis.backend.repository;

import com.GameSatis.backend.model.GameDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameDetailsRepository extends JpaRepository<GameDetails, Long> {
    GameDetails getById(Long id);
}
