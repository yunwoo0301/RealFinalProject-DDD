import React from "react";
import styled from "styled-components";
import { FcFeedback } from "react-icons/fc";

const Container = styled.div`
  /* background-color: aqua; */
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: absolute;
  top: 0;
`;
const Modal = styled.div`
  position: absolute;
  width: 20%;
  height: 40%;
  min-width: 400px;
  min-height: 400px;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 720px) {
    width: 100%;
    position: relative;
    transform: translate3d(-50%, -50%, 0);
      }



  .checkIcon {
    /* background-color: blue; */
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    padding-top: 2rem;
  }
  .title {
    font-size: 1.2rem;
    font-weight: bold;
    /* background-color: red; */
    text-align: center;
    padding-top: 0.5rem;
  }
  .desc {
    text-align: center;
    line-height: 2rem;
    padding-top: 2rem;
    /* background-color: orange; */
  }

  .btnBlock {
    height: 6rem;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: red; */

    button {
      width: 35%;
      height: 2.3rem;
      border-radius: 3rem;
      margin: 0 6px;
      background-color: #050e3d;
      border: 1px solid #f4f8ff;
      color: white;
      font-size: 0.8rem;
      cursor: pointer;
    }
  }
`;

const PopupModal = (props) => {
  return (
    <>
      <Container>
        <Modal>
          <div className="checkIcon">
            <FcFeedback/>
          </div>
          <div className="title">이메일을 인증해주세요!</div>
          <div className="desc">
            DDD의 회원가입이 완료되었습니다. <br />
            이메일 인증 후 로그인해주세요! :&#41;
          </div>
          <div className="btnBlock">
            <button onClick={props.showLogin}>확인</button>
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default PopupModal;
