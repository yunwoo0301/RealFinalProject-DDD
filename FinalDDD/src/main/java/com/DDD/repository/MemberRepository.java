package com.DDD.repository;

import com.DDD.entity.Diary;
import com.DDD.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    // 이메일 전체 조회 (이메일 중복 체크)
    Optional<Member> findByEmail(String email);

    Optional<Member> findByDiary(Diary diary);

    // 이메일 존재여부 추가함
    boolean existsByEmail(String email);

    // 닉네임 전체 조회 (닉네임 중복 체크)
    Optional<Member> findByNickname(String nickname);

//    boolean getIsActive(Long memberId);

    // 회원번호(PK) 찾기
    Optional<Member> findById(Long id);

    // 비밀번호 조회
    Member findByPassword(String password);

}
//    List<Member> findAll();
