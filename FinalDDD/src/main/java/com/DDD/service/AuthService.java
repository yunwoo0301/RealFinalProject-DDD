package com.DDD.service;

import com.DDD.dto.MemberRequestDto;
import com.DDD.dto.MemberResponseDto;
import com.DDD.dto.TokenDto;
import com.DDD.entity.Member;
import com.DDD.entity.RefreshToken;
import com.DDD.jwt.TokenProvider;
import com.DDD.repository.MemberRepository;
import com.DDD.repository.RefreshTokenRepository;
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

import java.util.Optional;
import java.util.UUID;

// ==================== 이메일 인증 창 port번호 확인 ======================
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
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
            String subject = "Email Confirmation";
            String body = "<!DOCTYPE html>\n" +
                    "<html>\n" +
                    "<head>\n" +
                    "    <title>이메일 주소 확인</title>\n" +
                    "</head>\n" +
                    "<body style=\"margin: 0; padding: 0; background-color: #f6f6f6;\">\n" +
                    "    <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
                    "        <tr>\n" +
                    "            <td style=\"padding: 20px; text-align: center; font-family: Arial, sans-serif; font-size: 24px; color: #333;\">\n" +
                    "                <h1 style=\"margin-bottom: 20px;\">이메일 주소 확인</h1>\n" +
                    "                <p style=\"font-size: 18px; color: #333;\">안녕하세요 :) :DDD 가입을 환영합니다🥰🥰</p>\n" +
                    "                <p style=\"font-size: 18px; color: #333;\">이메일 주소 확인을 위해 아래 링크를 클릭해주세요.</p>\n" +
                    "                <p style=\"font-size: 18px; color: #333;\">계속하시려면 아래 \"이메일 확인\" 버튼을 클릭하세요.</p>\n" +
                    "                <a href=\"https://myexhibitions.store/login/check-email-token?token=" + emailCheckToken + "\"\n" +
                    "                   style=\"display: inline-block; color: #fff; background-color: #007bff; border: solid 1px #007bff;\n" +
                    "                   padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 18px; margin-top: 20px;\">\n" +
                    "                    이메일 확인\n" +
                    "                </a>\n" +
                    "                <p style=\"font-size: 18px; color: #333; margin-top: 20px;\">\n" +
                    "                    회원가입을 원치 않으시면 이 이메일을 무시하셔도 됩니다.\n" +
                    "                </p>\n" +
                    "            </td>\n" +
                    "        </tr>\n" +
                    "    </table>\n" +
                    "</body>\n" +
                    "</html>";
            // Send email
            emailService.sendMail(member.getEmail(), subject, body);
            log.info("AuthService의 email : "+ member.getEmail());
            log.info("AuthService의 email token : "+ emailCheckToken);
            return MemberResponseDto.of(member);
        }
    }
//

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

    @Transactional
    public TokenDto login(MemberRequestDto requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        Long memberId = getMemberIdByEmail(requestDto.getEmail());
        boolean isActive = getIsActive(memberId);
        if (!isActive) {
            throw new RuntimeException("This account is inactive.");
        }

        // 사용자가 활성 상태라면 인증을 진행합니다.
        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        // Generate new tokens
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication, memberId); // memberId 인자 추가

        // Create or update refresh token entity
        Optional<RefreshToken> refreshTokenOptional = refreshTokenRepository.findById(memberId);
        if (refreshTokenOptional.isPresent()) {
            // If refresh token exists for the user, update it
            RefreshToken refreshToken = refreshTokenOptional.get();
            refreshToken.update(tokenDto.getRefreshToken());
        } else {
            // If refresh token does not exist for the user, create a new one
            RefreshToken refreshToken = new RefreshToken(String.valueOf(memberId), tokenDto.getRefreshToken());
            log.info(String.valueOf(refreshToken));
            refreshTokenRepository.save(refreshToken);
        }

        return tokenDto;
    }


    // 회원 삭제
    public void delete(MemberRequestDto requestDto) {
        Member member = memberRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (!passwordEncoder.matches(requestDto.getPassword(), member.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }
        member.setActive(false);
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
