import React, { useEffect } from "react";
import styled from "styled-components";
import Thumnail from "./Thumnail";
import Introduce from "./Introduce";
import EditMemberMain from "./EditMemberMain";
import MyPost from "./MyPost";
import NaviBox from "./NaviBox";
import SNSBox from "./SNSBox";
import MyReservation from "./MyReservation";
import MyDiary from "./MyDiary";
import MyMessage from "./MyMessage";
import useStore from "../../store";
import Functions from "../../util/Functions";
import { MyPageApi, DiaryApi } from "../../api/MyPageApi";
import EditThumnail from "./EditThumnail";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  box-sizing: border-box;
  /* background-color: aqua; */
  position: relative;
  top: 0%;
  padding: 0%;
  height: 100%;
  justify-content: center;
  display: flex;
`;
const Modal = styled.div`
  box-sizing: border-box;
  width: 55vw;
  /* min-width: 600px; */
  /* max-width: 900px; */
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
  @media (max-width : 768px) {
    width: calc(100%);
    height: auto;
    border-radius: 0;
    /* background-color: red; */

  }

`;

const MyPageBG = () => {
  // let memberId = Functions.getMemberId();
  const { memberId } = useParams();

  const { memberData, showPage, setShowPage, setMemberData,  setMyDiaryData, myDiaryData} = useStore();
  // const [ myDiaryData,  ] = useState();

  useEffect(() => {
    Functions.fetchMemberDate(memberId, setMemberData, MyPageApi);
    // console.log(memberData)
}, [showPage, memberId]);


  useEffect(() => {
    const diaryFetchDate = async () => {
      const response = await DiaryApi.info(memberId);
      const newMyDiaryData = response.data;
      setMyDiaryData(newMyDiaryData);
      // console.log(newMyDiaryData);
    };
    diaryFetchDate();
  }, [showPage, memberId]);

  console.log('밖에있는 콘솔 : ' + memberData)
  console.log('밖에있는 콘솔 : ' + myDiaryData)



  return (
    <>
    { memberData && myDiaryData &&
    (
          <Container style={showPage === "다이어리" ? { height: "auto" } : null}>
            <Modal>
              {showPage === "마이페이지" &&  (
                <>
                  {memberData && <Thumnail memberData={memberData}/>}
                  <SNSBox />
                  {memberData && <Introduce memberData={memberData} myDiaryData={myDiaryData}/>}
                </>
              )}
              {showPage === "다이어리" && (
                <>
                  {memberData && <Thumnail memberData={memberData}/>}
                  <NaviBox />
                  <MyDiary />
                </>
              )}
              {showPage === "예약관리" && (
                <>
                  {memberData && <Thumnail memberData={memberData}/>}
                  <NaviBox />
                  <MyReservation />
                </>
              )}
              {showPage === "내게시물" && (
                <>
                  {memberData && <Thumnail memberData={memberData}/>}
                  <NaviBox />
                  <MyPost
                  memberId={memberId}
                  />
                </>
              )}
              {showPage === "내쪽지함" && (
                <>
                  {memberData && <Thumnail memberData={memberData}/>}
                  <NaviBox />
                  <MyMessage />
                </>
              )}
              {showPage === "내정보수정" && (
                <>
                  {memberData && <EditThumnail memberData={memberData}/>}
                  <NaviBox />
                  <EditMemberMain />
                </>
              )}
            </Modal>
          </Container>)
    }

        </>
  );
};

export default MyPageBG;