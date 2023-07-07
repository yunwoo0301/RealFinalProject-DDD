package com.DDD.service;

import com.DDD.dto.BoardCommentDto;
import com.DDD.entity.BoardComment;
import com.DDD.entity.FreeBoard;
import com.DDD.entity.Member;
import com.DDD.repository.BoardCommentRepository;
import com.DDD.repository.FreeBoardRepository;
import com.DDD.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class BoardCommentService {
    private final MemberRepository memberRepository;
    private final FreeBoardRepository freeBoardRepository;
    private final BoardCommentRepository boardCommentRepository;

    // 댓글 작성
    public boolean createComments(String comment, Long id, Long boardNo) {
        log.debug("Creating comments: {}", comment, id, boardNo);
        Optional<Member> optionalMember = memberRepository.findById(id);
        Optional<FreeBoard> optionalFreeBoard = freeBoardRepository.findById(boardNo);

        if (optionalFreeBoard.isEmpty() || optionalMember.isEmpty()) {
            throw new EntityNotFoundException("게시글 또는 회원을 찾을 수 없습니다.");
        }

        FreeBoard freeBoard = optionalFreeBoard.get();
        Member member = optionalMember.get();

        BoardComment boardComment = new BoardComment();
        boardComment.setFreeBoard(freeBoard);
        boardComment.setMember(member);
        member.setNickname(member.getNickname());
        boardComment.setContent(comment);
        boardComment.setWriteDate(LocalDateTime.now());

        boardCommentRepository.save(boardComment);
        return true;
    }



    // 댓글 삭제
    public boolean deleteComments(Long commentNo) {
        log.info("commentDelete method called with commentNo: {}", commentNo);
        try {
            boardCommentRepository.deleteById(commentNo);
            boardCommentRepository.flush(); // 영속성 컨텍스트 강제 플러시

            return true;
        } catch (Exception e) {
            return false;
        }
    }


    // 마이페이지 내 댓글 조회
    public List<BoardCommentDto> getCommentsByMember(Long id) {
        Optional<Member> optionalMember = memberRepository.findById(id);

        if (optionalMember.isEmpty()) {
            throw new UsernameNotFoundException("해당 멤버를 찾을 수 없습니다.");
        }

        Member member = optionalMember.get();
        List<BoardComment> boardCommentList = boardCommentRepository.findByMember(member);
        List<BoardCommentDto> boardCommentDtos = new ArrayList<>();

        for(BoardComment boardComment : boardCommentList) {
            BoardCommentDto boardCommentDto = new BoardCommentDto();

            boardCommentDto.setCommentNo(boardComment.getCommentNo()); // 댓글번호
            boardCommentDto.setBoardNo(boardComment.getFreeBoard().getBoardNo()); // 게시판번호
            boardCommentDto.setCategory(boardComment.getFreeBoard().getCategory()); // 카테고리
            boardCommentDto.setContent(boardComment.getContent()); // 댓글내용
            boardCommentDto.setId(boardComment.getMember().getId()); // 회원번호
            boardCommentDto.setNickname(boardComment.getMember().getNickname()); // 작성자
            boardCommentDto.setWriteDate(boardComment.getWriteDate()); // 작성일

            boardCommentDtos.add(boardCommentDto);
        }

        return boardCommentDtos;
    }

}



