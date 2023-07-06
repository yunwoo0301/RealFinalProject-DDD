import React from "react";
import styled, { keyframes } from "styled-components";
import {ImageUrl1, ImageUrl2, ImageUrl3 } from "./imageURL";
import Marquee from "react-fast-marquee";

const ItemWrap = styled.div`
    overflow: hidden;
    min-width: 1400px;
    height: 100vh;
    /* min-height: 676px; */
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .marqueeStyle, .marqueeStyle2, .marqueeStyle3, .marqueeStyle4, .marqueeStyle5,.marqueeStyle6 {
        /* background-color: red; */
        height: 25%;
        min-height: 230px;
        width: 100%;
        position: relative;

    }
    .marqueeStyle {
        top: 40%;
        left: -34%;
    }
    .marqueeStyle2 {
        top: 20%;
        left: -20%;
    }
    .marqueeStyle3 {
        top: 20%;
        left: -6%;
    }
    .marqueeStyle4 {
        top: 0%;
        left: 8%;
    }
    .marqueeStyle5 {
        top: -30%;
        left: 22%;
    }
    .marqueeStyle6 {
        top: -50%;
        left: 36%;
    }

`;


const Item = styled.div`
    width: 12rem;
    height: 16rem;
    /* background-color: blue; */
    margin: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;


    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        background-size: cover;

    }
    
`;



const BGItmes = () => {
    return(
        <ItemWrap>
            <Marquee direction="up" speed={15} className="marqueeStyle">
            {
                ImageUrl1.map((ImageUrl, index) => (
                    <Item key={index}>
                        <img src={ImageUrl} alt="" />
                    </Item>
                ))
            }  
            </Marquee>
          
            <Marquee direction="down" speed={15} className="marqueeStyle2">
            {
                ImageUrl2.map((ImageUrl, index) => (
                    <Item key={index}>
                        <img src={ImageUrl} alt="" />
                    </Item>
                ))
            }  
            </Marquee>
            <Marquee direction="up" speed={15} className="marqueeStyle3">
            {
                ImageUrl3.map((ImageUrl, index) => (
                    <Item key={index}>
                        <img src={ImageUrl} alt="" />
                    </Item>
                ))
            }  
            </Marquee>
          
            <Marquee direction="down"  speed={15} className="marqueeStyle4">
            {
                ImageUrl1.map((ImageUrl, index) => (
                    <Item key={index}>
                        <img src={ImageUrl} alt="" />
                    </Item>
                ))
            }  
            </Marquee>
            <Marquee direction="up" speed={15} className="marqueeStyle5">
            {
                ImageUrl2.map((ImageUrl, index) => (
                    <Item key={index}>
                        <img src={ImageUrl} alt="" />
                    </Item>
                ))
            }  
            </Marquee>
          
            <Marquee direction="down" speed={15} className="marqueeStyle6">
            {
                ImageUrl3.map((ImageUrl, index) => (
                    <Item key={index}>
                        <img src={ImageUrl} alt="" />
                    </Item>
                ))
            }  
            </Marquee>
        </ItemWrap>
    )
}

export default BGItmes;

// import React from "react";
// import styled, { keyframes } from "styled-components";
// import {ImageUrl1, ImageUrl2, ImageUrl3 } from "./imageURL";

// const ItemWrap = styled.div`
//     overflow: hidden;
//     min-width: 1200px;
//     height: 100vh;
//     /* min-height: 676px; */
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate3d(-50%, -50%, 0);
//     /* background-color: aqua; */
//     display: flex;
// `;

// const ItemBlock = styled.div`
//     /* background-color: red; */
//     width: 160px;
//     /* height: 200px; */
//     height: 100vh;
//     margin-left:.6rem;    

// `;
// const Item =styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     max-width: 160px;
//     min-height: 230px;
//     height: 230px;
//     width: 160px;
//     background-color: white;
//     margin-bottom: .6rem;
//     border-radius: .3rem;
//     overflow: hidden;
// `;



// const BGItmes = () => {
//     return(
//         <ItemWrap>
//             <ItemBlock>
//                 {
//                     ImageUrl1.map((ImageUrl1, index) => (
//                         <Item key={index}>
//                             <img src={ImageUrl1} alt="" />
//                         </Item>
//                     ))
//                 }
//             </ItemBlock>
//             <ItemBlock>
//                 {
//                     ImageUrl2.map((ImageUrl, index) => (
//                         <Item key={index}>
//                             <img src={ImageUrl} alt="" />
//                         </Item>
//                     ))
//                 }
//             </ItemBlock>
//             <ItemBlock>
//                 {
//                     ImageUrl3.map((ImageUrl, index) => (
//                         <Item key={index}>
//                             <img src={ImageUrl} alt="" />
//                         </Item>
//                     ))
//                 }
//             </ItemBlock>
//             <ItemBlock>
//                 {
//                     ImageUrl1.map((ImageUrl, index) => (
//                         <Item key={index}>
//                             <img src={ImageUrl} alt="" />
//                         </Item>
//                     ))
//                 }
//             </ItemBlock>
//             <ItemBlock>
//                 {
//                     ImageUrl3.map((ImageUrl, index) => (
//                         <Item key={index}>
//                             <img src={ImageUrl} alt="" />
//                         </Item>
//                     ))
//                 }
//             </ItemBlock>
//             <ItemBlock>
//                 {
//                     ImageUrl1.map((ImageUrl, index) => (
//                         <Item key={index}>
//                             <img src={ImageUrl} alt="" />
//                         </Item>
//                     ))
//                 }
//             </ItemBlock>
//             <ItemBlock>
//                 {
//                     ImageUrl2.map((ImageUrl, index) => (
//                         <Item key={index}>
//                             <img src={ImageUrl} alt="" />
//                         </Item>
//                     ))
//                 }
//             </ItemBlock>
//         </ItemWrap>
//     )
// }

// export default BGItmes;

