package com.DDD.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "diary")
@Getter
@Setter
@ToString
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Diary {
    @Id
    @Column(name = "diary_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long diaryId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private LocalDateTime regDate;

    private double rateStar;

    private String comment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exhibit_no")
    private Exhibitions exhibitions;

    @PrePersist
    protected void onCreate() {
        regDate = LocalDateTime.now();
    }

    public void update(double rateStar, String comment) {
        this.rateStar = rateStar;
        this.comment = comment;
    }
    public void updateStar(double rateStar) {
        this.rateStar = rateStar;
    }
    public void updateComment(String comment) {
        this.comment = comment;
    }

    @Builder
    public Diary(Member member, LocalDateTime regDate, double rateStar, String comment, Exhibitions exhibitions) {
        this.member = member;
        this.regDate = regDate;
        this.rateStar = rateStar;
        this.comment = comment;
        this.exhibitions = exhibitions;
    }
}
