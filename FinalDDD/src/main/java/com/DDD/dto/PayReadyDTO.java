package com.DDD.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter @Setter @ToString
@RequiredArgsConstructor
public class PayReadyDTO {
    // 결제요청(준비)
    private String tid; // 결제 고유번호
    private String next_redirect_pc_url;
    // 요청한 클라이언트가 PC웹일경우
    // 카카오톡으로 결체요청메세지를 보내기위한 사용자 정보 입력화면 Redirect URL
    private LocalDateTime created_at;
}
