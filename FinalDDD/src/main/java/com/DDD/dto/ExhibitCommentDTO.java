package com.DDD.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

@Getter @Setter @ToString
@RequiredArgsConstructor
@Slf4j
public class ExhibitCommentDTO {
    private Long commentNo; // 한줄평 번호
    private String memberName; // 작성자
    private String memberPic; // 작성자사진(profileImg)
    private Long exhibitNo; // 전시회 번호
    private double starRates; // 별점
    private String comment; // 한줄평
    private LocalDateTime commentTime; // 작성시간

}
