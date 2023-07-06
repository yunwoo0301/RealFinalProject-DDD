package com.DDD.dto;

import com.DDD.entity.Booking;
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
    private String bookedEmail; // 예매자이메일
    private String bookedName; // 예매자이름
    private String bookedTel; // 예매자연락처
    private Long exhibitNo; // 전시아이디
    private String getTicket; // 수령방법
    private Long paymentId; // 결제아이디

}
