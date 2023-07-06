package com.DDD.entity;


import com.DDD.constant.PaymentStatus;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="payment")
@Getter @Setter @ToString
@RequiredArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long paymentId; // 결제번호(pk)
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
    private String paymentType; //결제수단 (무통장입금/카카오페이)
    private int paidPrice; // 결제금액
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus; // 결제상태
    private LocalDateTime paymentDate; // 결제일시
    private LocalDateTime refundDate; // 환불일시
    private int paymentCnt; // 구매 수량
    @OneToOne
    @JoinColumn(name = "booking_id")
    private  Booking booking;





}
