package com.DDD.repository;

import com.DDD.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findById(Long memberId);
    Optional<RefreshToken> findByRefreshToken(String refreshToken);

}