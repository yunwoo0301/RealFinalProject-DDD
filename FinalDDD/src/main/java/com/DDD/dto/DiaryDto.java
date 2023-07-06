package com.DDD.dto;

import com.DDD.entity.Diary;
import com.DDD.entity.Exhibitions;
import com.DDD.entity.Member;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Getter @Setter @ToString
@RequiredArgsConstructor
@Slf4j
public class DiaryDto implements Serializable {
    private transient Long memberId;
    private Long diaryId;
    private LocalDateTime regDate;
    private double rateStar;
    private String comment;
//    private Exhibitions Exhibitions;
    private transient Exhibitions exhibitions;

}
//public class DiaryDto {
//    private long diaryId;
//    private long memberId;
//    private LocalDateTime regDate;
//    private double rateStar;
//    private String comment;
//    private Exhibitions Exhibitions;



