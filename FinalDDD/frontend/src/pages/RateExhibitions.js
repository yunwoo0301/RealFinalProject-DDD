import React from 'react';
import Header from "../components/header/Header";
import RateDiary from '../components/MyPage/RateDiary';
import styled from 'styled-components';
const RateExhibitions = () => {
    const HeaderContainer = styled.div`
    position: relative; // 이 부분 추가
    z-index: 2; // 이 부분 추가
  `;
  

    return (
        <>
        <HeaderContainer>

            <Header/>
        </HeaderContainer>
            <RateDiary/>
            
        </>
    );
};

export default RateExhibitions;