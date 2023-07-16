package com.DDD.jwt;

import com.DDD.dto.TokenDto;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class TokenProvider {
    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "bearer";


    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; // 30분(인증권한에 대한 발급받은 토큰의 허용 시간을 짧게 잡아야함) 토큰을 재생산해야되는

    private static final long REFRESH_TOKEN_EXPIRE_TIME = 7L * 24 * 60 * 60 * 1000;
    // Refresh Token 설정
    private final Key key;



    // 주의점: 여기서 @Value 는 `springframework.beans.factory.annotation.Value`소속이다! lombok의 @Value와 착각하지 말것!
    public TokenProvider(@Value("${springboot.jwt.secret}") String secretKey) { // 시크릿 키값
        this.key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }

    public Long getMemberIdFromToken(String token) {
        Claims claims = parseClaims(token);
        return claims.get("memberId", Long.class);
    }

    // 토큰 생성
    public TokenDto generateTokenDto(Authentication authentication, Long memberId) {

        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();


        Date tokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);


        System.out.println(tokenExpiresIn);

        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities) // 원하는 정보를 넣어주는 곳
                .setExpiration(tokenExpiresIn)
                .claim("memberId", memberId)
                .signWith(key, SignatureAlgorithm.HS512) // 서명 키
                .compact();
        log.info("새로운 AccessToken 발급: " + accessToken);

        Date refreshTokenExpiresIn = new Date(now + REFRESH_TOKEN_EXPIRE_TIME);
        String refreshToken = Jwts.builder()
                .setSubject(authentication.getName())
                .claim(AUTHORITIES_KEY, authorities)
                .claim("memberId", memberId)
                .setExpiration(refreshTokenExpiresIn)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        log.info("새로운 RefreshToken 발급: " + refreshToken);


        return TokenDto.builder()
                .grantType(BEARER_TYPE)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .tokenExpiresIn(tokenExpiresIn.getTime())
                .memberId(memberId) // memberId 추가
                .build();
    }

    public TokenDto refreshToken(String expiredToken) {
        // 만료된 토큰을 파싱함
        Claims claims = parseClaims(expiredToken);

        // 권한 정보 체크
        if (claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        // 토큰이 권한이 있다면, 새로운 accessToken 발급
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        UserDetails principal = new User(claims.getSubject(), "", authorities);
        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, "", authorities);

        Long memberId = getMemberIdFromToken(expiredToken); // memberId를 추출함.

        // memberId와 함께 인증서 다시 보냄.
        return generateTokenDto(authentication, memberId);
    }



    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        if (claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        UserDetails principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}