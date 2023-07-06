package com.DDD.controller;


import com.DDD.dto.ExhibitCommentDTO;
import com.DDD.service.ExhibitCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping(value = "/exhibitComment")
//@CrossOrigin("http://localhost:3000")
public class ExhibitCommentController {
    private final ExhibitCommentService exhibitCommentService;

    // 한줄평작성
    @PostMapping("/write")
    public ResponseEntity<String> writeComment(@RequestParam String id,
                                               @RequestParam String exhibitNo,
                                               @RequestParam String starRates,
                                               @RequestParam String comment) {
        boolean success = exhibitCommentService.writeComment(id, exhibitNo, starRates, comment);
        if (success) {
            return ResponseEntity.ok("한줄평 저장성공!🥰");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("한줄평 저장 실패!🤬");
        }
    }

    // 한출평 목록
    @GetMapping("/list")
    public ResponseEntity<List<ExhibitCommentDTO>> getCommentList(@RequestParam("exhibitNo") String exhibitNo) {
        List<ExhibitCommentDTO> list = exhibitCommentService.getComments(exhibitNo);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
