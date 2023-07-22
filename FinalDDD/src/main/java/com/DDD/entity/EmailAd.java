package com.DDD.entity;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
public class EmailAd {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long emailNo;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String title;
    private String emailContents;
    private LocalDateTime sentDate;


}
