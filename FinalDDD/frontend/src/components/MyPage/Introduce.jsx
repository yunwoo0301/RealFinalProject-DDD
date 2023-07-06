import { React, useEffect, useState } from "react";
import styled from "styled-components";
import Diary from "./Diary";
import Thumnail from "./Thumnail.jsx";
import NaviBox from "./NaviBox.jsx";
import { useParams } from "react-router-dom";
import { MyPageApi } from "../../api/MyPageApi.js";
import useStore from "../../store";

const Container = styled.div`
  /* background-color  : beige; */
  width: 100%;
  height: 100%;
  .text {
    padding: 1.2rem 2.5rem;
    font-size: 1rem;
    font-weight: bold;
    display: inline-block;
    cursor: pointer;
  }
  hr {
    width: 90%;
    border: 1px solid #eee;
    margin: 0% 5%;
  }
`;

const TextBox = styled.div`
  width: 100%;
  height: 16%;
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
  .nickName {
    margin: 0.5rem 0 0 2.5rem;
    font-size: 1rem;
    font-weight: bold;
  }
  .desc {
    margin: 1rem 0 0 2.5rem;
    font-size: 0.9rem;
    /* background-color: red; */
  }
  &:last-child {
    border-bottom-right-radius: 2rem;
    border-bottom-left-radius: 2rem;
  }
`;

const Introduce = () => {
  const { setShowPage, memberData, myDiaryData } = useStore();
  const { memberId } = useParams();
  console.log(myDiaryData)
  console.log(memberData)

  return (
    <>
      <Container>
        <TextBox>
          { memberData && 
                        <>
                            <div className='nickName'> {memberData.nickname} </div>
                            <div className='desc'> {memberData.introduce} </div>
                        </>     
                    }
        </TextBox>
        <hr />
        <Diary />
        <hr />
        <span
          className="text"
          onClick={() => {
            setShowPage("내게시물");
          }}
        >
          게시물
        </span>
        <br />
        {/* <hr/>
                <span className='text' onClick={()=>{props.setShowPage('내게시물')}}>채팅</span> <br/> */}
        {memberData.id == memberId && (
          <>
            <hr />
            <span
              className="text"
              onClick={() => {
                setShowPage("예약관리");
              }}
            >
              예약 관리
            </span>
            <br />
            <hr />
            <span
              className="text"
              onClick={() => {
                setShowPage("내정보수정");
              }}
            >
              내 정보 수정
            </span>
          </>
        )}
      </Container>
    </>
  );
};

export default Introduce;
