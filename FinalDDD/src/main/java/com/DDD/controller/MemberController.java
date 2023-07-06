package com.DDD.controller;


import com.DDD.dto.MemberRequestDto;
import com.DDD.dto.MemberResponseDto;
import com.DDD.dto.TokenDto;
import com.DDD.service.AuthService;
import com.DDD.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@Slf4j

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {
    private final MemberService memberService;
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto requestDto) {
        return ResponseEntity.ok(authService.signup(requestDto));
    }


    @PostMapping
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto requestDto) {
        return ResponseEntity.ok(authService.login(requestDto));
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



}
