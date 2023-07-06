package com.DDD.dto;

import com.DDD.constant.Authority;
import com.DDD.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDto {
    private Long id; // 수정사항
    private String email;
    private String name;
    private String password;
    private String tel;
    private String nickname;
    private String instagram;
    private String profileImg;
    private String backgroundImg;
    private String introduce;
    private boolean isActive;
    private Authority authority;

    // 회원테이블에서 Id로 Nickname 추출함
    public static MemberDto fromMember(Member member) {
        MemberDto memberDto = new MemberDto();
        memberDto.setId(member.getId());
        memberDto.setNickname(member.getNickname()); // 닉네임(nickname) 설정
        return memberDto;
    }

}
