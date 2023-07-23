import styled from "styled-components";
import { useState, useEffect } from "react";
import DDDApi from "../../api/DDDApi";
import { useNavigate } from "react-router-dom";
import BoardAlert from "../../util/BoardAlert";

const Wrapper = styled.div`
    width: 92%;
    min-height: 50%;
    display: flex;
    flex-direction: column;
    border: 1px solid #8a8a8a;
    border-radius: 12px;
    padding: 15px 18px;
    margin-top: 20px;
    margin-bottom: 1em; // 하단 여백 추가


    .commentbox {
      display: flex;
      align-items: center;
      background-color: #F4F8FF;
      flex-direction: row;
      border-radius: 20px;
      margin: 1rem;
      padding: 1em;


        img {
            width: 3em;
            height: 3em;
            border-radius: 50%;
            margin-left: .3em;
            object-fit: cover;
        }

        .user {
          font-size: .8em;
          margin-left: .5em;
        }

        .writedate {
            font-size: 1px;
            margin-top: .2em;
       }

        .input-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
//            margin-left: auto;
            flex-grow: 1;
            margin: 9px;


          input {
            padding: 0.5em;
            border: 1px solid #8a8a8a;
            border-radius: 5px;
            margin-right: 0.5em;
            flex-grow: 1;
            min-width: 0;
          }


        }
//        .sendComment {
//          display: flex;


          button {
              padding: 0.5em 1em;
              border: none;
              border-radius: 5px;
              background-color: #333;
              color: white;
              display: inline-block;
              cursor: pointer;
              margin-left: 1em;
//            }
        }

         @media (max-width: 768px) {
            flex-direction: column;
         }
  }
`;

const BoardComment = ({ boardNo, nickname, profile, commentList, setCommentList, onCommentPost }) => {

  const getId = window.localStorage.getItem("memberId");
  const isLogin = window.localStorage.getItem("isLogin");
  const [comment, setComment] = useState(""); // 댓글 목록 상태 관리(입력 배열값)
  const [sendModal, setSendModal] = useState(false); // 전송 모달용 표시
  const navigate = useNavigate();

  // 댓글 작성 함수
      const postComment = async () => {
        try {
          const response = await DDDApi.commentWrite(comment, getId, boardNo);
          if (response.status === 200) {
            setSendModal(true);
            setComment("");

            setTimeout(() => {
              setSendModal(false);
            }, 2000);

            // 댓글 작성이 성공적으로 완료된 후에 상위 컴포넌트에 알림
            onCommentPost();

            // 댓글 작성 후 댓글 목록 업데이트
            fetchComments();
          }
        } catch (error) {
          console.log(error);
        }
      };

      const fetchComments = async () => {
          try {
            const response = await DDDApi.getBoard(boardNo);
            if (response.status === 200) {
              setCommentList(response.data.comments);
            }
          } catch (error) {
            console.log(error);
          }
        };

      // 엔터 쳤을 때 이벤트 동작 함수
      const handleEnterKeyPress = (e) => {
        if (e.key === "Enter") {
          postComment();
          setSendModal(true);
        }
      };

      // 전송 버튼 클릭 했을 때 이벤트 동작 함수
      const handleButtonClick = () => {
        postComment();
        setSendModal(true);
      };


      // 댓글 입력 값
      const handleInputChange = (e) => {
        setComment(e.target.value);
      };

      // 로그인한 상태에서만 작성하도록 조건식 적용
      const handleInputClick = () => {
        if (!isLogin) {
          alert('로그인 후 작성이 가능합니다');
          navigate('/login')
        }
      }

    return (
        <Wrapper>
          {sendModal && <BoardAlert message="등록이 완료되었습니다." />}
          <div className="commentbox">
            <img src={profile} alt="댓글 프로필 이미지" />
            <div className="user">{nickname}</div>

            <div className="input-wrapper">
              <input
                type="text"
                value={comment}
                onChange={handleInputChange}
                onClick={handleInputClick} // 로그인 시 진입하도록 추가
                onKeyPress={handleEnterKeyPress} // Enter 키 이벤트 처리
                placeholder="댓글은 로그인이 필요한 서비스입니다."
              />
              <div className="sendComment">
                <button onClick={handleButtonClick}>전송</button>
              </div>
            </div>
          </div>
        </Wrapper>
      );
    };

export default BoardComment;