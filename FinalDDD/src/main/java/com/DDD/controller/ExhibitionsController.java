package com.DDD.controller;

import com.DDD.dto.ExhibitionDetailDTO;
import com.DDD.dto.ExhibitionsDTO;
import com.DDD.service.ExhibitionApiService;
import com.DDD.service.ExhibitionDetailApiService;
import com.DDD.service.ExhibitionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Transactional
@Slf4j
@RequestMapping(value = "/exhibitions")
//@CrossOrigin("http://localhost:3000")
public class ExhibitionsController {
    private final ExhibitionApiService exhibitionApiService;
    private final ExhibitionDetailApiService exhibitionDetailApiService;
    private final ExhibitionService exhibitionService;


    // 전시목록 API DB저장
    @GetMapping("/list")
    public ResponseEntity<Boolean> getExhibitApiList() {
        boolean result = false;
        String exhibitList = exhibitionApiService.exhibitionListApi();
        result = exhibitionApiService.listFromJsonObj(exhibitList);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 해당 전시 상세정보 API 불러오기
    @GetMapping("{seq}")
    public List<ExhibitionDetailDTO> getExhibitDetailApi(@PathVariable Integer seq) {
        String result = exhibitionDetailApiService.ExhibitionDetailApi(seq);
        return exhibitionDetailApiService.detailFromJsonObj(result);
    }

    // API에서 불러온 전시정보 DB저장 후 DB에서 불러오기
    @GetMapping("/dbList")
    public ResponseEntity<List<ExhibitionsDTO>> getExhibitionDBList() {
        List<ExhibitionsDTO> list = exhibitionService.getExhibitionDBList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

}
