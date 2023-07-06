package com.DDD.controller;
import com.DDD.dto.FreeBoardDto;
import com.DDD.entity.FreeBoard;
import com.DDD.service.FreeBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/boardList") // CRUD 작업이 필요할 시 GetMapping 보다는 requestMapping 으로
//@CrossOrigin(origins = "http://localhost:3000")
public class FreeBoardController {
    @Autowired
    private final FreeBoardService freeBoardService;

    // 게시글 작성
    @PostMapping("/write")
    public ResponseEntity<Boolean> boardWrite(@RequestBody FreeBoardDto freeBoardDto, Principal principal) {
        String category = freeBoardDto.getCategory();
        String region = freeBoardDto.getRegion();
        String title = freeBoardDto.getTitle();
        String image = freeBoardDto.getImage();
        String contents = freeBoardDto.getContents();

        Long id = freeBoardDto.getId(); // FreeBoardDto 에서 작성자 정보 가져오기

        boolean result = freeBoardService.createBoards(id, category, region, title, image, contents);
        if (result) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    // 게시글 상세 조회
    @GetMapping("/boardView/{boardNo}")
    public ResponseEntity<FreeBoardDto> getBoard(@PathVariable("boardNo") Long boardNo) {
        return new ResponseEntity(freeBoardService.selectBoardOne(boardNo), HttpStatus.OK);
    }


    // 게시글 수정(최종)
    @PutMapping("/boardView/{boardNo}")
    public ResponseEntity<Boolean> editBoards(@PathVariable Long boardNo, @RequestBody FreeBoardDto freeBoardDto) {
        try {
            boolean result = freeBoardService.updateBoards(boardNo, freeBoardDto);

            if (result) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
            }
        } catch (EntityNotFoundException e) { // 게시물 존재 여부에 따른 예외처리
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
    }


    // 게시글 삭제(최종)
    @DeleteMapping("/boardView/{boardNo}")
    public ResponseEntity<Boolean> delBoards(@PathVariable Long boardNo) {
        boolean result = freeBoardService.deleteBoards(boardNo);

        if (result) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }


    // 카테고리별 자유게시판 목록 조회
    @GetMapping("/{category}")
    public ResponseEntity<List<FreeBoardDto>> getFreeBoardsByCategory(@PathVariable("category") String category) {
        log.info("Received request to get free boards by category: {}", category);
        List<FreeBoardDto> freeBoardList = freeBoardService.getFreeBoardsByCategory(category);
        if (!freeBoardList.isEmpty()) {
            return new ResponseEntity<>(freeBoardList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // 자유게시판 검색 키워드에 해당하는 리스트 불러오기
    @GetMapping("/searchList")
    public ResponseEntity<List<FreeBoardDto>> searchListLoad(@RequestParam String keyword) {
        List<FreeBoardDto> freeBoardList = freeBoardService.searchDataLoad("%%" + keyword + "%%");
        if (!freeBoardList.isEmpty()) {
            return new ResponseEntity<>(freeBoardList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // 특정 회원이 작성한 게시글 조회(마이페이지 내 게시글)
    @GetMapping("/members/{memberId}/boards")
    public ResponseEntity<List<FreeBoardDto>> getBoardsByMember(@PathVariable("memberId") Long id) {
        List<FreeBoardDto> freeBoardDtos = freeBoardService.getBoardsByMember(id);
        return ResponseEntity.ok(freeBoardDtos);
    }
}

