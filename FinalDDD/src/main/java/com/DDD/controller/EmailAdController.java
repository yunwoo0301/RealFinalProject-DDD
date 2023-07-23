package com.DDD.controller;


import com.DDD.dto.EmailAdDTO;
import com.DDD.entity.EmailAd;
import com.DDD.entity.Member;
import com.DDD.service.EmailAdService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/emailAd")
@RequiredArgsConstructor
public class EmailAdController {
    @Autowired
    private final EmailAdService emailAdService;

    // 이메일보내기
    @PostMapping("/send")
    public ResponseEntity<String> sendEmailAds(@RequestBody EmailAd emailAd) {
        Member member = emailAd.getMember();
        if (member == null || member.getEmail() == null || member.getEmail().isEmpty()) {
            return ResponseEntity.badRequest().body("유효하지 않은 이메일 주소입니다.😢");
        }

        String email = member.getEmail();
        String title = emailAd.getTitle();
        String emailContents = emailAd.getEmailContents();

        List<String> emailAddresses = Collections.singletonList(email);
        boolean result = emailAdService.sendEmailAds(emailAddresses, title, emailContents);

        if (result) {
            return ResponseEntity.ok("광고메일이 모두 보내졌습니다!😍");
        } else {
            return ResponseEntity.badRequest().body("광고메일 보내기가 실패했습니다.😭");
        }
    }

    @GetMapping("/all")
    public List<EmailAdDTO> allEmailAdds() {
        return emailAdService.getEmailAds();
    }

}
