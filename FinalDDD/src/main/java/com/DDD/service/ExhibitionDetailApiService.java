package com.DDD.service;


import com.DDD.dto.ExhibitionDetailDTO;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;


@Service
@Component
@Slf4j
public class ExhibitionDetailApiService {

    @Value("${api.serviceKey}")
    private String apiKey;

    public String ExhibitionDetailApi(@RequestParam Integer seq) {
        try {
            // API 요청 URL 생성
            String urlString = "http://www.culture.go.kr/openapi/rest/publicperformancedisplays/d/";
            urlString += "?serviceKey=" + URLEncoder.encode(apiKey, "UTF-8");
            urlString += "&seq=" + seq;

            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // GET 방식으로 요청 설정
            connection.setRequestMethod("GET");

            // 응답 코드 확인
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                // 응답 데이터 읽기(한글깨짐때문에 bufferedReader사용)
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder responseBuilder = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    responseBuilder.append(line);
                }
                reader.close();
               // System.out.println("상세정보주소 : " + urlString);
                // 응답 데이터 반환
                return responseBuilder.toString();
            } else {
                log.error("API 요청에 실패했습니다. 응답 코드: {}", responseCode);
            }
        } catch (Exception e) {
            log.error("API 요청 중 오류가 발생했습니다.", e);
        }

        return null;
    }

    public List<ExhibitionDetailDTO> detailFromJsonObj(String result) {
        List<ExhibitionDetailDTO> list = new ArrayList<>();

        try {
            // xml 데이터를 json 데이터로 변환
            JSONObject xmlToJson = XML.toJSONObject(result);

            // response 객체 가져오기
            JSONObject responseObj = xmlToJson.getJSONObject("response");

            // msgBody 객체 가져오기
            JSONObject msgBodyObj = responseObj.getJSONObject("msgBody");

            // perforList 배열 가져오기
            JSONObject item = msgBodyObj.getJSONObject("perforInfo");

            // DTO저장
            ExhibitionDetailDTO exhibitionDetailDTO = new ExhibitionDetailDTO(item);
            list.add(exhibitionDetailDTO);
            System.out.println("상세정보 불러오기 성공!! :)😍😍😍");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;

    }
}
