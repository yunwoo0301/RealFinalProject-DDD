package com.DDD.entity;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long messageNo;
    @ManyToOne
    @JoinColumn(name = "sender_id", referencedColumnName = "member_id")
    private Member sender; // 메세지를 보내는 사람

    @ManyToOne
    @JoinColumn(name = "receiver_id", referencedColumnName = "member_id")
    private Member receiver; // 메세지를 받는 사람
    private String messageTitle;
    private String messageContents;
    private LocalDateTime messageDate;
    @Column(columnDefinition = "int default 0") // isOpened 필드의 기본값을 0으로 설정
    private int isOpened; // 확인했는지 여부확인


}
