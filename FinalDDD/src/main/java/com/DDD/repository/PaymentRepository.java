package com.DDD.repository;

import com.DDD.entity.Member;
import com.DDD.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByMember(Member member);
}
