package com.DDD.repository;

import com.DDD.entity.BoardComment;
import com.DDD.entity.FreeBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardCommentRepository extends JpaRepository<BoardComment, Long> {
    List<BoardComment> findByFreeBoard(FreeBoard freeBoard); // 게시판 번호를 기준으로 최근 작성일로 정렬하기
    Optional<BoardComment> findById(Long commentNo); // 댓글번호 찾기
    void deleteById(Long commentNo);

}
