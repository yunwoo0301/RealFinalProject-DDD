package com.DDD.dto;


import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter @ToString
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {
    private Long messageNo; //메세지번호(pk)
    private String senderId;
    private String senderNickname;
    private String receiverId;
    private String receiverNickname;
    private String title;
    private String contents;
    private LocalDateTime messageDate;


}
