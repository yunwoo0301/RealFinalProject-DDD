package com.DDD.dto;

import com.DDD.entity.Member;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class FreeBoardDto {  // 프론트엔드와 주고 받을 때 사용
    private Long boardNo; // 게시판 번호
    private String author; // 작성자 닉네임
    private Long id; // 회원 아이디
    private String category; // 게시판 카테고리
    private String region; // 지역 카테고리
    private String title; // 게시판 제목
    private String contents; // 게시판 내용
    private String image; // 게시판 이미지
//    private int views; // 게시판 조회수
    private Integer views; // 게시판 조회수
    private LocalDateTime writeDate; // 게시판 작성일
    private String profileImg; // 프로필 이미지 추가
    private List<Map<String, Object>> boardList; // 검색어용 게시판 리스트 추가
    private boolean isOk; // 검색 결과 여부

    private List<BoardCommentDto> comments; // 댓글 리스트 추가
}
