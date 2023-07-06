package com.DDD.dto;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter @Setter @ToString
@RequiredArgsConstructor
public class PaymentDTO {
    private Long paymentId;
    private Long bookingId;
    private String memberId; // 멤버아이
    private String paymentType; // 무통장/카카오페이
    private String paidPrice; // 지불한 총금액
    private String paymentStatus; // 결제상태
    private LocalDateTime paymentDate; // 결제일시
    private int paymentCnt; // 판매수량

}
