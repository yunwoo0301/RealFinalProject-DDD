package com.DDD.dto;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;

import java.math.BigDecimal;

@Getter @Setter @ToString
@RequiredArgsConstructor
@Slf4j
public class ExhibitionDetailDTO {
    private Long exhibitNo; // 전시번호(PK)
    private String exhibitName; // 전시이름
    private String region; // 전시장 지역
    private int startDate; // 전시 시작일
    private int endDate; // 전시 마감일
    private String exhibitExplain; // 전시회설명1
    private String exhibitExplain2; // 전시회설명2
    private Object exhibitPrice; // 전시회가격
    private String imgUrl; // 전시회 포스터
    private String exhibitLocation; // 전시장
    private String phoneNo; // 전시회 전화번호
    private String placeUrl; // 해당 전시회 사이트주소
    private String exhibitAddr; // 전시회 주소
    private int locationNo; // 전시회 고유번호
    private BigDecimal locationX; // 전시회장 주소 x좌표
    private BigDecimal locationY; // 전시회장 주소 y좌표


    // API DTO 저장
    public ExhibitionDetailDTO (JSONObject item) {
        this.exhibitNo = item.getLong("seq");
        this.exhibitName = item.getString("title");
        this.region = item.getString("area");
        this.startDate = item.getInt("startDate");
        this.endDate = item.getInt("endDate");
        this.exhibitExplain = item.getString("contents1");
        this.exhibitExplain2 = item.getString("contents2");
        // 가격이 어떤건 int만 들어가있는 경우가 있어서 경우의 수 처리
        if (item.get("price") instanceof Integer) {
            this.exhibitPrice = item.getInt("price");
        } else {
            this.exhibitPrice = item.getString("price");
        }

        this.imgUrl = item.getString("imgUrl");
        this.exhibitLocation = item.getString("place");
        this.phoneNo = item.getString("phone");
        this.placeUrl = item.getString("placeUrl");
        this.exhibitAddr = item.getString("placeAddr");
        this.locationNo = item.getInt("placeSeq");
        this.locationX = item.getBigDecimal("gpsX");
        this.locationY = item.getBigDecimal("gpsY");

    }
}
