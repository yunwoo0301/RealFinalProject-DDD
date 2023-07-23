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
import ConfirmModal from "../util/ConfirmModal";
import { FcCancel } from "react-icons/fc";
import { Backdrop } from "@mui/material";
import useStore from '../store';
import {RiUserHeartLine} from "react-icons/ri";
import MessageForm from "../components/Message/MessageForm";


const ViewWrap = styled.div`
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 4px;

`;

const Section = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    float: center;
    position: relative;

    .board_header {
        h2 {
            font-size: 1.8em;
            margin-top: 30px;
            font-weight: 900;
            text-align: center;
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
        margin-right: 2em;
        margin-top: 1.5em;
        display: flex;
        flex-direction: row;  // 가로 방향으로 정렬
        align-items: center;

        .upBtn { // 수정하기 버튼
            padding: .8em 1.6em;
            border: none;
            border-radius: 10px;
            background-color: #050e3d;
            color: white;
            cursor: pointer;
            transition: all .1s ease-in;
            text-decoration: none;

            &:hover {
                background-color: #5eadf7;
                color: #f4f8ff;}
            }

        .delBtn { // 삭제하기 버튼
            padding: .8em 1.6em;
            border: none;
            border-radius: 10px;
            background-color: #050e3d;
            color: white;
            cursor: pointer;
            margin-left: 1.2em;
            transition: all .1s ease-in;

            &:hover {background-color: #FA6060;
                    color: #F4F8FF;}
        }
    }

    @media (max-width: 768px) {

    .editBtn {
        margin-right: .1rem;


        .upBtn, .delBtn {
            display: flex;
            flex-direction: column;
            margin-left: .6em;
            padding: .5em 1em;

        }
    }
}

    .dateview {
        display: flex;
        font-weight: bold;
        justify-content: flex-end;
        padding-right: 4.5em;


        .write_date, .views {
            margin-left: 1em;
            margin-bottom:2px;

        }
        @media (max-width: 768px) {
            padding-right: 1em;
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
        display: flex;
        flex-direction: row;
        margin-top : 1em;

        h2, .comment_List {
            margin-left: 1em;
            margin-bottom:2px;
        }
        .comment_List {
            margin-top: 1.6em;
        }
    }

    @media (max-width: 768px) {
        width: 100vw;
    }

    .hoverContent {
    position: absolute;
    width: 10%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 1;
    cursor: pointer;

    p {
      margin: 0;
      cursor: pointer;
    }
    }
`;

const ListMenu = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 4.5em;

    .preBtn, .mainBtn, .nextBtn {
        border-radius: 10px;
        font-weight: bold;
        cursor: pointer;
        margin-left: 1em;
        transition: all .1s ease-in;
        text-decoration: none;
    }

    @media (max-width: 768px) {
        display: flex;
        flex-direction: row;
        margin-right: 0;

        .preBtn, .mainBtn, .nextBtn {
            font-size: .7em;
        }
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
    height: auto;

    .image_area {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
    }

    img {
        width: 50%; /* 이미지의 최대 가로 너비를 설정 */
        height: auto;
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
    border: 1px solid #8a8a8a;
    border-radius: 12px;
    padding: 15px 18px;
    margin-top: 1.2em;
    margin-bottom: .5em;
    min-height: 50%;

        .commentbox {
            display: flex;
            flex-direction: column;
            float: center;
            background-color: #F4F8FF;
            border-radius: 20px;
            padding: 1em;
            margin: 1rem;

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
        justify-content: space-between;

        .profile {
            display: flex;
            flex-direction: row;
        }

        .user {
            font-size: .8em;
            margin-top: 1em;
            margin-left: .4em;
        }

    }

    .rightmenu {
        font-size: .8em;
        display: flex;
    }

    .comment_write {
        margin-right: .7em;
        justify-content: space-between;
        align-items: center;
    }

    .hoverContent {
    position: absolute;
    width: 10%;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    z-index: 1;
    cursor: pointer;

    p {
      margin: 0;
      cursor: pointer;
    }
    }


    @media (max-width: 768px) {
        flex-direction: column;
    }
`;


const TextInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: .3em;
    border: 1px solid #8a8a8a;
    border-radius: 10px;
    padding: 7px;
    color: black;
    font-size: .8em;

`;

const ModalBodyStyle = styled.div`
.warn{
    font-size: 0.8rem;
    color: red;
    line-height: 1.2;
}
`;


const BoardView = () => {
    const params = useParams();  // url에서 boardNo를 가져오기 위해 uesParams() 사용
    let boardNo = params.no;

    const navigate = useNavigate();
    const [boardView, setBoardView] = useState(null); // URL에서 boardNo를 가져옴(게시판목록)
    const [commentList, setCommentList] = useState([]); // 댓글용 추가
    const [nickname, setNickname] = useState(""); // 닉네임 초기값 수정
    const [test, setTest] = useState(""); // 기본 이미지 불러오기용
    const [category, setCategory] = useState(null); // 이전글, 다음글 카테고리 설정용

    const {memberData} = useStore(); // 회원 데이터에서 프로필 가져오기용(댓글)
    console.log(memberData);

    // DB상 카테고리 값이 영어 이므로 한글로 반환하기 위한 매핑 작업
    const categoryMapping = {
        "Recommend": "추천수다",
        "Question": "질문하기",
        "DDDmate": "동행찾기"
    };

    // 게시글 작성일자(연도-월-일)로 추출
    const formattedDate = boardView?.writeDate.substring(0, 10);

    // 작성자 정보를 localStorage에 저장
    window.localStorage.setItem('author', boardView?.author);
    const isLogin = window.localStorage.getItem("isLogin");

    // 로그인 상태 확인
    console.log(isLogin);

    // 로그인한 id와 작성자의 id 비교
    const getId = window.localStorage.getItem("memberId"); // localStorage 저장 정보
    const isAuthorMatched = String(boardView?.id) === getId; // boardView?.id(숫자타입)를 문자열로 반환
    console.log(isAuthorMatched);


    // 데이터 타입 비교
    console.log("boardView?.id 타입:", typeof boardView?.id); // number
    console.log("getId 타입:", typeof getId); // string


    //작성자와 id 일치 여부 확인 출력
    console.log("작성자 정보:", boardView?.author);
    console.log("getId:", getId);
    console.log("작성자와 Id 일치 여부:", isAuthorMatched);
    console.log(boardView?.id);

    // 글목록 화면으로 이동
    const onClickMain = () => {
        navigate('/boardList');
    };


    // 수정, 삭제 버튼 노출 여부 확인
    const showEditBtn = () => {
        return isLogin && isAuthorMatched;
    };

    const [prevAndNextData, setPrevAndNextData] = useState(null); // 이전글, 다음글 담을 상태변수


    // 본문 불러오기
    const boardViewLoad = async () => {
        try {
        // 게시물 내용 불러오기
        const response = await DDDApi.getBoard(boardNo);
        if(response.status === 200) {
            const data = response.data;
            setBoardView(data); // 기존의 게시물 정보 설정
            setCategory(data.category); // 카테고리 정보 설정

            // 댓글 내용 불러오기
            const commentData = data.comments;
            setCommentList(commentData);
            const rsp = await MyPageApi.info(getId); // localStorage 상에 닉네임 저장된 api 불러와서 재 렌더링
            setNickname(rsp.data.nickname);
//            setTest(rsp.data.profileImg); // 기본프로필 이미지 불러오기
            }
        } catch (e) {
        console.log(e);
        }
    };

    // 조회수 증가 포함 수정 **
    useEffect(() => {
        boardViewLoad();
        const increaseView = async () => {
        // 조회수 증가 API 호출
        const increaseViewCountResponse = await DDDApi.increaseViewCount(boardNo);

        // 조회수 증가 API 호출이 성공했을 때만 게시물 데이터를 다시 불러옴
        if (increaseViewCountResponse.status === 204) {
            const updatedBoardResponse = await DDDApi.getBoard(boardNo);
            if (updatedBoardResponse.status === 200) {
                setBoardView(updatedBoardResponse.data);
            }
        }
    }
        increaseView();
    }, [boardNo]);


    // 이전글 및 다음글 가져오기
    useEffect(() => {
        const loadPrevAndNextBoard = async () => {
            try {
                // 이전글 및 다음글 가져오기 요청 보내기
                const prevAndNextResponse = await DDDApi.getPrevAndNextBoard(boardNo);
                if (prevAndNextResponse.status === 200) {
                    const prevAndNextData = prevAndNextResponse.data;
                    setPrevAndNextData(prevAndNextData);
                }
            } catch (e) {
                console.log(e);
            }
        };
        loadPrevAndNextBoard();
    }, [boardNo]);



    // prevAndNextData 상태가 업데이트될 때마다 호출되는 useEffect
    useEffect(() => {
        console.log(prevAndNextData); // 상태 업데이트 후 호출됨
    }, [prevAndNextData]);


    const onClickPrev = () => {
        if (prevAndNextData && prevAndNextData.prev) {
            const prevBoardNo = prevAndNextData.prev.boardNo;
            navigate(`/boardList/boardView/${prevBoardNo}`);
        } else {
            alert("이전 게시글이 없습니다.");
        }
    };

    // 다음글 보기 함수
    const onClickNext = () => {
        if (prevAndNextData && prevAndNextData.next) {
            const nextBoardNo = prevAndNextData.next.boardNo;
            navigate(`/boardList/boardView/${nextBoardNo}`);
        } else {
            alert("다음 게시글이 없습니다.");
        }
    };


    // 게시글 수정 화면으로 이동
    const onClickEdit = () => {
        navigate(`/boardList/boardView/${boardNo}/editBoard`);
    }


    // 게시글 삭제 함수
    const deleteBoard = async (boardNo) => {
        try {
            const response = await DDDApi.delBoards(boardNo);
            console.log(response);
            if (response.status === 200) {
                setShowModal(false);
                navigate('/boardList'); // 삭제 후 게시판 메인 이동
            }
        } catch (error) {
            console.error(error);
        }
    };

    // 게시물 삭제 모달 이벤트
    const onClickDelete = () => {
        setShowModal(true);
    };

    // 게시글 삭제용 모달 & 함수
    const [showModal, setShowModal] = useState(false);

    const boardDelete  ={
        title: "게시글 삭제",
        body: (
        <ModalBodyStyle>
            등록된 게시글을 삭제하시겠습니까?  <br />
            <div className="warn">삭제하신 게시글은 복구가 어렵습니다. <br/>
            </div>
        </ModalBodyStyle>
        ),
        button: [
        <button onClick={()=> deleteBoard(boardNo)}>확인</button>,
        <button onClick={()=> setShowModal(false)}>취소</button>
        ],
        icon: <FcCancel/>
      }



    // 댓글 삭제 함수
    const deleteComment = async (commentNo) => {
        try {

            const response = await DDDApi.commentDelete(commentNo);
            if (response.status === 200) {
                const updatedBoard = { ...boardView }; // 기존의 게시물 정보 복사
                updatedBoard.comments = updatedBoard.comments.filter((comment) => comment.commentNo !== commentNo); // 삭제된 댓글 제외
                setBoardView(updatedBoard); // 업데이트된 게시물 정보(기존)
                const updatedCommentList = commentList.filter((comment) => comment.commentNo !== commentNo); // 삭제된 댓글 제외
                setCommentList(updatedCommentList); // 댓글 목록 업데이트

            } else {
                console.log("댓글 삭제 실패")
            }
        } catch (error) {
            console.log(error);
            }
        };


    // 댓글 삭제 모달 함수
    const [checkAgain, setCheckAgain] = useState(false);
    const [delSelect, setDelSelect] = useState(null); // 삭제할 댓글의 상태 변수

    const commentDelete  ={
        title: "댓글 삭제",
        body: (
        <ModalBodyStyle>
            댓글을 삭제하시겠습니까?  <br />
            <div className="warn">삭제하신 댓글은 저장되지 않습니다. <br/>
            </div>
        </ModalBodyStyle>
        ),
        button: [
        <button onClick={()=> deleteComment(delSelect)}>확인</button>,
        <button onClick={()=> setCheckAgain(false)}>취소</button>
        ],
        icon: <FcCancel/>
      }

      // 쪽지보내기

    // 다른 멤버에게 쪽지보내기 또는 프로필 보기메뉴
    const [isHovered, setIsHovered] = useState({});
    const [openedComment, setOpenedComment] = useState(null);

    const [warnModal, setWarnModal] = useState(false);
    const openToWarnModal = () => {
      setWarnModal(true);
    }
    const closeWarnModal = () => {
      setWarnModal(false);
    }
    const goToLogin = () => {
      navigate("/login");
    }

    const openProfile = (memberId) => {
       // 로그인이 안되어있으면 로그인 모달띄움
      if (!isLogin) {
      setIsHovered(false);
      openToWarnModal();
      return;
    }
      navigate(`/mypage/${memberId}`);
    };

    const handleMouseEnter = (commentNo) => {
      if (openedComment !== null) {
        setIsHovered((prev) => ({ ...prev, [openedComment]: false }));
      }
      setIsHovered((prev) => ({ ...prev, [commentNo]: !prev[commentNo] }));
      setOpenedComment((prev) => (prev === commentNo ? null : commentNo));
    };

    // 쪽지보내기로 props 보내기
    const [openMsg, setOpenMsg] = useState(false);
    const [receiver, setReceiver] = useState('');
    const [receiverName, setReceiverName] = useState('');


    const openToMsg = (receiverId, receiverName) =>{
      // 로그인이 안되어있으면 로그인 모달띄움
    if (!isLogin) {
      setIsHovered(false);
      openToWarnModal();
      return;
    }

      setIsHovered(false);
      setOpenMsg(true);
      setReceiver(receiverId);
      setReceiverName(receiverName);
    }
    const closeToMsg = () => {
      setOpenMsg(false);
    }



    const props = {
      icon: <RiUserHeartLine color="#FF69B4"/>,
      body:(
        <>
        <p>로그인 후 이용가능합니다🥺</p>
        <p style={{fontSize: "0.9rem"}}>확인을 누르시면 로그인페이지로 이동합니다.</p>
        </>
      ),
      button: [
        <button onClick={goToLogin}>확인</button>,
        <button onClick={closeWarnModal}>취소</button>
      ]

    }



    return(
        <>
        {openMsg && <MessageForm senderId={getId} receiverId={receiver} receiverName={receiverName} close={closeToMsg}/>}
        {warnModal && <ConfirmModal props={props}/>}
        <ViewWrap>
            <Section className="section">
            <div className="board_header">
                <div className="boardtitle"><h2>자유 게시판</h2></div>

                {/* 게시판 카테고리 */}
                <div className="sub_category">
                    <FormControl sx={{ m: 1, minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-readonly-label">카테고리</InputLabel>
                        <Select
                        labelId="demo-simple-select-readonly-label"
                        id="demo-simple-select-readonly"
                        value={categoryMapping[boardView?.category] || ''}
                        label="카테고리"
                        inputProps={{ readOnly: true }}
                        sx={{ height: '2.5em' }}
                        IconComponent={() => null}>
                        <MenuItem value={categoryMapping[boardView?.category] || ''}>
                        {categoryMapping[boardView?.category] || ''}</MenuItem>
                        </Select>
                    </FormControl>

                    {/* 지역 카테고리 추천수다 & 질문하기 선택 시 노출X */}
                    {boardView?.category !== 'Recommend' && boardView?.category !== 'Question' && (
                    <FormControl sx={{ m: 0.5, minWidth: 80 }}>
                        <InputLabel id="demo-simple-select-readonly-label">지역선택</InputLabel>
                        <Select
                        labelId="demo-simple-select-readonly-label"
                        id="demo-simple-select-readonly"
                        value={boardView?.region || ''}
                        label="지역선택"
                        inputProps={{ readOnly: true }}
                        sx={{ height: '2.5em' }}
                        IconComponent={() => null}>
                        <MenuItem value={boardView?.region}>{boardView?.region}</MenuItem>
                        </Select>
                    </FormControl>

                    )}
                </div>

                {/* 이전글 / 목록 / 다음글 버튼 추가 */}
                <ListMenu>
                    <div className="preBtn"  onClick={onClickPrev} >이전글</div>
                    <div className="mainBtn" onClick={onClickMain}>글목록</div>
                    <div className="nextBtn" onClick={onClickNext}>다음글</div>
                </ListMenu>


                {/* 제목 구간 */}
                <TitleView>{boardView?.title}</TitleView>

                {/* 작성자 정보 구간 */}
                {boardView && (
                <div className="authorinfo">
                    {/*기본 프로필 이미지*/}
                     {/* <img src={test} alt="프로필"/> */}
                    <img src={boardView?.profileImg} alt="프로필" onClick={() => handleMouseEnter(boardView?.boardNo)}/>
                    <div className="author">{boardView?.author}</div>
                </div>
                )}

                {isHovered[boardView.boardNo] && (
              <div className="hoverContent">
                <p onClick={() => openToMsg(boardView?.id, boardView?.author)}>쪽지보내기</p>
                <p onClick={() => openProfile(boardView?.id)}>프로필보기</p>
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
                <div className="text_area" dangerouslySetInnerHTML={{__html: boardView?.contents}}></div>
                </Contents>
            </div>

            <div className="sub_category">
                {/* 수정 및 삭제 버튼 */}
                {showEditBtn() ? (
                    <div className="editBtn">
                        <button className="upBtn" onClick={onClickEdit}>수정하기</button>
                        <button className="delBtn" onClick={onClickDelete}>삭제하기</button>
                    </div>
                    ) : null}
            </div>

            {/* 댓글 구간 */}
            <div className="comment_title">
                <h2>Comment</h2>
                <div className="comment_List">총 <span style={{ fontWeight: 'bold' }}>{boardView?.comments?.length || 0}개</span>의 댓글</div>
            </div>

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
                        <img src={comment.profileImg} alt="프로필 이미지" onClick={() => handleMouseEnter(comment.commentNo)} />
                        <div className="user">{comment.nickname}</div>
                    </div>

                    {isHovered[comment.commentNo] && (
                        <div className="hoverContent">
                        <p onClick={() => openToMsg(comment.id, comment.nickname)}>쪽지보내기</p>
                        <p onClick={() => openProfile(comment.id)}>프로필보기</p>
                        </div>
                    )}

                    {/* 작성일, 삭제 버튼 영역 */}
                    <div className="rightmenu">
                        <div className="comment_write">{new Date(comment.writeDate).toLocaleString()}</div>

                        {/* 로그인한 사용자와 댓글 작성자의 닉넴이 같은 경우에만 삭제 버튼을 보여줌 */}
                        {nickname === comment.nickname && (
                        <div className="deleteBtn" onClick={()=> {setCheckAgain(true);
                            // deleteComment(comment.commentNo);}}
                            setDelSelect(comment.commentNo);}}
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
                profile={memberData.profileImg}
                nickname = {nickname}
                commentList={commentList}
                setCommentList={setCommentList}
//                regComment = {regComm}
//                setRegComment={setRegComment}
                onCommentPost={boardViewLoad}/>
            </Section>
        </ViewWrap>

        <Backdrop
            sx={{
                backgroundColor: 'rgb(0,0,0,0.5)', // 배경색을 투명
                opacity:'0.5',
                color: 'black',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                top: 0, // 팝업을 상단에 위치
            }}
            open={checkAgain}
            onClick={()=>{setCheckAgain(false) }}>
        {checkAgain && <ConfirmModal props={commentDelete}/>}
        </Backdrop>

        <Backdrop
            sx={{
                backgroundColor: 'rgb(0,0,0,0.5)', // 배경색을 투명
                opacity:'0.5',
                color: 'black',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                top: 0, // 팝업을 상단에 위치
            }}
            open={showModal}>
        {showModal && <ConfirmModal props={boardDelete}/>}
        </Backdrop>

        </>
    )
};

export default BoardView;