package com.DDD.service;

import com.DDD.dto.BoardCommentDto;
import com.DDD.dto.FreeBoardDto;
import com.DDD.dto.MemberDto;
import com.DDD.entity.BoardComment;
import com.DDD.entity.FreeBoard;
import com.DDD.entity.Member;
import com.DDD.repository.FreeBoardRepository;
import com.DDD.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j // 출력구문 대신 사용함(System.out.println())
//@RequiredArgsConstructor // 매개변수가 있는 생성자를 자동으로 만들어줌
public class FreeBoardService {
    // 의존성 주입을 통해 빈에 등록된 필드는 불변성이 있어야 하므로 final 선언을 해야함
    private final FreeBoardRepository freeBoardRepository;
    private final MemberRepository memberRepository; // 게시물 작성 위해 멤버 추가


    public FreeBoardService(FreeBoardRepository freeBoardRepository, MemberRepository memberRepository) { // 게시판 서비스 클래스의 생성자

        this.freeBoardRepository = freeBoardRepository;
        this.memberRepository = memberRepository;
    }

    // 게시글 작성
    public boolean createBoards(Long id, String category, String region, String title, String image, String contents) {
        // DTO 에서 작성자 정보 가져오기
        Optional<Member> optionalMember = memberRepository.findById(id);


        if (optionalMember.isEmpty()) {
            throw new UsernameNotFoundException("해당 닉네임을 가진 멤버를 찾을 수 없습니다.");
        }

        // Optional 에서 멤버 가져오기
        Member member = optionalMember.get();

        FreeBoard freeBoard = new FreeBoard();
        freeBoard.setMember(member);
        freeBoard.setCategory(category);
        freeBoard.setRegion(region);
        freeBoard.setTitle(title);
        freeBoard.setImage(image);
        freeBoard.setContents(contents);

        freeBoardRepository.save(freeBoard);
        return true;
    }


    // 게시글 상세조회(+댓글 포함)
    public FreeBoardDto selectBoardOne(Long boardNo) {
        FreeBoard freeBoard = freeBoardRepository.findById(boardNo)
                .orElseThrow(() -> new EntityNotFoundException("해당 게시물을 찾을 수 없습니다."));


        // 조회수 초기화 (수정)
        if (freeBoard.getViews() == null) {
            freeBoard.setViews(0);
        }

        // 조회수 증가
        freeBoard.setViews(freeBoard.getViews() + 1);
        freeBoardRepository.save(freeBoard);
        System.out.println("조회수 : " + freeBoard.getViews());


        FreeBoardDto freeboardDto = new FreeBoardDto();
        freeboardDto.setBoardNo(freeBoard.getBoardNo());
        freeboardDto.setAuthor(freeBoard.getMember().getNickname());

        freeboardDto.setViews(freeBoard.getViews()); // 조회수 설정 ** 수정

        log.info("Comments: {}", freeBoard.getComments());
        List<BoardComment> comments = freeBoard.getComments();
        List<BoardCommentDto> boardCommentDtos = new ArrayList<>();

        // 댓글 리스트 영역
        for (BoardComment comment : comments) {
            BoardCommentDto boardCommentDto = new BoardCommentDto();
            boardCommentDto.setCommentNo(comment.getCommentNo());
            boardCommentDto.setContent(comment.getContent());
            boardCommentDto.setWriteDate(comment.getWriteDate());
            boardCommentDto.setBoardNo(comment.getFreeBoard().getBoardNo());
            boardCommentDto.setId(comment.getMember().getId());
            boardCommentDto.setProfileImg(comment.getMember().getProfileImg());
            boardCommentDto.setNickname(comment.getMember().getNickname());

            boardCommentDtos.add(boardCommentDto);
        }

        freeboardDto.setComments(boardCommentDtos);


//        freeboardDto.setEmail(freeBoard.getMember().getEmail()); // 회원 정보 할당
        freeboardDto.setId(freeBoard.getMember().getId()); // 회원 정보 할당
        freeboardDto.setCategory(freeBoard.getCategory());
        freeboardDto.setRegion(freeBoard.getRegion());
        freeboardDto.setTitle(freeBoard.getTitle());
        freeboardDto.setContents(freeBoard.getContents());
        freeboardDto.setImage(freeBoard.getImage());
        freeboardDto.setWriteDate(freeBoard.getWriteDate());

        // 프로필 이미지 설정 추가
        freeboardDto.setProfileImg(freeBoard.getMember().getProfileImg());


        return freeboardDto;
    }


    // 게시글 수정(최종) + 작성자 인증 제외(프엔 측 작성자 본인만 해당 페이지 접근 가능하도록 조건식 적용)
    public boolean updateBoards(Long boardNo, String category, String region, String title, String contents, String image) {
        try {
            FreeBoard freeBoard = freeBoardRepository.findById(boardNo)
                    .orElseThrow(() -> new EntityNotFoundException("해당 게시물을 찾을 수 없습니다."));

            freeBoard.setCategory(category);
            freeBoard.setRegion(region);
            freeBoard.setTitle(title);
            freeBoard.setContents(contents);
            freeBoard.setImage(image);
            freeBoardRepository.save(freeBoard);

        } catch (Exception e) {
            System.out.println("게시글 수정 중 오류가 발생했습니다: " + e.getMessage()); // 로깅 추가
            return false;
        }
        return true;
    }



