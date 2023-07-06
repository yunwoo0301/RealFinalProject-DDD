package com.DDD.service;

import com.DDD.dto.DiaryDto;
import com.DDD.dto.FreeBoardDto;
import com.DDD.dto.MemberDto;
import com.DDD.entity.Diary;
import com.DDD.entity.Exhibitions;
import com.DDD.entity.FreeBoard;
import com.DDD.entity.Member;
import com.DDD.repository.DiaryRepository;
import com.DDD.repository.ExhibitionsRepository;
import com.DDD.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class DiaryService {
    private final MemberRepository memberRepository;
    private final DiaryRepository diaryRepository;
    private final ExhibitionsRepository exhibitionsRepository;

    // memberId 다이어리 내용 조회
    public List<DiaryDto> getDiaryByMemberId(Long id) { // 프론트엔드에서 member_id를 입력 받음
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid member Id:" + id));
        List<Diary> DiaryList = diaryRepository.findByMemberId(id); // 레파지토리에서 memberId로 조회
        List<DiaryDto> diaryItems = new ArrayList<>(); // 다이어리 data를 저장할 새로운 다이어리를 array list를 생성
        for (Diary item : DiaryList) { // for문을 통해 조회된 내용을 저장
            DiaryDto diaryDto = new DiaryDto();
            diaryDto.setDiaryId(item.getDiaryId());
            diaryDto.setExhibitions(item.getExhibitions());
            diaryDto.setRegDate(item.getRegDate());
            diaryDto.setRateStar(item.getRateStar());
            diaryDto.setComment(item.getComment());
            diaryDto.setMemberId(member.getId());  // getMember().getId() to get memberId

            diaryItems.add(diaryDto); // Add diaryDto to diaryItems
        }
        return diaryItems;

    }

    // Diary 추가 및 업데이트
    public Diary updateDiary(Long memberId, Long exhibitNo, double rateStar, String comment) { // 프론트엔드에서 member_id를 입력 받음
        Member member = memberRepository.findById(memberId) //입력받은 id값으로 memberId의 데이터를 불러옴
                .orElseThrow(() -> new IllegalArgumentException("Invalid member Id:" + memberId)); // 없을 경우 예외처리

        log.error("member 찾음 : " + memberId);

        Exhibitions exhibitions = exhibitionsRepository.findByExhibitNo(exhibitNo); // 입력받은 exhibitNo 값으로 exhibitions을 찾음
        if (exhibitions == null) { // null일 경우 전시회가 없는것으로 예외처리
            throw new IllegalArgumentException("Invalid exhibition number:" + exhibitNo);
        }
        log.error("exhibitions 찾음 : " + exhibitNo);

        // 여기에서 memberId와 exhibitNo를 동시에 만족하는 다이어리를 찾아본다.
        Diary diary = diaryRepository.findByMemberAndExhibitions(member, exhibitions);

        if (diary != null) {
            diary.update(rateStar, comment); // star 와 comment를 업데이트함.
            log.error("업데이트 : " + rateStar + comment);

        } else {
            diary = new Diary(); // 새로운 Diary를 만듬.

            diary.setMember(member); // 찾은 회원의 id를 diary에 저장

            diary.setExhibitions(exhibitions); // 전시엔티티 불러와서 넣기

            diary.setRateStar(rateStar);// 별점 저장

            diary.setComment(comment);// 코멘트 저장
            log.error("저장 : " + rateStar + comment);
        }

        try {
            return diaryRepository.save(diary);
        } catch (Exception e) {
            throw new RuntimeException("Could not save diary", e);
        }
    }

    public boolean changeStar(Long memberId, Long exhibitNo, double rateStar) {
        Member member = memberRepository.findById(memberId) //입력받은 id값으로 memberId의 데이터를 불러옴
                .orElseThrow(() -> new IllegalArgumentException("Invalid member Id:" + memberId)); // 없을 경우 예외처리

        log.info("member 찾음 : " + memberId);

        Exhibitions exhibitions = exhibitionsRepository.findByExhibitNo(exhibitNo); // 입력받은 exhibitNo 값으로 exhibitions을 찾음
        if (exhibitions == null) { // null일 경우 전시회가 없는것으로 예외처리
            throw new IllegalArgumentException("Invalid exhibition number:" + exhibitNo);
        }
        log.info("exhibitions 찾음 : " + exhibitNo);

        // 여기에서 memberId와 exhibitNo를 동시에 만족하는 다이어리를 찾아본다.
        Diary diary = diaryRepository.findByMemberAndExhibitions(member, exhibitions);

        if(diary == null) { // if the diary does not exist, return false
            log.error("No diary found for member: " + memberId + " and exhibition: " + exhibitNo);
            return false;
        }

        diary.updateStar(rateStar); // star를 업데이트함.

        return true;
    }

    public boolean changeComment(Long memberId, Long exhibitNo, String comment) {
        Member member = memberRepository.findById(memberId) //입력받은 id값으로 memberId의 데이터를 불러옴
                .orElseThrow(() -> new IllegalArgumentException("Invalid member Id:" + memberId)); // 없을 경우 예외처리

        log.info("member 찾음 : " + memberId);

        Exhibitions exhibitions = exhibitionsRepository.findByExhibitNo(exhibitNo); // 입력받은 exhibitNo 값으로 exhibitions을 찾음
        if (exhibitions == null) { // null일 경우 전시회가 없는것으로 예외처리
            throw new IllegalArgumentException("Invalid exhibition number:" + exhibitNo);
        }
        log.info("exhibitions 찾음 : " + exhibitNo);

        // 여기에서 memberId와 exhibitNo를 동시에 만족하는 다이어리를 찾아본다.
        Diary diary = diaryRepository.findByMemberAndExhibitions(member, exhibitions);

        if(diary == null) { // if the diary does not exist, return false
            log.error("No diary found for member: " + memberId + " and exhibition: " + exhibitNo);
            return false;
        }

        diary.updateComment(comment); // comment 업데이트함.

        return true;
    }




}