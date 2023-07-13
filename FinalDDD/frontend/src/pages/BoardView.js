import styled from "styled-components";
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import BoardComment from "../components/Board/BoardComment";
import DDDApi from "../api/DDDApi";
import { MyPageApi } from "../api/MyPageApi";


const ViewWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 4px;

`;

const Section = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    float: center;
    position: relative;

    .board_header {
        h2 {
            padding: 10px 16px;
            font-size: 1.8em;
            margin-top: 30px;
            font-weight: 900;
        }
    }


    .sub_category {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        margin-right: 30px;
    }

    .editBtn {
        margin-left: auto;  // 오른쪽으로 이동
        margin-right: 20px;
        display: flex;
        flex-direction: row;  // 가로 방향으로 정렬
        align-items: center;

        .upBtn { // 수정하기 버튼
            padding: 10px 1.6em;
            border: none;
            border-radius: 10px;
            background-color: #050e3d;
            color: white;
            cursor: pointer;
            margin-left: 15px;
            transition: all .1s ease-in;
            text-decoration: none;

        &:hover {
            background-color: #5eadf7;
            color: #f4f8ff;}
        }

        .delBtn { // 삭제하기 버튼
                padding: 10px 1.6em;
                border: none;
                border-radius: 10px;
                background-color: #050e3d;
                color: white;
                cursor: pointer;
                margin-left: 15px;
                transition: all .1s ease-in;

            &:hover {background-color: #FA6060;
                    color: #F4F8FF;}
            }

    }

    @media (max-width: 600px) {

    .editBtn {

        .upBtn, .delBtn {
        padding: 0.7em 1.5em;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        }
    }
}

    .dateview {
        display: flex;
        font-weight: bold;
        margin-right : 4.5em;

        .write_date {
            flex:1;
            text-align: right;
            margin-right: 1em;
            margin-bottom:2px;
        }
    }


    .authorinfo {
        display: flex;
        align-items: center;

        img {
            width: 2em;
            height: 2em;
            border-radius: 50%;
            margin-left: .3em;
            border: 1px solid #ccc;
        }

        .author {
            margin-left: .5em
        }
    }

    .title {
        width: 100%;
        padding: 8px;
        font-size: 1.2em;

    }

    .comment_title {
        margin-top : 1em;
    }

`;

const TitleView = styled.h3`
    width: 93%;
    margin-left: 4px;
    padding: 12px;
    font-size: 1.1em;
    border: 1px solid #8a8a8a;
    border-radius: 12px;
`;

const Contents = styled.div`
    width: 92%;
    display: flex;
    flex-direction: column;
    border: 1px solid #8a8a8a;
    border-radius: 12px;
    padding: 30px 18px;
    margin-top: 20px;
    min-height: 400px;
    /* max-height: 800px;*/

    .image_area {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
    }

    img {
        width: 60%; /* 이미지의 최대 가로 너비를 설정 */
        height: 50%;
        border-radius: 12px;
        align-items: center;
        justify-content: center;
    }
    .text_area {
        margin: 12px;
    }

`;


/* 여기서부터는 댓글 영역 CSS */

const Wrapper = styled.div`
    width: 92%;
    display: flex;
    flex-direction: column;
    /*align-items: center;
    justify-content: center;*/
    border: 1px solid #8a8a8a;
    border-radius: 12px;
    padding: 15px 18px;
    margin-top: 20px;
    min-height: 50%;



    .comment {
        align-items: center;
        margin-bottom: 5px;
        margin-right: 30px;

        .commentbox {
            width: 97%;
            display: flex;
            flex-direction: column;
            float: center;
            background-color: #F4F8FF;
            border-radius: 20px;
            padding: 1em;
            margin: 1rem;

        }

    }

    img {
        width: 2.5em;
        height: 2.5em;
        border-radius: 50%;
        margin-left: .3em;
        object-fit: cover;
    }

    .userinfo {
        display: flex;
        /* align-items: center; */
        justify-content: space-between;

        .profile {
            display: flex;
            flex-direction: row;
        }

        .user {
            font-size: .8em;
            margin-top: 1em;
        }

    }

    .rightmenu {
        font-size: 14px;
        display: flex;
    }

    .comment_write {
        font-size: 13px;
        margin-right: 1em;
        justify-content: space-between;
        align-items: center;
    }


    @media (max-width: 600px) {
        flex-direction: column;
    }
`;


const TextInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 98%;
    margin: .3em;
    border: 1px solid #8a8a8a;
    border-radius: 10px;
    padding: 7px;
    color: #6d6767;
    font-size: .8em;

