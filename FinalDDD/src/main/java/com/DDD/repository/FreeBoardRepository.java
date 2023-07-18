package com.DDD.repository;

// DB 에 접근 가능한 Repository 생성(DAO), 요청과 응답만 처리
// JpaRepository<테이블명, PK에 대한 데이터형>

import com.DDD.entity.FreeBoard;
import com.DDD.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface FreeBoardRepository extends JpaRepository<FreeBoard, Long> {
    // 게시판번호(PK) 찾기
    Optional<FreeBoard> findById(long boardNo);

    // 자유게시판 카테고리별 목록 조회
    List<FreeBoard> findByCategory(String category);

    // 자유게시판 최근 작성순 카테고리별 목록 조회 ** 추가
    List<FreeBoard> findByCategoryOrderByWriteDateDesc(String category);

    // 자유게시판 제목 or 내용 게시글 검색 조회
    @Query("SELECT fb FROM FreeBoard fb WHERE fb.title LIKE %:keyword% OR fb.contents LIKE %:keyword% ORDER BY fb.boardNo DESC")
    List<FreeBoard> findWithKeyword(@Param("keyword") String keyword);

    // 마이페이지 내 게시물 조회
    List<FreeBoard> findByMember(Member member);

    // 이전 게시글 조회
    @Query("SELECT fb FROM FreeBoard fb " +
            "WHERE fb.category = :category " +
            "AND fb.boardNo < :currentBoardNo " +
            "ORDER BY fb.boardNo DESC")
    List<FreeBoard> findPrevBoard(@Param("currentBoardNo") Long currentBoardNo, @Param("category") String category, Pageable pageable);

    // 다음 게시글 조회
    @Query("SELECT fb FROM FreeBoard fb " +
            "WHERE fb.category = :category " +
            "AND fb.boardNo > :currentBoardNo " +
            "ORDER BY fb.boardNo ASC")
    List<FreeBoard> findNextBoard(@Param("currentBoardNo") Long currentBoardNo, @Param("category") String category, Pageable pageable);
}

