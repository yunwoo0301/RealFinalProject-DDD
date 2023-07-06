import React from "react";
import styled from "styled-components";
import Button from "../../util/Button";
import { useNavigate } from "react-router";
const Container = styled.div`
  position: relative;
  .imgBox{
        overflow: hidden;
        width: 200px;
        height: 280px;
        position: absolute;
        top: 10px;
        left: 120px;
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
        top: 80px;
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
      width: 150px;
      height: 40px;
      position: absolute;
      top:calc(80px + 10rem);
      right: 40px;
    }
    @media (max-width: 768px) {
    .name{
      font-size: 1.5rem;
    }
    .date{
      font-size : 0.8rem;
    }
    .imgBox {
        display: none;
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
        alert('로그인 후 이용 가능합니다.');
        navigate("/login");
      }
    };

    // 날짜형식 바꾸기
    
    const formatDate = (dateStr) => {
      const year = dateStr.toString().substring(0, 4);
      const month = dateStr.toString().substring(4, 6);
      const day = dateStr.toString().substring(6, 8);
      return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
    };

    return(
        <>
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