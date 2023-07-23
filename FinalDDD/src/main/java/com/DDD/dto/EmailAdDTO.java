package com.DDD.dto;

import lombok.*;

import java.time.LocalDateTime;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class EmailAdDTO {
    private String emailNo;
    private String title;
    private String emailContents;
    private LocalDateTime sentEmailDate;

}
