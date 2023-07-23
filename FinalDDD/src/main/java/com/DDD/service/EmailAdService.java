package com.DDD.service;


import com.DDD.dto.EmailAdDTO;
import com.DDD.entity.EmailAd;
import com.DDD.entity.Member;
import com.DDD.repository.EmailAdRepository;
import com.DDD.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class EmailAdService {
    private final EmailService emailService;
    private final MemberRepository memberRepository;
    private final EmailAdRepository emailAdRepository;


    public boolean sendEmailAds(List<String> emailAddresses, String title, String emailContents) {

        for (String email : emailAddresses) {
            Optional<Member> memberOptional = memberRepository.findByEmail(email);
            if (memberOptional.isPresent()) {
                Member member = memberOptional.get();
                String subject = title;
                String body = emailContents;
                emailService.sendMail(member.getEmail(), subject, body);

                EmailAd emailAd = new EmailAd();
                emailAd.setMember(member);
                emailAd.setTitle(title);
                emailAd.setEmailContents(emailContents);
                emailAd.setSentDate(LocalDateTime.now());
                emailAdRepository.save(emailAd);
            }
        }

        return true;
    }

    // 보낸 광고메일 보기
    public List<EmailAdDTO> getEmailAds() {
        List<EmailAdDTO> emailAdDTOS = new ArrayList<>();
        List<EmailAd> emailAds = emailAdRepository.findAll();
        Set<String> uniqueEmailNos = new HashSet<>();
        Set<String> uniqueTitles = new HashSet<>();

        for (EmailAd e : emailAds) {
            String emailNo = String.valueOf(e.getEmailNo());
            String title = e.getTitle();

            if (!uniqueEmailNos.contains(emailNo) && !uniqueTitles.contains(title)) {
                EmailAdDTO emailAdDTO = new EmailAdDTO();
                emailAdDTO.setSentEmailDate(e.getSentDate());
                emailAdDTO.setEmailNo(emailNo);
                emailAdDTO.setTitle(title);
                emailAdDTO.setEmailContents(e.getEmailContents());

                emailAdDTOS.add(emailAdDTO);
                uniqueEmailNos.add(emailNo);
                uniqueTitles.add(title);
            }
        }
        return emailAdDTOS;
    }




}
