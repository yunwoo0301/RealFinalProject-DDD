package com.DDD.service;


import com.DDD.entity.EmailAd;
import com.DDD.entity.Member;
import com.DDD.repository.EmailAdRepository;
import com.DDD.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

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

                // Save the EmailAd entity to the database after sending the email
                EmailAd emailAd = new EmailAd();
                emailAd.setMember(member);
                emailAd.setTitle(title);
                emailAd.setEmailContents(emailContents);
                emailAd.setSentDate(LocalDateTime.now()); // Set the sentDate to the current date/time
                emailAdRepository.save(emailAd);
            }
        }

        return true;
    }


}