    // 게시글 삭제(최종) + 작성자 인증 제외(프엔 측 작성자 본인만 실행하도록 조건식 적용)
    public boolean deleteBoards(Long boardNo) {
        FreeBoard freeBoard = freeBoardRepository.findById(boardNo)
                .orElseThrow(() -> new EntityNotFoundException("해당 게시물을 찾을 수 없습니다."));

        freeBoardRepository.delete(freeBoard);
        return true;
    }


    // 카테고리별 게시판 조회
    public List<FreeBoardDto> getFreeBoardsByCategory(String category) { // 카테고리별로 가져오기 위해
        List<FreeBoardDto> freeBoards = new ArrayList<>();
        List<FreeBoard> freeBoardList = freeBoardRepository.findByCategoryOrderByWriteDateDesc(category); // 최근 작성순 기준 카테고리별 조회

        for (FreeBoard freeBoard : freeBoardList) {
            FreeBoardDto freeBoardDto = new FreeBoardDto();
            freeBoardDto.setBoardNo(freeBoard.getBoardNo());
            freeBoardDto.setCategory(freeBoard.getCategory());
            freeBoardDto.setRegion(freeBoard.getRegion()); // 지역카테고리 추가
            freeBoardDto.setTitle(freeBoard.getTitle());
            freeBoardDto.setImage(freeBoard.getImage()); // 추가사항(이미지)
            freeBoardDto.setWriteDate(freeBoard.getWriteDate());

            // 조회수 오류 수정
            if (freeBoard != null && freeBoard.getViews() != null) {
                freeBoardDto.setViews(freeBoard.getViews()); // 조회수 현재값으로 재수정
                System.out.println("조회수: " + freeBoard.getViews());
            } else {
                freeBoardDto.setViews(0); // 조회수 초기 null 값인 경우 0으로 설정
            }

            Member author = freeBoard.getMember(); // nickName 을 fk로 갖고 오기 위해

            if (author != null) {
                MemberDto memberDto = MemberDto.fromMember(author);
                if (memberDto != null) {
                    freeBoardDto.setAuthor(memberDto.getNickname());
                }
            }

            freeBoards.add(freeBoardDto);
        }
        return freeBoards;

    }

    // 게시글 검색
    public List<FreeBoardDto> searchDataLoad(String keyword) {
        List<FreeBoardDto> freeBoards = new ArrayList<>();
        List<FreeBoard> freeBoardList = freeBoardRepository.findWithKeyword(keyword);
        for (FreeBoard freeBoard : freeBoardList) {
            FreeBoardDto freeBoardDto = new FreeBoardDto();
            freeBoardDto.setBoardNo(freeBoard.getBoardNo());
            freeBoardDto.setCategory(freeBoard.getCategory());
            freeBoardDto.setTitle(freeBoard.getTitle());
            freeBoardDto.setWriteDate(freeBoard.getWriteDate());


            freeBoardDto.setViews(freeBoard.getViews());
            System.out.println("조회수: " + freeBoard.getViews());


            Member author = freeBoard.getMember();
            if (author != null) {
                MemberDto memberDto = MemberDto.fromMember(author);
                freeBoardDto.setAuthor(memberDto.getNickname());
            }
            freeBoards.add(freeBoardDto);
        }
        return freeBoards;
    }


    // 특정 회원이 작성한 게시글 조회(마이페이지 내 게시글 조회 ** 재수정
    public List<FreeBoardDto> getBoardsByMember(Long id) {
        Optional<Member> optionalMember = memberRepository.findById(id);

        if (optionalMember.isEmpty()) {
            throw new UsernameNotFoundException("해당 멤버를 찾을 수 없습니다.");
        }

        Member member = optionalMember.get();
        List<FreeBoard> freeBoardList = freeBoardRepository.findByMember(member);
        List<FreeBoardDto> freeBoardDtos = new ArrayList<>();

        for (FreeBoard freeBoard : freeBoardList) {
            FreeBoardDto freeBoardDto = new FreeBoardDto();
            freeBoardDto.setBoardNo(freeBoard.getBoardNo());
            freeBoardDto.setAuthor(freeBoard.getMember().getNickname());
            freeBoardDto.setCategory(freeBoard.getCategory());
            freeBoardDto.setTitle(freeBoard.getTitle());
            freeBoardDto.setWriteDate(freeBoard.getWriteDate());
            freeBoardDto.setId(freeBoard.getMember().getId());
            freeBoardDto.setWriteDate(freeBoard.getWriteDate());

            freeBoardDto.setViews(freeBoard.getViews());
            System.out.println("조회수: " + freeBoard.getViews());

            freeBoardDtos.add(freeBoardDto);
        }

        return freeBoardDtos;
    }
}