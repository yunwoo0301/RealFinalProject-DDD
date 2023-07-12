import React from "react";
import styled from "styled-components";
import { SlCheck } from "react-icons/sl";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start; // 상단 정렬을 위해 flex-start 사용
  /* padding: 2rem; */
  z-index: 999;
`;


const Content = styled.div`
  background-color: #fff2cd;
  width: 80vw;
  height: 4%;
  padding: 1rem;
  color: black;
  text-align: center;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
`;

const BoardAlert = ({ message }) => {
  return (
    <>
      <Container>
        <Content>
          <SlCheck style={{ marginRight: ".5rem" }} />
          <div>{message}</div>
        </Content>
      </Container>
    </>
  );
};

export default BoardAlert;
