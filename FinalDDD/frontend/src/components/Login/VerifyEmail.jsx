import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";
import BGItmes from "./BGItmes";
import ConfirmModal from "../../util/ConfirmModal";
import { FcLike } from "react-icons/fc";

const ModalBodyStyle = styled.div`
.warn{
    height: 10px;
    font-size: 0.8rem;
    color: red;
    line-height: 1.2;
    background-color: red;
}`;

const buttonStlye = {
  backgroundColor:'#2B5EC2',
  marginTop:'1rem',
  

}

function VerifyEmail() {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    axios.get(`http://localhost:8111/login/check-email-token?token=${token}`)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.error(err);
    });
  }, [location]);

  const deleteProps  ={
    title: "환영해요!",
    body: (
      <ModalBodyStyle>
        :DDD 회원이 되주셔서 감사합니다!  <br />
        이제부터 다양한 전시회를 탐색하러 <br/>
        이동해 볼까요?🎉
        

    </ModalBodyStyle>
    ),
    button: [
    <button style={buttonStlye} onClick={()=>navigate('/login')}>로그인하러 가기!</button>,
    ],
    icon: <FcLike/>
  }

  return (
    <>
      <BGItmes/>
      <ConfirmModal props={deleteProps}  minWidth='400px' minHeight="450px"/>
    </>
  )
}

export default VerifyEmail;
