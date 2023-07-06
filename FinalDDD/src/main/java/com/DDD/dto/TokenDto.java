package com.DDD.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TokenDto {
    private String grantType; // 토큰의 형태
    private String accessToken;
    private String refreshToken;
    private Long tokenExpiresIn;
    private Long memberId; // 추가: member의 id를 담기 위한 필드
}

