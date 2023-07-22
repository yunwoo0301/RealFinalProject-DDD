package com.DDD.service;

import com.DDD.dto.MemberRequestDto;
import com.DDD.dto.MemberResponseDto;
import com.DDD.dto.TokenDto;
import com.DDD.entity.Member;
import com.DDD.jwt.TokenProvider;
import com.DDD.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final EmailService emailService;

    @Transactional
    public MemberResponseDto signup(MemberRequestDto requestDto) {
        if (memberRepository.existsByEmail(requestDto.getEmail())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        } else {
            Member member = requestDto.toMember(passwordEncoder);
            String emailCheckToken = UUID.randomUUID().toString();
            member.setEmailCheckToken(emailCheckToken);
            memberRepository.save(member);

            // Compose email content
            String subject = ":DDD 회원가입 이메일 인증";
            String body = "<div style=\"background-color: #f6f6f6; padding: 20px;\">"
                    + "<h1 style=\"color: #333; font-size: 24px;\">:DDD 회원가입 이메일 인증</h1>"
                    + "<p style=\"color: #333; font-size: 18px;\">안녕하세요 :) 이메일 인증을 위한 이메일입니다. </p>"
                    + "<p style=\"color: #333; font-size: 18px;\"> 아래 링크를  </p>"
                    + "<a style=\"display: inline-block; color: #fff; background-color: #007bff; border: solid 1px #007bff; "
                    + "padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 18px;\" "
                    + "href=\"http://localhost:8111/login/check-email-token?token=" + emailCheckToken + "\">Confirm Email</a>"
                    + "</div>";

            // Send email
            emailService.sendMail(member.getEmail(), subject, body);
            log.info("AuthService의 email : "+ member.getEmail());
            log.info("AuthService의 email token : "+ emailCheckToken);
            return MemberResponseDto.of(member);
        }
    }


    public boolean getIsActive(Long memberId) {
        Optional<Member> memberOptional = memberRepository.findById(memberId);

        // If no member is present, throw an exception
        if (!memberOptional.isPresent()) {
            throw new UsernameNotFoundException("No user found with email: " + memberId);
        }

        // If a member is present, return its isActive status
        Member member = memberOptional.get();
        return member.isActive();
    }

    public TokenDto login(MemberRequestDto requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        Long memberId = getMemberIdByEmail(requestDto.getEmail());
        boolean isActive = getIsActive(memberId);
        if (!isActive) {
            throw new RuntimeException("This account is inactive.");
        }

        // 사용자가 활성 상태라면 인증을 진행합니다.
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        return tokenProvider.generateTokenDto(authentication, memberId); // memberId 인자 추가
    }


    // 회원 삭제
    public void delete(MemberRequestDto requestDto) {
        Member member = memberRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (!passwordEncoder.matches(requestDto.getPassword(), member.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }
        member.setActive(false);
        member.setDeleteDate(LocalDateTime.now());
        memberRepository.save(member);
    }

    // 비밀번호 변경
    public void changePw(Long id, String password, String newPassword){
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(password, member.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        } else {
            member.setPassword(passwordEncoder.encode(newPassword));
            memberRepository.save(member);
        }
    }



    public Long getMemberIdByEmail(String email) {
        return memberRepository.findByEmail(email)
                .map(Member::getId)
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일을 가진 사용자를 찾을 수 없습니다."));
    }
}
