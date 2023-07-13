package com.DDD.service;

import com.DDD.dto.MemberDto;
import com.DDD.entity.Member;
import com.DDD.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    // isActive 가져오기
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


    // 이메일 중복 체크
    public boolean emailDupCk(String email) {
        return memberRepository.findByEmail(email).isEmpty();
    }

    // 닉네임 중복 체크
    public boolean nicknameDupCk(String nickname) {
        return memberRepository.findByNickname(nickname).isEmpty();
    }

    // 회원 정보 조회
    public MemberDto getMemberInfo(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        MemberDto memberDto = new MemberDto();

        memberDto.setId(Long.valueOf(member.getId()));
        memberDto.setEmail(member.getEmail());
        memberDto.setName(member.getName());
        memberDto.setTel(member.getTel());
        memberDto.setNickname(member.getNickname());
        memberDto.setInstagram(member.getInstagram());
        memberDto.setBackgroundImg(member.getBackgroundImg());
        memberDto.setProfileImg(member.getProfileImg());
        memberDto.setIntroduce(member.getIntroduce());
        memberDto.setActive(member.isActive());

        return memberDto;
    }

    // 비밀번호 찾기
    public boolean forgotEmail(String Email) {
        Optional<Member> memberOptional = memberRepository.findByEmail(Email);

        // If no member is present, throw an exception
        if (!memberOptional.isPresent()) {
            throw new UsernameNotFoundException("No user found with email: " + Email);
        }

        // If a member is present, return its isActive status
        Member member = memberOptional.get();

        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();

        String generatedString = random.ints(leftLimit,rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();


        member.setPassword(passwordEncoder.encode(generatedString));
        memberRepository.save(member);

        // Compose email content
        String subject = "[:DDD] Change your password !🔑 ";
        String body = "Your new password : " + generatedString  + " Please sign-in and change your new password";

        // Send email
        emailService.sendMail(member.getEmail(), subject, body);

        return true;
    }



    // 닉네임 변경
    public boolean newNickname(Long id, String nickname) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.setNickname(nickname);
                    Member savedMember = memberRepository.save(member);
                    log.info(savedMember.toString());
                    return true;
                })
                .orElse(false);
    }

    // 이름 변경
    public boolean newName(Long id, String name) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.setName(name);
                    Member savedMember = memberRepository.save(member);
                    log.info(savedMember.toString());
                    return true;
                })
                .orElse(false);
    }

    // 연락처 변경
    public boolean newTel(Long id, String tel) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.setTel(tel);
                    Member savedMember = memberRepository.save(member);
                    log.info(savedMember.toString());
                    return true;
                })
                .orElse(false);
    }
    // 인스타그램 변경
    public boolean newInstagram(Long id, String instagram) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.setInstagram(instagram);
                    Member savedMember = memberRepository.save(member);
                    log.info(savedMember.toString());
                    return true;
                })
                .orElse(false);
    }
    // 소개글 변경
    public boolean newIntroduce(Long id, String introduce) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.setIntroduce(introduce);
                    Member savedMember = memberRepository.save(member);
                    log.info(savedMember.toString());
                    return true;
                })
                .orElse(false);
    }

    public boolean newProfileImg(Long id, String profileImg) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.setProfileImg(profileImg);
                    Member savedMember = memberRepository.save(member);
                    log.info(savedMember.toString());
                    return true;
                })
                .orElse(false);
    }

    public boolean newBackgroundImg(Long id, String backgroundImg) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.setBackgroundImg(backgroundImg);
                    Member savedMember = memberRepository.save(member);
                    log.info(savedMember.toString());
                    return true;
                })
                .orElse(false);
    }

    // 회원 탈퇴
    public Map<String, String> memberDelete(String email, String password){
        Map<String ,String> map = new HashMap<>();
        Optional<Member> member= memberRepository.findByEmail(email);
        if (member.isEmpty()) {
            map.put("memberDelete", "Nothing to delete.");
            return map;
        }
        if(passwordEncoder.matches(password, member.get().getPassword())){
            member.get().setActive(false);
            member.get().setDeleteDate(LocalDateTime.now());
            Member savedMember = memberRepository.save(member.get());
            log.info(savedMember.toString());
            map.put("memberDelete", "Deleted successfully");
            return map;
        }
        map.put("memberDelete", "Delete is Failed");
        return map;
    }

    //  회원전체조회(관리자)
    public List<MemberDto> findAllMembers() {
        List<MemberDto> memberDtos = new ArrayList<>();
        List<Member> members = memberRepository.findAll();

        for (Member e : members) {
            MemberDto memberDto = new MemberDto();
            memberDto.setId(e.getId());
            memberDto.setEmail(e.getEmail());
            memberDto.setName(e.getName());
            memberDto.setTel(e.getTel());
            memberDto.setRegDate(String.valueOf(e.getRegDate()));
            memberDto.setDeleteDate(String.valueOf(e.getDeleteDate()));

            memberDtos.add(memberDto);
        }
        return memberDtos;
    }

    // 이메일 변경(관리자)
    public boolean newEmail(Long id, String email) {
        return memberRepository.findById(id)
                .map(member -> {
                    member.setEmail(email);
                    Member savedMember = memberRepository.save(member);
                    log.info(savedMember.toString());
                    return true;
                })
                .orElse(false);
    }




}