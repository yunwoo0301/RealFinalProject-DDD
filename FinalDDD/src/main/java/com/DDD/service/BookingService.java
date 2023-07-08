package com.DDD.service;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.DDD.dto.BookingDTO;
import com.DDD.dto.PaymentDTO;
import com.DDD.entity.Booking;
import com.DDD.entity.Exhibitions;
import com.DDD.entity.Member;
import com.DDD.entity.Payment;
import com.DDD.repository.BookingRepository;
import com.DDD.repository.ExhibitionsRepository;
import com.DDD.repository.MemberRepository;
import com.DDD.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final MemberRepository memberRepository;
    private final ExhibitionsRepository exhibitionsRepository;
    private final PaymentRepository paymentRepository;

    // 예매, 전시일표시
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    //  예매하기
    public Long bookTicket(String exhibitNo, String id, String visitDate, String bookedName, String bookedEmail, String bookedTel, String getTicket) {
        try {
            Booking booking = new Booking();

            booking.setBookingDate(LocalDateTime.now());
            DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;
            OffsetDateTime offsetDateTime = OffsetDateTime.parse(visitDate, formatter);
            LocalDateTime localDateTime = offsetDateTime.toLocalDateTime();
            LocalDate localDate = localDateTime.toLocalDate();
            booking.setVisitDate(localDate);



            // 회원번호로 회원찾기
            Optional<Member> member = memberRepository.findById(Long.parseLong(id));
            if (member.isEmpty()) {
                throw new IllegalArgumentException("없는 회원 ID 입니다!");
            }
            // 찾은 회원 예매에 입력
            booking.setMember(member.get());

            // 전시엔티티 불러와서 넣기
            Exhibitions exhibition = exhibitionsRepository.findByExhibitNo(Long.parseLong(exhibitNo));
            if (exhibition == null) {
                throw new IllegalArgumentException("Invalid exhibit number");
            }
            booking.setExhibitions(exhibition);

            booking.setBookedName(bookedName);
            booking.setBookedEmail(bookedEmail);
            booking.setBookedTel(bookedTel);
            booking.setGetTicket(getTicket);

            bookingRepository.save(booking);
            return booking.getBookingId();
        } catch (Exception e) {
            // 예외 처리 로직
            e.printStackTrace(); // 예외 정보 출력 또는 로깅
            return null;
        }
    }


    // 예매전체목록조회(회원아이디별)
    public List<BookingDTO> FindTicketList(String id) {
        List<BookingDTO> bookingDTOS = new ArrayList<>();
        List<Booking> bookings = bookingRepository.findByMemberId(Long.parseLong(id));

        for(Booking e : bookings) {
            BookingDTO bookingDTO = new BookingDTO();
            bookingDTO.setBookingId(e.getBookingId());
            bookingDTO.setMemberId(e.getMember().getId());
            bookingDTO.setImgUrl(e.getExhibitions().getImgUrl());
            bookingDTO.setExhibitName(e.getExhibitions().getExhibitName());
            bookingDTO.setStartDate(e.getExhibitions().getStartDate());
            bookingDTO.setEndDate(e.getExhibitions().getEndDate());
            bookingDTO.setExhibitNo(String.valueOf(e.getExhibitions().getExhibitNo()));
            bookingDTO.setBookedName(e.getBookedName());
            bookingDTO.setBookedEmail(e.getBookedEmail());
            bookingDTO.setBookedTel(e.getBookedTel());
            bookingDTO.setBookingDate(e.getBookingDate()); // 예매일
            bookingDTO.setExhibitLocation(e.getExhibitions().getExhibitLocation()); // 전시회장소
            bookingDTO.setVisitDate(e.getVisitDate()); // 관람일
            bookingDTO.setGetTicket(e.getGetTicket()); // 수령방법

            // 결제정보설정
            Payment payment = paymentRepository.findByBookingBookingId(e.getBookingId());
            if(payment != null) {
                PaymentDTO paymentDTO = new PaymentDTO();
                paymentDTO.setPaymentDate(payment.getPaymentDate()); // 결제일
                paymentDTO.setPaymentCnt(payment.getPaymentCnt()); // 관람인원(티켓예매수)
                paymentDTO.setPaymentType(payment.getPaymentType()); // 결제수단
                paymentDTO.setPaidPrice(String.valueOf(payment.getPaidPrice())); // 총금액

                bookingDTO.setPaymentDTO(paymentDTO);
            }

            bookingDTOS.add(bookingDTO);
        }
        return bookingDTOS;
    }

    //예매취소
    public boolean cancelBooking(String bookingId) {
        try {
            Booking booking = bookingRepository.findByBookingId(Long.valueOf(bookingId));

            // 예매와 관련된 결제 정보 조회
            Payment payment = paymentRepository.findByBookingBookingId(booking.getBookingId());
            if (payment != null) {
                paymentRepository.delete(payment); // 결제 정보 삭제
            }

            bookingRepository.delete(booking); // 예매 정보 삭제

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
