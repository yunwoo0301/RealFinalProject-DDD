import React from "react";
import styled from "styled-components";
import {RiKakaoTalkFill} from 'react-icons/ri';
import {AiFillInstagram} from 'react-icons/ai';

const Foot = styled.div`
    margin-top: 20rem;
    height: 20vh; 
    width: 100%;
    border-top:2px solid #050E3D;
    color:#666;

    .first{
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
        margin: 1rem 2rem 0 0;
    }

    .second{
        margin-left: 4rem;
    }
    .third{
        margin-left: 4rem;
    }

`;


  const Footer = () => {
    return(
        <Foot>
        <div className="bottomMenu">
        <div className="first">
            <div style={{ float: "right"}}><RiKakaoTalkFill size="25"/></div>
            <div style={{ float: "right"}}><AiFillInstagram size="25"/></div> 
        </div>
        <div className="second">
            <p>Diverse Different Display :DDD</p>
        </div>
        <div className="third">
        <p>장연주 정연우 이택현 곽은지</p>
        </div>
        </div>   
        </Foot>

    );
  }

  export default Footer;