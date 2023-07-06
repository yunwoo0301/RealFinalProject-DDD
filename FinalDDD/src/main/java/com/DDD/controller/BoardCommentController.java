package com.DDD.controller;


import com.DDD.entity.BoardComment;
import com.DDD.service.BoardCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/comments")
//@CrossOrigin(origins = "http://localhost:3000")
public class BoardCommentController {
    private final BoardCommentService boardCommentService;

    // 댓글 작성
    @PostMapping("/commentWrite")
    public ResponseEntity<Boolean> commentWrite(@RequestBody Map<String, String> commentData) {
        String comment = commentData.get("comment");
        Long id = Long.valueOf(commentData.get("getId"));
        Long boardNo = Long.valueOf(commentData.get("boardNo"));
        boolean result = boardCommentService.createComments(comment, id, boardNo);
        if (result) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    // 댓글 삭제
    @DeleteMapping("/commentDelete/{commentNo}")
    public ResponseEntity<String> commentDelete(@PathVariable Long commentNo) {
        try {
            boardCommentService.deleteComments(commentNo);
            return ResponseEntity.ok("댓글이 삭제되었습니다");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 삭제 중 오류가 발생되었습니다.");
        }
    }

}

