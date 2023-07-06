import React from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import Footer from "../components/main/Footer";
import Mainpage from "../components/main/MainScroll";



const MainContainer = styled.div `
    margin: 0 auto;
    font-family: 'Pretendard';
`

const HeaderStyle = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
`;



const Main = () => {


    return (
        <MainContainer>
            <HeaderStyle>
                <Header/>
            </HeaderStyle>
            <Mainpage/>
            <Footer/>

        </MainContainer>

    );
}

export default Main;