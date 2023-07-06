package com.DDD.controller;

import com.DDD.dto.KakaoApproveResponseDTO;
import com.DDD.dto.PayReadyDTO;
import com.DDD.dto.PaymentDTO;
import com.DDD.entity.Booking;
import com.DDD.service.BookingService;
import com.DDD.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping(value = "/pay")
//@CrossOrigin("http://localhost:3000")
public class PaymentController {
    // 카카오페이 결제 요청
    @Autowired
    private PaymentService paymentService;
    private BookingService bookingService;

    // 결제요청
    @PostMapping("/kakaoReady") // 처음에 겟매핑에서 포스트로 바꿈
    public PayReadyDTO readyToKakaoPay(String id,  String exhibitNo, String quantity, String price, String bookingId) {

        return paymentService.kakaoPayReady(id, exhibitNo, quantity, price, bookingId);
    }

    // 결제성공
    @GetMapping("/kakaoSuccess")
    public ResponseEntity<String> afterPayRequest(@RequestParam("pg_token") String pg_Token, @RequestParam("id") String id, @RequestParam("bookingId") String bookingId) {
        KakaoApproveResponseDTO kakaoApprove = paymentService.ApproveResponse(pg_Token, id, bookingId);
        if (kakaoApprove != null && kakaoApprove.getAid() != null) {
            // 성공 시 현재 페이지를 닫는 스크립트 코드 전달
            String closePageScript = "<script>window.close();</script>";
            return ResponseEntity.ok().body(closePageScript);
        } else {
            return ResponseEntity.ok().body("fail"); // 실패 시 "fail" 반환
        }
    }



    // 결제 진행 중 취소
    @GetMapping("/cancel")
    public String payCancel() {
        // 이전 페이지로 리다이렉트
        return "redirect:/previous-page";
    }

    // 결제 실패
    @GetMapping("/fail")
    public String payFail() {
        return "redirect:/previous-page";
    }

    // 무통장입금
    @PostMapping("/banking")
    public ResponseEntity<PaymentDTO> bankingPayment(@RequestParam("id") String id,
                                            @RequestParam("bookingId") String bookingId,
                                            @RequestParam("paidPrice") int paidPrice,
                                            @RequestParam("paymentCnt") int paymentCnt) {
        try {
            PaymentDTO paymentDTO = paymentService.BankingPayment(id, bookingId, paidPrice, paymentCnt);
            return ResponseEntity.ok(paymentDTO);
        }  catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
