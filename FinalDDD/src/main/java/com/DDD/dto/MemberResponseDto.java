package com.DDD.dto;

import com.DDD.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {
    private String email;
    private String password;
    private String nickname;
    private String name;
    private String tel;
    private String instagram;

    public static MemberResponseDto of(Member member) { // of 메소드 : Build 타입으로
        return MemberResponseDto.builder()
                .email(member.getEmail())
                .password(member.getPassword())
                .nickname(member.getNickname())
                .name(member.getName())
                .tel(member.getTel())
                .instagram(member.getInstagram())
                .build();
    }
}
