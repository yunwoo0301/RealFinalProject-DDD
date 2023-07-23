package com.DDD.service;

import com.DDD.dto.TokenDto;
import com.DDD.entity.Member;
import com.DDD.entity.RefreshToken;
import com.DDD.jwt.TokenProvider;
import com.DDD.repository.MemberRepository;
import com.DDD.repository.RefreshTokenRepository;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class TokenService {
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;

    public TokenDto createNewAccessToken(String refreshToken) {
        if(!tokenProvider.validateToken(refreshToken)) {
            log.error("Refresh Token이 만료되었습니다. 재발급이 필요합니다.");
            throw new IllegalArgumentException("Refresh Token이 만료되었습니다. 재발급이 필요합니다.");
        }

        //리프레쉬 토큰으로 액세스토큰을 재발급 받음 , 리프레쉬 토큰은 로그인할 때 항상 재발급 되어서 업데이트 됨.
        RefreshToken refreshTokenObject = refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new NoSuchElementException("유효한 Refresh Token이 없습니다."));

        Long memberId = Long.valueOf(refreshTokenObject.getMemberId());

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoSuchElementException("멤버 정보를 찾을 수 없습니다."));

        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(member.getAuthority().toString()));

        // member를 Authentication 객체로 변환
        UserDetails userDetails = User.withUsername(String.valueOf(member.getId()))
                .password(member.getPassword())
                .authorities(authorities)
                .build();

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, "", authorities);

        return tokenProvider.generateAccessTokenDto(authentication, memberId, refreshToken); // passing memberId and refreshToken to the method
    }
}