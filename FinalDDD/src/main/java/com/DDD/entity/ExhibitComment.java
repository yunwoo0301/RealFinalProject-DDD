package com.DDD.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
@NoArgsConstructor
@Table(name = "exhibitComment")
public class ExhibitComment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long commentNo; // pk; 한줄평 번호
    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member; // 회원과 조인
    @ManyToOne
    @JoinColumn(name="exhibit_no")
    private Exhibitions exhibitions; // 전시회와 조인
    private double starRates; // 별점
    private String comment; // 한줄평
    private LocalDateTime commentTime; // 한줄평 단 시간

}
