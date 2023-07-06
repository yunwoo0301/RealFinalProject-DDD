package com.DDD.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @ToString
@Table(name="booking_ticket")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long bookingId; // 예매번호(PK)
    @ManyToOne
    @JoinColumn(name = "exhibit_no") // 전시번호(FK)
    private Exhibitions exhibitions;
    @ManyToOne
    @JoinColumn(name = "member_id") // 회원번호(FK)
    private Member member;
    @OneToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;  // 걸제정보
    @Column(name = "booking_date")
    private LocalDateTime bookingDate; // 예매일
    @Column(name = "visit_date")
    private LocalDate visitDate; // 전시관람일
    private String bookedName; // 예매자이름
    private String bookedEmail; // 예매자 이메일
    private String bookedTel; // 예매자전화번호
    private String getTicket; // 티켓수령방법

    public Member getMember() {
        return member;
    }

    public Exhibitions getExhibitions() {
        return exhibitions;
    }

    public Payment getPayment() {
        return payment;
    }


}