`;



const BoardView = () => {
    const params = useParams();  // url에서 boardNo를 가져오기 위해 uesParams() 사용
    let boardNo = params.no;
    const navigate = useNavigate();
    const [boardView, setBoardView] = useState(null); // URL에서 boardNo를 가져옴(게시판목록)
    const [commentList, setCommentList] = useState([]); // 댓글용 추가
    const [nickname, setNickname] = useState(""); // 닉네임 초기값 수정

    const [test, setTest] = useState(""); // 기본 이미지 불러오기용

    // 게시글 작성일자(연도-월-일)로 추출
    const formattedDate = boardView?.writeDate.substring(0, 10);

    // 작성자 정보를 localStorage에 저장
    window.localStorage.setItem('author', boardView?.author);

    // 수정, 삭제는 본인만 가능하도록 노출
    const isLogin = window.localStorage.getItem("isLogin");

    // id와 작성자 정보 비교
    const getId = window.localStorage.getItem("memberId"); // localStorage 저장 정보
    // const isAuthorMatched = boardView.id === getId;

    // 로그인한 id와 작성자의 id 비교
    const isAuthorMatched = String(boardView?.id) === getId; // boardView?.id(숫자타입)를 문자열로 반환
    console.log(isAuthorMatched);


    // 데이터 타입 비교
    console.log("boardView?.id 타입:", typeof boardView?.id); // number
    console.log("getId 타입:", typeof getId); // string


    // 로그인 상태 확인
    console.log(isLogin);

    //작성자와 id 일치 여부 확인 출력
    console.log("작성자 정보:", boardView?.author);
    console.log("getId:", getId);
    console.log("작성자와 Id 일치 여부:", isAuthorMatched);
    // console.log(boardView?.email);
    console.log(boardView?.id);


     // 수정, 삭제 버튼 노출 여부 확인
    const showEditBtn = () => {
        return isLogin && isAuthorMatched;
    };

    // 업데이트 함수 추가 **
    const [regComment, setRegComment] = useState(false);
    const regComm = () => {
        console.log("댓글 업데이트 함수호출 : ");
        setRegComment(true);
    }




    // 본문 불러오기
    useEffect(() => {

        const boardViewLoad = async () => {
            try {
                // 게시물 내용 불러오기
                const response = await DDDApi.getBoard(boardNo);
                if(response.status === 200) {
                    const data = response.data;
                    setBoardView(data); // 기존의 게시물 정보 설정

                    // 댓글 내용 불러오기
                    const commentData = data.comments;
                    setCommentList(commentData);
                    const rsp = await MyPageApi.info(getId); // localStorage 상에 닉네임 저장된 api 불러와서 재 렌더링
                    setNickname(rsp.data.nickname);
                    setTest(rsp.data.profileImg); // 기본프로필 이미지 불러오기


                    if (boardView && boardView.views != null) { // 게시글 조회수 구간
                        setBoardView(prevState => ({
                            ...prevState,
                            views: prevState.views + 1

                        }));
                    }
                }
            } catch (e) {
                console.log(e);
            }
        };
        boardViewLoad();
    }, [boardNo, regComment]);



    // 게시글 삭제 함수
    const deleteBoard = async () => {
        try {
          const confirmed = window.confirm('게시글을 삭제하시겠습니까?');
          if (!confirmed) {
            return;
          }

          const response = await DDDApi.delBoards(boardNo);
          console.log(response);

          navigate('/boardList'); // 삭제 후 게시판 메인 이동
        } catch (error) {
          console.error(error);

          if (error.response) {
            // 서버로부터 오는 응답 에러 처리
            console.log("error.response.data 내용 : " + error.response.data);
            console.log("error.response.status 내용 : " + error.response.status);
            console.log("error.response.headers 내용 : " + error.response.headers);

        } else if (error.request) {
            // 요청이 이루어졌으나 응답을 받지 못한 경우
            console.log(error.request);

        } else {
            // 오류를 발생시킨 요청 설정을 처리하는 중에 오류가 발생한 경우
            console.log('Error', error.message);

        }

        console.log(error.config);

        }
    };




    // 수정하기 버튼 이동을 위한 추가사항
    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState("");



    const onClickEdit = () => {
        // setModalOpen(true);
        // setModalOption('수정');
        setComment("수정하시겠습니까?");

        // 수정하기 버튼 클릭 시 수정화면으로 이동
        navigate(`/boardList/boardView/${boardNo}/editBoard`);
    };



    // 댓글 삭제 함수
    const deleteComment = async (commentNo) => {
        try {
            const confirmed = window.confirm("댓글 삭제 시 내용은 저장되지 않습니다. 정말로 삭제하시겠습니까?");
            if (!confirmed) {
                return; // 삭제 취소
            }

            const response = await DDDApi.commentDelete(commentNo);
            if (response.status === 200) {
                const updatedBoard = { ...boardView }; // 기존의 게시물 정보 복사
                updatedBoard.comments = updatedBoard.comments.filter((comment) => comment.commentNo !== commentNo); // 삭제된 댓글 제외
                setBoardView(updatedBoard); // 업데이트된 게시물 정보(기존)
                const updatedCommentList = commentList.filter((comment) => comment.commentNo !== commentNo); // 삭제된 댓글 제외
                setCommentList(updatedCommentList); // 댓글 목록 업데이트
            }
            } catch (error) {
            console.log(error);
            }
        };

    const onClickDelete = () => {
        deleteBoard();
    };


    return(
        <ViewWrap>
            <Section className="section">
            <div className="board_header">
                <div className="boardtitle"><h2>자유 게시판</h2></div>

                {/* 게시판 카테고리 */}
                <div className="sub_category">
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-readonly-label">카테고리</InputLabel>
                        <Select
                        labelId="demo-simple-select-readonly-label"
                        id="demo-simple-select-readonly"
                        value={boardView?.category || ''}
                        label="카테고리"
                        inputProps={{ readOnly: true }}
                        sx={{ height: '2.5em' }}>
                        <MenuItem value={boardView?.category }>{boardView?.category}</MenuItem>
                        </Select>
                    </FormControl>

                    {/* 지역 카테고리 추천수다 & 질문하기 선택 시 노출X */}
                    {boardView?.category !== '추천수다' && boardView?.category !== '질문하기' && (
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-readonly-label">지역선택</InputLabel>
                        <Select
                        labelId="demo-simple-select-readonly-label"
                        id="demo-simple-select-readonly"
                        value={boardView?.region || ''}
                        label="지역선택"
                        inputProps={{ readOnly: true }}
                        sx={{ height: '2.5em' }}>
                        <MenuItem value={boardView?.region}>{boardView?.region}</MenuItem>
                        </Select>
                    </FormControl>
                    )}

                    {/* 수정 및 삭제 버튼 */}
                    {showEditBtn() ? (
                    <div className="editBtn">
                        <button className="upBtn" onClick={onClickEdit}>수정하기</button>
                        <button className="delBtn" onClick={onClickDelete}>삭제하기</button>
                    </div>
                    ) : null}
                </div>

                {/* 제목 구간 */}
                <TitleView>{boardView?.title}</TitleView>

                {/* 작성자 정보 구간 */}
                {boardView && (
                <div className="authorinfo">
                    {/* {boardView?.profileImg ? (
                    <img src={boardView?.profileImg} alt="프로필 이미지" />
                    ) : (
                    <img src={profile} alt="기본 이미지" />
                    )} */}
                    {/*기본 프로필 이미지*/}
                    <img src={test} alt="프로필"/>
                    <div className="author">{boardView?.author}</div>
                </div>
                )}

                {/* 작성일 및 조회수 구간 */}
                {boardView && (
                <div className="dateview">
                    <div className="write_date">작성일 : {formattedDate}</div>
                    <div className="views">조회수 : {boardView?.views}</div>
                </div>
                )}

                {/* 게시글 내용(이미지+텍스트) 구간 */}
                <Contents>
                    {boardView && (
                            <div className="image_area">
                                {boardView.image ? (
                                    <img src={boardView.image} alt="업로드 이미지" />
                                ) : (
                                    <img src="/default-image.png" alt="기본 이미지" />
                                )}
                            </div>
                        )}
                    <div className="text_area">{boardView?.contents}</div>
                </Contents>
            </div>

            {/* 댓글 구간 */}
            <div className="comment_title"><h2>Comment</h2></div>

            {/* 댓글 데이터가 있을 경우에만 컨테이너 보이게 조정 */}
            {boardView?.comments && boardView.comments.length > 0 && (
            <Wrapper>
            {/* 댓글 목록 값 배열로 순회 */}
            {boardView?.comments && boardView.comments.map((comment, index) => (
                <div key={index} className="comment">
                    <div className="commentbox">
                        {/* 댓글 작성자 정보 */}
                        <div className="userinfo">
                        <div className="profile">
                            <img src={comment.profileImg} alt="프로필 이미지" />
                            <div className="user">{comment.nickname}</div>
                        </div>

                        {/* 작성일, 삭제 버튼 영역 */}
                        <div className="rightmenu">
                            <div className="comment_write">{new Date(comment.writeDate).toLocaleString()}</div>

                            {/* 로그인한 사용자와 댓글 작성자의 닉넴이 같은 경우에만 삭제 버튼을 보여줌 */}
                            {nickname === comment.nickname && (
                            <div className="deleteBtn" onClick={() => deleteComment(comment.commentNo)}
                            style={{ cursor: 'pointer', fontWeight: 'bold' }}>삭제</div>)}

                            </div>
                        </div>
                        {/* 댓글 텍스트 구간 */}
                        <TextInfo>{comment.content}</TextInfo>
                    </div>
                </div>
            ))}
            </Wrapper>
            )}

            {/* 댓글 인풋창 */}
            <BoardComment
                boardNo={boardNo}
                nickname = {nickname}
                commentList={commentList}
                setCommentList={setCommentList}
                regComment = {regComm}
                setRegComment={setRegComment}
            />
            </Section>
        </ViewWrap>
    )
};

export default BoardView;