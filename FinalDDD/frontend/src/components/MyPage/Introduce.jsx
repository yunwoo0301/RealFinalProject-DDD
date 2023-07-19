import { React, useEffect, useState } from "react";
import styled from "styled-components";
import Diary from "./Diary";
import Thumnail from "./Thumnail.jsx";
import NaviBox from "./NaviBox.jsx";
import { useParams } from "react-router-dom";
import { MyPageApi } from "../../api/MyPageApi.js";
import useStore from "../../store";
import Functions from "../../util/Functions";
import { FcSms, FcCalendar, FcDatabase, FcSupport } from "react-icons/fc";
import { SlBubbles } from "react-icons/sl";

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

const Introduce = ({memberData, myDiaryData}) => {
  const { setShowPage } = useStore();
  const { memberId } = useParams();
  const LoginMemberId = Functions.getMemberId();
  // console.log(myDiaryData)
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
        {myDiaryData && <Diary />}
        <hr />
        <span
          className="text"
          onClick={() => {
            setShowPage("내게시물");
          }}
        >
         <FcDatabase/> 게시물
        </span>
        <br />

        {LoginMemberId == memberId ? (
          <>
            <hr />
            <span
              className="text"
              onClick={() => {
                setShowPage("예약관리");
              }}
            >
              <FcCalendar/> 예약 관리
            </span>
            <br />
            <hr/>
            <span className='text' onClick={()=>{setShowPage('내쪽지함')}}> <FcSms/> 내 쪽지함</span> <br/>
            <hr />
            <span
              className="text"
              onClick={() => {
                setShowPage("내정보수정");
              }}
            >
              <FcSupport/> 내 정보 수정
            </span>
          </>
        ) : null}
      </Container>
    </>
  );
};

export default Introduce;
