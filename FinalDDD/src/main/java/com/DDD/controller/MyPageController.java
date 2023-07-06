package com.DDD.controller;

import com.DDD.dto.MemberDto;
import com.DDD.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

//    @PostMapping("/memberdelete")
//    public ResponseEntity<Map<?, ?>> memberDelete( HttpServletResponse response, @RequestBody Map<String, Object> Data) {
//        String email = (String) Data.get("email");
//        String password = (String) Data.get("password");
//        return ResponseEntity.ok(memberService.memberDelete(email, password));
//
//    }
//    @PostMapping("/memberdelete")
//    public ResponseEntity<Map<?, ?>> memberDelete(
//            HttpServletResponse response,
//            @CookieValue(value = "token", required = false) String token,
//            @RequestBody Map<String, Object> Data) throws Exception {
//        String email = (String) Data.get("email");
//        String password = (String) Data.get("password");
//        Map<String ,String> map = new HashMap<>();
//        if(token != null){
//            log.info("로그인상태입니당");
//            String memberNumStr = jwtController.tokenCheck(token);
//            Long memberNum = Long.parseLong(memberNumStr);
//            map = memberService.memberDelete(email, password);
//            if(map.get("memberDelete").equals("OK")){
//                Cookie cookie = new Cookie("token", null); // choiceCookieName(쿠키 이름)에 대한 값을 null로 지정
//                cookie.setMaxAge(0); // 유효시간을 0으로 설정
//                cookie.setHttpOnly(true);
//                cookie.setPath("/");
//                response.addCookie(cookie);
//            }
//        }else {
//            map.put("memberDelete", "loginError");
//        }
//        return ResponseEntity.ok().body(map);
//    }



}
