import React from "react";
import styled from "styled-components";


const Container = styled.div`
  /* background-color: aqua; */
  width: 0;
  height: 0;
  box-sizing: border-box;
`;
const Modal = styled.div`
  position: fixed;
  width: 30%;
  min-width: 500px;
  min-height: 200px;
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
      background-color: ${props => (!props.disabled ? '#5eadf7' : '#b0abab')};
      color :${props => (!props.disabled ? '#ffffff' : '#050E3D')};
      background-color: #5eadf7;
      border: 1px solid #f4f8ff;
      font-size: 0.8rem;
      cursor: pointer;
    }
  }
`;

const ConfirmModal = ({props}) => {
  return (
    <>
      <Container>
        <Modal>
          <div className="checkIcon">
            {props.icon}
          </div>
          <div className="title">{props.title}</div>
          <div className="desc">
            {props.body}
          </div>
          <div className="btnBlock">
            {props.button}
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default ConfirmModal;
