package com.DDD.service;

import com.DDD.entity.Member;
import com.DDD.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Slf4j
@Service
public class EmailService {
    private Logger logger = LoggerFactory.getLogger(EmailService.class);
    @Autowired
    private MemberRepository memberRepository;

    private JavaMailSender mailSender;
    private static final String FROM_ADDRESS = "ddd_exhibition@naver.com";

    @Autowired
    public EmailService(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    public void sendMail(String to, String subject, String body){
        MimeMessagePreparator preparator = mimeMessage -> {
            mimeMessage.setFrom(FROM_ADDRESS);
            log.info("email service의 From-Addr : " + FROM_ADDRESS );
            mimeMessage.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
            log.info("email service의 receiver : " + to );
            mimeMessage.setSubject(subject);
            log.info("email service의 Subject : " + subject );
            mimeMessage.setText(body, "utf-8", "html");
            log.info("email service의 body : " + body );
        };
        try {
            logger.info("Attempting to send an email to: " + to);
            mailSender.send(preparator);
            logger.info("Email successfully sent to: " + to);
        } catch (MailException ex) {
            logger.error("Email sending failed: " + ex.getMessage(), ex);
        }
    }
}