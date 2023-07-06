package com.DDD.service;


import com.DDD.entity.Exhibitions;
import com.DDD.repository.ExhibitionsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;

import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class ExhibitionApiService {
    @Value("${api.serviceKey}")
    private String apiKey;

    private final ExhibitionsRepository exhibitionsRepository;

    public String exhibitionListApi() {
        try {
            // API 요청 URL 생성
            LocalDate startDate = LocalDate.now();
            LocalDate endDate = startDate.plusYears(1);
            int startDateValue = Integer.parseInt(startDate.format(DateTimeFormatter.ofPattern("yyyyMMdd")));
            int endDateValue = Integer.parseInt(endDate.format(DateTimeFormatter.ofPattern("yyyyMMdd")));
            String urlString = "http://www.culture.go.kr/openapi/rest/publicperformancedisplays/realm";
            urlString += "?serviceKey=" + URLEncoder.encode(apiKey, "UTF-8");
            urlString += "&sortStdr=1";
            urlString += "&realmCode=D000";
            urlString += "&cPage=1";
            urlString += "&rows=100";
            urlString += "&form=" + startDateValue;
            urlString += "&to=" + endDateValue;

            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // GET 방식으로 요청 설정
            connection.setRequestMethod("GET");

            // 응답 코드 확인
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                // 응답 데이터 읽기(한글 깨짐때문에 bufferedReader사용)
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder responseBuilder = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    responseBuilder.append(line);
                }
                reader.close();

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

    public boolean listFromJsonObj(String result) {
        // xml 데이터를 json 데이터로 변환
        JSONObject xmlToJson = XML.toJSONObject(result);

        // response 객체 가져오기
        JSONObject responseObj = xmlToJson.getJSONObject("response");

        // msgBody 객체 가져오기
        JSONObject msgBodyObj = responseObj.getJSONObject("msgBody");

        // perforList 배열 가져오기
        JSONArray perforListArr = msgBodyObj.getJSONArray("perforList");

        // DB에 저장
        for (int i = 0; i < perforListArr.length(); i++) {
            JSONObject item = perforListArr.getJSONObject(i);

            // HTML 엔티티 코드 변환
            String title = item.getString("title");
            String convertedTitle = convertHtmlEntities(title);
            item.put("title", convertedTitle);

            // 데이터 가공 및 엔티티 생성
            String startDateString = String.valueOf(item.getInt("startDate"));
            String endDateString = String.valueOf(item.getInt("endDate"));

            DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
            DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            LocalDate parsedStartDate = LocalDate.parse(startDateString, inputFormatter);
            LocalDate parsedEndDate = LocalDate.parse(endDateString, inputFormatter);

            Exhibitions exhibitions = new Exhibitions(item);
            exhibitions.setStartDate(parsedStartDate.format(outputFormatter));
            exhibitions.setEndDate(parsedEndDate.format(outputFormatter));
            exhibitionsRepository.save(exhibitions);
        }
        System.out.println("DB 저장 완료 :)!!");
        return true;
    }
    // HTML ENTITY코드로 변환하기위해 추가
    private String convertHtmlEntities(String text) {
        text = text.replace("&amp;", "&")
                .replace("&lt;", "<")
                .replace("&gt;", ">")
                .replace("&quot;", "\"")
                .replace("&#39;", "'");
        return text;
    }
}
