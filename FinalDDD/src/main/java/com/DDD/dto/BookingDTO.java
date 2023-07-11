package com.DDD.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @Setter @ToString
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private Long bookingId; // 예매번호(PK)
    private LocalDateTime bookingDate; // 예매일
    private LocalDate visitDate; // 방문일
    private Long memberId; // 회원아이디번호
    private String memberName; // 회원이름
    private String bookedEmail; // 예매자이메일
    private String bookedName; // 예매자이름
    private String bookedTel; // 예매자연락처
    private String exhibitNo; // 전시아이디
    private String exhibitName; //전시이름
    private String imgUrl; // 전시회사진
    private String startDate; //전시회시작일
    private String endDate; // 전시회마감일
    private String exhibitLocation; // 전시회장소
    private String getTicket; // 수령방법
    private Long paymentId; // 결제아이디
    private PaymentDTO paymentDTO; // 결제정

}
