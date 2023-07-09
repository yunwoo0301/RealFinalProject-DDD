import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    /* background-color: aqua; */
    box-sizing: border-box;
    position: relative;
    top: 0%;
    width: 100%;
    height: 30%;
    min-height: 270px;
    max-height: 300px;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    .Thumnail{
        background-size : 100% ;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center;
        border-top-right-radius: inherit;
        border-top-left-radius: inherit;
        justify-content: center;
        align-items: center;
        display: flex;
        img{
          width: 100%;
          height: auto;
        }
    }
    .profileIcon{
        width: 6rem;
        height: 6rem;
        border-radius: 3rem;
        /* background-color: aqua; */
        position: relative;
        top: -15%;
        left: 1.5rem;
        background-size:cover;
        background-repeat: no-repeat;
        justify-content: center;
        align-items: center;
        display: flex;
        overflow: hidden;
    }
    img{
          width: 100%;
          height: auto;
        }
`;

const BlackBG = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: .1;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
`;


const Thumnail = ({memberData}) => {

    return (
        <Container>
            <div className='Thumnail'>
                <img src={memberData.backgroundImg} alt="썸네일" />
            </div>
            <BlackBG/>
            <div className='profileIcon'>
                <img src={memberData.profileImg} alt="프로필" />
            </div>
        </Container>
    );
};

export default Thumnail;