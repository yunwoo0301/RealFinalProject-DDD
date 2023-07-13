package com.DDD.controller;

import com.DDD.dto.DiaryDto;
import com.DDD.dto.MemberDto;
import com.DDD.entity.Diary;
import com.DDD.service.DiaryService;
import com.DDD.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage/{memberId}/diary")
//@CrossOrigin(origins = "http://localhost:3000")
public class DiaryController {
    private final MemberService memberService;
    private final DiaryService diaryService;

    @GetMapping
    public ResponseEntity<List<DiaryDto>> getDiaryByMemberId(@PathVariable Long memberId) {
        List<DiaryDto> diaryItems = diaryService.getDiaryByMemberId(memberId);
        return new ResponseEntity<>(diaryItems, HttpStatus.OK);
    }

    @PostMapping("/{exhibitNo}")
    public ResponseEntity<Diary> updateDiary(@PathVariable Long memberId,
                                               @PathVariable Long exhibitNo,
                                               @RequestBody Map<String, String> updateData){
//            if (updateData == null || updateData.get("rateStar") == null || updateData.get("comment") == null) {
//                return ResponseEntity.badRequest().build();
//            }
        double rateStar = Double.parseDouble(updateData.get("rateStar"));
        String comment = updateData.get("comment");
        Diary updatedDiary = diaryService.updateDiary(memberId, exhibitNo, rateStar, comment);
        if (updatedDiary != null) {
            return ResponseEntity.ok(updatedDiary);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/{exhibitNo}/star")
    public ResponseEntity<Boolean> changeStar(@RequestBody Map<String, String> infoData) {
        Long memberId = Long.valueOf(infoData.get("memberId"));
        Long exhibitNo = Long.valueOf(infoData.get("exhibitionNo"));
        double rateStar = Double.parseDouble(infoData.get("rateStar"));
        return ResponseEntity.ok(diaryService.changeStar(memberId, exhibitNo, rateStar));
    }

    @PostMapping("/{exhibitNo}/comment")
    public ResponseEntity<Boolean> changeComment(@RequestBody Map<String, String> infoData) {
        Long memberId = Long.valueOf(infoData.get("memberId"));
        Long exhibitNo = Long.valueOf(infoData.get("exhibitionNo"));
        String comment = infoData.get("comment");
        return ResponseEntity.ok(diaryService.changeComment(memberId, exhibitNo, comment));
    }
    @PostMapping("/{exhibitNo}/delete")
    public ResponseEntity<Boolean> deleteDiary(@RequestBody Map<String, String> infoData) {
        Long memberId = Long.valueOf(infoData.get("memberId"));
        Long exhibitNo = Long.valueOf(infoData.get("exhibitionNo"));
        return ResponseEntity.ok(diaryService.deleteDiary(memberId, exhibitNo));
    }






}
