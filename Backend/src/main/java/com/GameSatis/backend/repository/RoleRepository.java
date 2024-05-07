package com.GameSatis.backend.repository;

import com.GameSatis.backend.model.RoleModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<RoleModel, Long> {
}
