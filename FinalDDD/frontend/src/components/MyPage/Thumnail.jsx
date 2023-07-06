import React from 'react';
import styled from 'styled-components';
import { thumbnail, profileImage } from './Data';


const Container = styled.div`
    /* background-color: aqua; */
    box-sizing: border-box;
    position: relative;
    top: 0%;
    width: 100%;
    height: 30%;
    min-height: 270px;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    .Thumnail{
        background-size : 100% ;
        width: 100%;
        height: 100%;
        overflow-y: hidden;
        background-repeat: no-repeat;
        background-position: center;
        border-top-right-radius: inherit;
        border-top-left-radius: inherit;
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

const thumnailStyle = () => {
    return {
      backgroundImage: `url(${thumbnail[0]})`,
    };
};
const profileIconStyle = () => {
    return {
      backgroundImage: `url(${profileImage[0]})`,
    };
};

const Thumnail = () => {

    return (
        <Container>
            <div className='Thumnail' style={thumnailStyle()}></div>
            <BlackBG/>
            <div className='profileIcon' style={profileIconStyle()}></div>
        </Container>
    );
};

export default Thumnail;