import React from "react";
import styled from "styled-components";
import { SlCheck } from "react-icons/sl";

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  top: 0;
  display: flex;
  justify-content: center;
`;
const Content = styled.div`
  background-color: #5EADF7;
  width: 100vw;
  height: 4%;
  padding: 1rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlertBlue = () => {
  return (
    <>
      <Container>
        <Content>
          <SlCheck style={{ marginRight: ".5rem" }} />
          <div> 저장이 완료되었습니다. </div>
        </Content>
      </Container>
    </>
  );
};

export default AlertBlue;
