package com.GameSatis.backend.repository;


import com.GameSatis.backend.model.Games;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GamesRepository extends JpaRepository<Games,Long> {
     Games findByGameName(String gameName);
}
