import styled from "styled-components";
import { useState } from "react";
import profile from "./../../resources/라이언프로필.png"
import DDDApi from "../../api/DDDApi";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    /* padding : 0 !important;*/
    width: 92%;
    min-height: 50%;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 15px 18px;
    margin-top: 20px;
    

    .commentbox {
      display: flex;
      align-items: center;
      background-color: #F4F8FF;
      flex-direction: row;
      border-radius: 20px;
      margin: 1rem;
      padding: 1em;
        
        
        img {
            width: 4em;
            height: 4em;
            border-radius: 50%;
            margin-left: .3em;
            object-fit: cover;
        }

        .user {
            font-size: 13px;
            margin-left: .5em;
        }  
        
        .writedate {
        font-size:1px;
        margin-top: .2em;
       }

        .input-wrapper {
            display: flex;
            align-items: center;
            margin-left: auto;
            flex-grow: 1;
            margin: 12px;
            /* margin-right: 1em;  */

      
          input {
            padding: 0.5em;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-right: 0.5em;
            flex-grow: 1;
            min-width: 0;
          }
      
          
        }
        .sendComment {
    
          button {
              padding: 0.5em 1em;
              border: none;
              border-radius: 5px;
              background-color: #333;
              color: white;
              display: inline-block;
              cursor: pointer;
              margin-left: 1em; 
            }
        }

    @media (max-width: 600px) {
      flex-direction: column;
    }


  }
`;

const BoardComment = ({ boardNo, nickname }) => {

  const getId = window.localStorage.getItem("memberId");
  const isLogin = window.localStorage.getItem("isLogin");
  const [comment, setComment] = useState(""); // 댓글 목록 상태 관리(입력 배열값)
  const navigate = useNavigate();
  
  const postComment = async () => {
      
      // 새로운 댓글을 작성하는 API 호출
      const response = await DDDApi.commentWrite(comment, getId, boardNo);
      console.log("성공내용 : " + response.data);

  };


  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      postComment();
    }
  };

  const handleButtonClick = () => {
    postComment();
    alert('댓글 작성이 완료되었습니다 :)');
   // window.location.reload(); // 현재 페이지 새로고침
  };

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleInputClick = () => {
    if (!isLogin) {
      alert('로그인 후 작성이 가능합니다');
      navigate('/login')
  }
}


    return (
        <Wrapper>
          <div className="commentbox">
            {/* <img src={profile} alt="프로필 이미지" /> */}
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