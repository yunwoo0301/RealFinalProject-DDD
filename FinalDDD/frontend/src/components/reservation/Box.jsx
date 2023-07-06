import React from "react";
import styled from "styled-components";
import Input from "./Input";
import { useState } from "react";

const Container = styled.div`

    
    width: 400px;
    border: 1px solid #eee;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    
    .header{
        height: 50px;
        background-color: #eee;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        position: relative;
        
        .text{
            font-weight: bold;
            position: absolute;
            left : 20px;
            top : 15px;
        }

        button{
            position: absolute;
            background-color:rgb(0,0,0,0);
            border : none;
            cursor: pointer;
            right: 10px;
            top: -10px;
        }
    }
    .inputBox{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: white;
    }
    
`;
const Box = ({header,inputName, type}) => {
    const [click,setClick] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    return(
        <Container>
        <div className="header">
        <div className="text">{header}</div>
        {click ? 
        <button onClick={()=>setClick(false)}>▼</button>
        :
        <button onClick={()=>setClick(true)}>▲</button>}
        </div>
        {click && type ==="input" && 
        <div className="inputBox">
            {inputName.map((e) => (
                <Input name ={e}/>
            ))}
        </div>}
        {click && type ==="price" && 
        <div className="inputBox">
            <input type="radio" />모바일티켓
            <input type="radio" />현장수령

        </div>}
        {click && type ==="ticket" && 
        <div className="inputBox">
            {inputName.map((e) => (
                <Input name ={e}/>
            ))}
        </div>}
    
        </Container>
    );
}

export default Box;