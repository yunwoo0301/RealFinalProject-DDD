package com.DDD.repository;

import com.DDD.entity.Exhibitions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExhibitionsRepository extends JpaRepository<Exhibitions, String> {
    // 전시번호로 찾기
    Exhibitions findByExhibitNo(Long exhibitNo);
}
