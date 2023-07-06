package com.DDD.entity;

import jdk.jfr.Timestamp;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "board_comment")
@Getter
@Setter
@ToString
public class BoardComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name= "comment_no")
    private Long commentNo; // 댓글 번호

    @Column(nullable = false, length = 1500)
    private String content; // 댓글 내용

    @CreatedDate
    @Column(name = "comment_write")
    private LocalDateTime writeDate; // 댓글 작성일

    // 게시판 테이블의 게시판 번호를 외래 키(FK)로 가져옴(한 개의 게시물의 여러 댓글)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_no")
    private FreeBoard freeBoard; // 게시판 번호

    // 회원 테이블의 회원 번호를 외래 키(FK)로 가져옴(한 명의 회원의 여러 댓글)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Override
    public String toString() { // 게시판 테이블 조인 시 toString 적용 안되어 별도 적용
        return "BoardComment{" +
                "commentNo=" + commentNo +
                ", content='" + content + '\'' +
                ", writeDate=" + writeDate +
                '}';
        }
    }
