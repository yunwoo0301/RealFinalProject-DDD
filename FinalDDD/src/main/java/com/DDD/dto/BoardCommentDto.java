package com.DDD.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BoardCommentDto {
    private Long commentNo; // 댓글번호
    private String category; // 카테고리(게시판) **
    private String content; // 댓글내용
    private LocalDateTime writeDate; // 작성일자
    private Long boardNo; // 게시판번호
    private Long id; // 회원번호
    private String profileImg; // 프로필사진
    private String nickname; // 닉네임

    private String categoryName; // 카테고리이름
    private String boardTitle; // 글제목
}
