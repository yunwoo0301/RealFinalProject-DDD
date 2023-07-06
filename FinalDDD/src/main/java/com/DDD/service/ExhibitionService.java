package com.DDD.service;

import com.DDD.dto.ExhibitionsDTO;
import com.DDD.entity.Exhibitions;
import com.DDD.repository.ExhibitionsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ExhibitionService {
    private final ExhibitionsRepository exhibitionsRepository;

    // 전체 전시 DB에서 불러오기
    public List<ExhibitionsDTO> getExhibitionDBList() {
        List<ExhibitionsDTO> exhibitionsDTOS = new ArrayList<>();
        List<Exhibitions> exhibitionsList = exhibitionsRepository.findAll();
        for(Exhibitions e : exhibitionsList) {
            ExhibitionsDTO exhibitionsDTO = new ExhibitionsDTO();
            exhibitionsDTO.setExhibitNo(e.getExhibitNo()); // 전시 고유 번호
            exhibitionsDTO.setExhibitName(e.getExhibitName()); // 전시이름
            exhibitionsDTO.setStartDate(e.getStartDate()); // 전시시작일
            exhibitionsDTO.setEndDate(e.getEndDate());  // 전시 마감일
            exhibitionsDTO.setExhibitLocation(e.getExhibitLocation()); // 전시장
            exhibitionsDTO.setImgUrl(e.getImgUrl()); // 전시 포스터
            exhibitionsDTO.setRegion(e.getRegion()); // 전시지역
            exhibitionsDTOS.add(exhibitionsDTO);
        }
        return exhibitionsDTOS;
    }
}
