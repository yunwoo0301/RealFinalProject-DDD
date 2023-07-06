package com.DDD.repository;

import com.DDD.entity.Diary;
import com.DDD.entity.Exhibitions;
import com.DDD.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long>{
    List<Diary> findByMemberId(Long id);

    List<Diary> findByMember(Member member);

    Diary findByMemberAndExhibitions(Member member, Exhibitions exhibitions);

}
