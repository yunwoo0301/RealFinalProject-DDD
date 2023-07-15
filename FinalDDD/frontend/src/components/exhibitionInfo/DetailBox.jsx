import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../util/Button";
import { useNavigate } from "react-router";
import {RiUserHeartLine} from "react-icons/ri";
import ConfirmModal from "../../util/ConfirmModal";


const Container = styled.div`
  position: relative;
  .imgBox{
        overflow: hidden;
        width: 13rem;
        height: 17rem;
        position: absolute;
        top: 1rem;
        left: 8rem;
        transform: translateX(-50%);
        background-image: url(${props => props.imgUrl});
        background-repeat: no-repeat;
        background-size: cover;

    }
 .name {
        color : black;
        font-weight: bolder;
        font-size: 2rem;
        width: 100%;
        text-align: center;
        position: absolute;
        top: 5rem;
        left: 50%;
        transform: translateX(-50%);

    }
    .date {
        font-size: 1.3rem;
        position: absolute;
        top: calc(80px + 5rem);
        left: 50%;
        transform: translateX(-50%);
    }
    .location{
        font-size: 1rem;
        position: absolute;
        top: calc(80px + 8rem);
        left: 50%;
        transform: translateX(-50%);
    }
    .btn{
      width: 8rem;
      height: 2.5rem;
      position: absolute;
      top:calc(80px + 10rem);
      right: 2rem;
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
    .name{
      font-size: 1.3rem;
      top: 5rem;
      font-weight: 900;
      text-shadow: 2px 2px 4px rgba(94, 173, 247, 0.5);
    }
    .date{
      width: 100%;
      text-align: center;
      font-weight: bold;
      font-size : 1rem;
      top: calc(80px + 3rem);
      right: 10px;
    }
    .imgBox{
      display: none;
    }
    .btn{
      width: 30%;
      height: 1.5rem;
      top: calc(80px + 9rem);
      right: 6.3rem;

    }
    .location{
      font-weight: bold;
      width: 100%;
      top: calc(80px + 5rem);
      text-align: center;
    }
  }
`;
const ImgBox = styled.div`
    width: 100%;
    height: 300px;
    position: relative;
    background-image: url(${props => props.imgUrl});
    background-repeat: no-repeat;
    background-size:cover;
    opacity: 0.3;



`;

const DetailBox = ({data}) => {

    const isLogin = window.localStorage.getItem("isLogin");
    const navigate = useNavigate();
    const handleClick = (data) => {
      if (isLogin) {
        navigate(`/reservation/${data.exhibitNo}`);
      } else {
        setOpenModal(true);
      }
    };

    // 날짜형식 바꾸기

    const formatDate = (dateStr) => {
      const year = dateStr.toString().substring(0, 4);
      const month = dateStr.toString().substring(4, 6);
      const day = dateStr.toString().substring(6, 8);
      return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
    };

    // 예매시 로그인이 아닐경우 모달띄우기
    const [openModal, setOpenModal] = useState(false);
    const clickToClose = () => {
      setOpenModal(false);
    }

    const goToLogin = () => {
        navigate("/login");
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
        <button onClick={clickToClose}>취소</button>
      ]

    }

    return(
        <>
        {openModal && <ConfirmModal props={props}/>}
        {data &&
        <Container imgUrl ={data.imgUrl}>
            <ImgBox imgUrl ={data.imgUrl}/>
            <div className="imgBox" />
            <div className="name">{data.exhibitName}</div>
            <div className="date">{formatDate(data.startDate)} ~ {formatDate(data.endDate)}</div>
            <div className="location">{data.exhibitLocation}</div>
            <div className="btn">
            <Button onClick={()=>handleClick(data)}>예약하기</Button>
            </div>
        </Container>
    }
    </>
    );
}

export default DetailBox;