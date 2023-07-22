package com.DDD.controller;


import com.DDD.dto.MemberDto;
import com.DDD.dto.MemberRequestDto;
import com.DDD.dto.MemberResponseDto;
import com.DDD.dto.TokenDto;
import com.DDD.entity.Member;
import com.DDD.repository.MemberRepository;
import com.DDD.service.AuthService;
import com.DDD.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final AuthService authService;
    private final MemberRepository memberRepository;


    @PostMapping
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
    }

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto requestDto) {
        return ResponseEntity.ok(authService.signup(requestDto));
    }

    @GetMapping("/check-email-token")
    public String checkEmailToken(@RequestParam String token, @RequestParam String email){
        Optional<Member> memberOpt = memberRepository.findByEmail(email);
        if(memberOpt.isPresent()){
            Member member = memberOpt.get();
            if(member.getEmailCheckToken().equals(token)){
                member.setActive(true);
                member.setEmailCheckToken(null); // after validation you can null the token
                memberRepository.save(member);
                return "인증이 완료되었습니다.";
            }
        }
        return "인증에 실패하였습니다.";
    }


    @PostMapping("/forgot")
    public ResponseEntity<Boolean> forgotPw(@RequestBody Map<String, String> forgotEmail) {
        String email = forgotEmail.get("email");
        boolean sendNewPassword = memberService.forgotEmail(email);
        return ResponseEntity.ok(sendNewPassword);
    }




    @PostMapping("/emaildup")
    public ResponseEntity<Boolean> emailDup(@RequestBody Map<String, String> emailDupData) {
        String email = emailDupData.get("email");
        boolean isDuplicate = memberService.emailDupCk(email);
        return ResponseEntity.ok(isDuplicate);
    }

    @PostMapping("/nicknamedup")
    public ResponseEntity<Boolean> nicknameDup(@RequestBody Map<String, String> nicknameDupData) {
        String nickname = nicknameDupData.get("nickname");
        boolean isDuplicate = memberService.nicknameDupCk(nickname);
        return ResponseEntity.ok(isDuplicate);
    }

    // 멤버전체조회(관리자)
    @GetMapping("/allMembers")
    public List<MemberDto> findAllMembers() {
        return memberService.findAllMembers();
    }

    // 이메일변경(관리자)
    @PostMapping("/changeEmail")
    public ResponseEntity<Boolean> changeEmail(@RequestBody Map<String, String> emailData) {
        Long id = Long.valueOf(emailData.get("id"));
        String email = emailData.get("email");
        return ResponseEntity.ok(memberService.newEmail(id, email));
    }



}
