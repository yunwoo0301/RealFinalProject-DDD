package com.DDD.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.json.JSONObject;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name="exhibitions")
@Getter @Setter @ToString
@RequiredArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Exhibitions {
    @Id
    @Column(name="exhibit_no", nullable = false)
    private Long exhibitNo; // PK; 전시회 번호

    @Column(name="exhibit_name")
    private String exhibitName; // 전시명

    @Column(name="start_date")
    private String startDate; // 전시시작일

    @Column(name="end_date")
    private String endDate; // 전시마감일

    @Column(name="location")
    private String exhibitLocation; // 전시장소

    @Column(name="imgUrl")
    private String imgUrl; // 전시 포스터

    @Column(name="region")
    private String region; // 전시지역

    // API 호출 후 DB 저장
    public Exhibitions (JSONObject item) {
        this.exhibitNo = item.getLong("seq");
        this.exhibitName = item.getString("title");
        this.startDate = Integer.toString(item.getInt("startDate")); // int를 String으로 변환
        this.endDate = Integer.toString(item.getInt("endDate"));
        this.exhibitLocation = item.getString("place");
        this.imgUrl = item.getString("thumbnail");
        this.region = item.getString("area");

    }









}
