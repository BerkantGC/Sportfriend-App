package com.GameSatis.backend.repository;

import com.GameSatis.backend.model.Sellers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellersRepository extends JpaRepository<Sellers, Long> {
    Sellers findBySellerName(String sellerName);
}
