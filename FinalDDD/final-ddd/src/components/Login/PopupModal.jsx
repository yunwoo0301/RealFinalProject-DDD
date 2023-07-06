import React from "react";
import styled from "styled-components";
import { SlCheck } from "react-icons/sl";

const Container = styled.div`
  /* background-color: aqua; */
  width: 0;
  height: 0;
  box-sizing: border-box;
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
    font-size: 2rem;
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
      background-color: #5eadf7;
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
            <SlCheck fill="#2B5EC2" />
          </div>
          <div className="title">회원가입 완료🎉</div>
          <div className="desc">
            DDD의 회원가입이 완료되었습니다. <br /> 로그인 후 다양한 서비스를
            이용해주세요 :&#41;
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
