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


    // 예매조회(결제정보조인)
    public List<BookingDTO> FindTicket(String id) {
        List<BookingDTO> bookingDTOS = new ArrayList<>();
        List<Booking> bookings = bookingRepository.findByMemberId(Long.parseLong(id));

        for(Booking e : bookings) {
            BookingDTO bookingDTO = new BookingDTO();
            bookingDTO.setBookingId(e.getBookingId());
          //  bookingDTO.setId(e.getMember().getId());
            bookingDTO.setBookedName(e.getMember().getName());
            bookingDTO.setBookedEmail(e.getMember().getEmail());
            bookingDTO.setExhibitNo(e.getExhibitions().getExhibitNo());
            //bookingDTO.setExhibitName(e.getExhibitions().getExhibitName());
            bookingDTO.setBookingDate(e.getBookingDate());
            bookingDTO.setVisitDate(e.getVisitDate());

            // 결제정보추출
            if(e.getPayment() != null) {
                PaymentDTO paymentDTO = new PaymentDTO();
                paymentDTO.setPaymentId(e.getPayment().getPaymentId());
                paymentDTO.setPaymentType(e.getPayment().getPaymentType());
                paymentDTO.setPaidPrice(String.valueOf(e.getPayment().getPaidPrice()));
                paymentDTO.setPaymentStatus(String.valueOf(e.getPayment().getPaymentStatus()));
                paymentDTO.setPaymentDate(e.getPayment().getPaymentDate());
                paymentDTO.setPaymentCnt(e.getPayment().getPaymentCnt());

               // bookingDTO.setPaymentDTO(paymentDTO);
            }
            bookingDTOS.add(bookingDTO);
        }
        return bookingDTOS;
    }
}
