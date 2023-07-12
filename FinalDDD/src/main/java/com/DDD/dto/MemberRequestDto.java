package com.DDD.dto;

import com.DDD.constant.Authority;
import com.DDD.entity.Member;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberRequestDto { // DB 넣어질 요소
    private String email;
    private String name;
    private String password;
    private String tel;
    private String nickname;
    private String instagram;
    private String profileImg;
    private String backgroundImg;
    private String introduce;
    private boolean isActive;
    private Authority authority;
    private LocalDateTime regDate;

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .nickname(nickname)
                .name(name)
                .tel(tel)
                .authority(Authority.ROLE_USER)
                .isActive(true)
                .instagram(instagram)
                .profileImg("/default-profile.png")
                .backgroundImg("/default-BG.jpg")
                .regDate(regDate)
                .build();
    }


    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}

