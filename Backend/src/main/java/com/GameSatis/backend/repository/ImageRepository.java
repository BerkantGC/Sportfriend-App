package com.GameSatis.backend.repository;

import com.GameSatis.backend.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Image findByName(String name);
}
