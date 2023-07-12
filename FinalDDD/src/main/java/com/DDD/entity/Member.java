package com.DDD.entity;

import com.DDD.constant.Authority;
import com.DDD.repository.MemberRepository;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "member")
@Getter @Setter @ToString
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Member {
    @Id
    @Column(name="member_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String name;

    @Column(nullable = false)
    private String password;

    private String tel;

    @Column(unique = true, nullable = false)
    private String nickname;

    private String instagram;

    private String profileImg;

    private String backgroundImg;

    private String introduce;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @Column(nullable = false)
    private boolean isActive = true;

    @ManyToOne
    private Diary diary;

    private String emailCheckToken;

    private LocalDateTime regDate;

    private LocalDateTime deleteDate;


//    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private List<FreeBoard> freeBoardList = new ArrayList<>();

    public boolean isActive() {
        return this.isActive;
    }

    @PrePersist
    protected void onCreate() {
        regDate = LocalDateTime.now();
    }

    @Builder // * .메소드 형태로 부르는 자바문법과 달리(생성자) 매개변수 전달할 때 파라미터 순서를 지키지 않아도 되는 장점
    public Member( String email, String name, String password, Authority authority, String tel, String nickname,
                   String instagram, String introduce, String profileImg, String backgroundImg, boolean isActive,
                   String emailCheckToken, LocalDateTime regDate, LocalDateTime deleteDate) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.authority = authority;
        this.tel = tel;
        this.nickname = nickname;
        this.instagram = instagram;
        this.introduce = introduce;
        this.profileImg = profileImg;
        this.backgroundImg = backgroundImg;
        this.isActive = isActive;
        this.emailCheckToken = emailCheckToken;
        this.regDate = regDate;
    }

}

