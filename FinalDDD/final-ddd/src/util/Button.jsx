import React from "react";
import styled from "styled-components";

export const Btn =styled.button`
background-color: ${props => (!props.disabled ? '#050E3D' : '#b0abab')};
color :${props => (!props.disabled ? '#ffffff' : '#050E3D')};
border: none;
border-radius : 5px;
width: 100%;
height: 100%;
font-weight: bold;
cursor: pointer;

&.kakaoBtn {
    width: 100%;
    background-color: yellow;
    color: #050E3D;
}

&.btn {
    width: 30rem;
}
`;
const Button =  ({onClick, children, disabled, className}) => {

    return(
        <>
        <Btn onClick={onClick} disabled={disabled} className={className}>{children}</Btn>
        </>
    ); 

}


export default Button;