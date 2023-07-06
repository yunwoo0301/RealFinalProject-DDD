package com.DDD.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class PayCardDTO {
    // 카드결제정보
    // 매입 카드사 한글명, 매입 카드사 코드
    private String purchase_corp, purchase_corp_code;
    // 카드 발급사 한글명, 카드 발급사 코드
    private String issuer_corp, issuer_corp_code;
    // 카드 BIN, 카드 타입, 할부 개월 수, 카드사 승인번호, 카드사 가맹점 번호
    private String bin, card_type, install_month, approved_id, card_mid;
    // 무이자 할부여부 (Y/N), 카트상품코드
    private String interest_free_install, card_item_code;
}
