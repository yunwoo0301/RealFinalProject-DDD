package com.DDD.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.json.JSONObject;

@Getter @Setter
@RequiredArgsConstructor
public class ExhibitionsDTO {
    private Long exhibitNo;
    private String exhibitName;
    private String startDate;
    private String endDate;
    private String exhibitLocation;
    private String imgUrl;
    private String region;

    public ExhibitionsDTO(JSONObject item) {
        this.exhibitNo = item.getLong("seq");
        this.exhibitName = item.getString("title");
        this.startDate = Integer.toString(item.getInt("startDate")); // int를 String으로 변환
        this.endDate = Integer.toString(item.getInt("endDate"));
        this.exhibitLocation = item.getString("place");
        this.imgUrl = item.getString("thumbnail");
        this.region = item.getString("area");
    }
}
