package com.DDD.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class PayAmountDTO {
    // 전체 결제 정보
    // 전체 결제 금액, 비과세 금액, 부과세 금액
    private int total, tax_free, vat;
}
