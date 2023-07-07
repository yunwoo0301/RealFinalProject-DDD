package com.DDD.controller;

import com.DDD.dto.MemberDto;
import com.DDD.dto.MemberRequestDto;
import com.DDD.service.AuthService;
import com.DDD.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage/{memberId}")
//@CrossOrigin(origins = "http://localhost:3000")
public class MyPageController {
    private final MemberService memberService;
    private final AuthService authService;


    // 마이페이지 정보 가져오기
    @GetMapping
    public ResponseEntity<MemberDto> getInfo(@PathVariable Long memberId) {
        MemberDto member = memberService.getMemberInfo(memberId);
        return new ResponseEntity<>(member, HttpStatus.OK);
    }

    // 닉네임 변경하기
    @PostMapping("/nickname")
    public ResponseEntity<Boolean> changeNickname(@RequestBody Map<String, String> infoData) {
        Long id = Long.valueOf(infoData.get("id"));
        String nickname = infoData.get("nickname");
        return ResponseEntity.ok(memberService.newNickname(id, nickname));
    }

    // 닉네임 중복체크
    @PostMapping("/nicknamedup")
    public ResponseEntity<Boolean> nicknameDup(@RequestBody Map<String, String> nicknameDupData) {
        String nickname = nicknameDupData.get("nickname");
        boolean isDuplicate = memberService.nicknameDupCk(nickname);
        return ResponseEntity.ok(isDuplicate);
    }

    // 이름 변경하기
    @PostMapping("/name")
    public ResponseEntity<Boolean> changeName(@RequestBody Map<String, String> infoData) {
        Long id = Long.valueOf(infoData.get("id"));
        String name = infoData.get("name");
        return ResponseEntity.ok(memberService.newName(id, name));
    }

    // 전화번호 변경하기
    @PostMapping("/tel")
    public ResponseEntity<Boolean> changeTel(@RequestBody Map<String, String> infoData) {
        Long id = Long.valueOf(infoData.get("id"));
        String tel = infoData.get("tel");
        return ResponseEntity.ok(memberService.newTel(id, tel));
    }

    // 인스타그램 변경하기
    @PostMapping("/instagram")
    public ResponseEntity<Boolean> changeInstagram(@RequestBody Map<String, String> infoData) {
        Long id = Long.valueOf(infoData.get("id"));
        String instagram = infoData.get("instagram");
        return ResponseEntity.ok(memberService.newInstagram(id, instagram));
    }

    // 소개글 변경하기
    @PostMapping("/introduce")
    public ResponseEntity<Boolean> changeIntroduce(@RequestBody Map<String, String> infoData) {
        Long id = Long.valueOf(infoData.get("id"));
        String introduce = infoData.get("introduce");
        return ResponseEntity.ok(memberService.newIntroduce(id, introduce));
    }

    // 회원 탈퇴 (Active false로 변경)
    @PostMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody MemberRequestDto requestDto) {
        authService.delete(requestDto);
        return ResponseEntity.ok("Member deactivated successfully");
    }

    // 비밀번호 변경
    @PostMapping("/password")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> infoData) {
        Long id = Long.valueOf(infoData.get("id"));
        String password = infoData.get("password");
        String newPassword = infoData.get("newPassword");

        authService.changePw(id, password, newPassword);
        return ResponseEntity.ok("password changed successfully");
    }




}
