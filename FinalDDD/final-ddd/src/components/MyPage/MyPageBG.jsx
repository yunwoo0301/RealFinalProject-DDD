import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Thumnail from "./Thumnail";
import Introduce from "./Introduce";
import EditMemberMain from "./EditMemberMain";
import MyPost from "./MyPost";
import NaviBox from "./NaviBox";
import SNSBox from "./SNSBox";
import MyReservation from "./MyReservation";
import MyDiary from "./MyDiary";
import useStore from "../../store";
import Functions from "../../util/Functions";
import { MyPageApi, DiaryApi } from "../../api/MyPageApi";

const Container = styled.div`
  box-sizing: border-box;
  /* background-color: aqua; */
  position: relative;
  top: 0%;
  height: 100%;
  justify-content: center;
  display: flex;
`;
const Modal = styled.div`
  width: 55vw;
  min-width: 600px;
  max-width: 900px;
  height: auto;
  min-height: 1024px;
  background-color: white;
  /* position: relative;
    top: 0%; 
    left: 50%;
    transform: translate3d(-50%, -20%, 0); */
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  border: 0.5px solid #bbb;
`;

const MyPageBG = () => {
  let memberId = Functions.getMemberId();

  const { showPage, memberData, setMemberData, myDiaryData, setMyDiaryData } =
    useStore();

  useEffect(() => {
    const memberFetchDate = async () => {
      const response = await MyPageApi.info(memberId);
      console.log(response);
      setMemberData(response.data);
      //   console.log(memberData);
    };
    memberFetchDate();
  }, [memberId]);

  useEffect(() => {
    const diaryFetchDate = async () => {
      const response = await DiaryApi.info(memberId);
      const newMyDiaryData = response.data;
      setMyDiaryData(newMyDiaryData);
      console.log(newMyDiaryData);
    };
    diaryFetchDate();
  }, [memberId]);

  return (
    <>
      <Container style={showPage === "다이어리" ? { height: "auto" } : null}>
        <Modal>
          {showPage === "마이페이지" && (
            <>
              <Thumnail />
              <SNSBox />
              <Introduce />
            </>
          )}
          {showPage === "다이어리" && (
            <>
              <Thumnail />
              <NaviBox />
              <MyDiary />
            </>
          )}
          {showPage === "예약관리" && (
            <>
              <Thumnail />
              <NaviBox />
              <MyReservation />
            </>
          )}
          {showPage === "내게시물" && (
            <>
              <Thumnail />
              <NaviBox />
              <MyPost />
            </>
          )}
          {showPage === "내정보수정" && (
            <>
              <Thumnail />
              <NaviBox />
              <EditMemberMain />
            </>
          )}
        </Modal>
      </Container>
    </>
  );
};

export default MyPageBG;
