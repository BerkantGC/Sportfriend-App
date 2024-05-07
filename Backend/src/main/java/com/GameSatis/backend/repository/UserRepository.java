package com.GameSatis.backend.repository;

import com.GameSatis.backend.model.UserModel;

import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

public interface UserRepository extends JpaRepository<UserModel,Long> {
    UserModel findByUsername(String username);
}
