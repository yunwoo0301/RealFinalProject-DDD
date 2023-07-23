package com.DDD.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "token_id")
    private Long id;
    @Column(nullable = false)
    private String memberId; // Member의 member_id

    @Column(nullable = false)
    private String refreshToken; // 리프레쉬 토큰

    // 로그인 시 리프레쉬 토큰이 자동으로 insert, 엔터티 내에 userId가 존재한다면 update를 실행.
    // findUserId 메소드 실행해서 아이디가 없을 경우 생성자를 사용해 새 객체 생성 후 엔터티에 저장.
    // 엔터티 내에 같은 아이디가 존재할 경우 아래의 update 메소드를 실행해 리프레쉬 토큰 재발급 후 DB에 저장
    public RefreshToken(String memberId, String refreshToken) {
        this.memberId = memberId;
        this.refreshToken = refreshToken;
    }

    // refreshToken을 이미 발급받은 사용자가 재발급 받을 때 사용됨.
    public RefreshToken update(String newRefreshToken) {
        this.refreshToken = newRefreshToken;
        return this;
    }
}