package com.DDD.repository;

import com.DDD.entity.ExhibitComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExhibitCommentRepository extends JpaRepository<ExhibitComment, Long> {
    List<ExhibitComment> findByExhibitions_ExhibitNo(Long exhibitNo);
    List<ExhibitComment> findByMemberId(Long memberId);

}
