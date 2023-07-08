package com.DDD.controller;

import com.DDD.dto.BookingDTO;
import com.DDD.service.BookingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping(value = "/booking")
@RequiredArgsConstructor
//@CrossOrigin("http://localhost:3000")
public class BookingController {
    private final BookingService bookingService;

    // 예매확인
    @PostMapping("/newTicket")
    public ResponseEntity<Long> bookTicket(@RequestBody Map<String, String> data) {
        try {
            String id = data.get("id");
            String exhibitNo = data.get("exhibitNo");
            String visitDate = data.get("visitDate");
            String bookedName = data.get("bookedName");
            String bookedEmail = data.get("bookedEmail");
            String bookedTel = data.get("bookedTel");
            String getTicket = data.get("getTicket");

            Long bookingId = bookingService.bookTicket(exhibitNo, id, visitDate, bookedName, bookedEmail, bookedTel, getTicket);
            if (bookingId != null) {
                return ResponseEntity.ok(bookingId); // 성공 응답과 bookingId 반환
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 실패 응답 반환
            }
            } catch (Exception e) {
                e.printStackTrace(); // 예외 정보 출력 또는 로깅
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 실패 응답 반환
            }
    }


   // 내 예매확인
    @GetMapping("/checkTicket")
    public ResponseEntity<List<BookingDTO>> getBookedTicketList(@RequestParam("id") String id) {
        List<BookingDTO> list = bookingService.FindTicketList(id);
        return  new ResponseEntity<>(list,HttpStatus.OK);
    }

    // 예매 취소
    @PostMapping("/cancel")
    public ResponseEntity<String> cancelBooking(@RequestParam("bookingId") String bookingId) {
        try{
            boolean canceled = bookingService.cancelBooking(bookingId);
            if(canceled) {
                return ResponseEntity.ok("예매가 취소되었습니다😥😥");
            } else {
                return ResponseEntity.badRequest().body("예매취소에 실패하였습니다~ 🤯");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("❌예매취소를 수행하는 동안 에러가났습니당!❌");
        }
    }
}
