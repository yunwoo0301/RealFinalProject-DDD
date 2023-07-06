import React from "react";
import styled from "styled-components";
import Button from "../../util/Button";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    background-color: #F4F8FF;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    .imgBox{
        overflow: hidden;
        width: 300px;
        height: 350px;
        position: relative;
        background-image: url(${props => props.imgUrl});
        background-repeat: no-repeat;
        background-size: cover;
       
    }
    .textBox{
        display: inline-block;
        .title{
            font-size: 2rem;
            font-weight: bold;
        }
        &>*{
            margin-bottom: 10px;
        }
        .btn{
            margin-top: 30px;
            width: 200px;
            height: 40px;
        }
    }

    &>*{
        margin: 20px;
    }
    @media (max-width: 900px) {
        height: 250px;
        .imgBox{
            height: 240px;
        }
        .textBox{
            width: 60%;
            .title{
                font-size: 1.8rem;
            }
        }
        
    }

`;
const ClickInfoBox = ({data}) => {
    const navigate = useNavigate();
    const handleClick = (data) => {
        navigate(`/exhibitInfo/${data.exhibitNo}`)
    }
    return(
        <Container imgUrl ={data.imgUrl}>
        <div className="imgBox" >
        </div>
        <div className="textBox">
            <div className="title">{data.exhibitName}</div>
            <div>{data.startDate} ~ {data.endDate}</div>
            <div>{data.exhibitLocation}</div>
            <div className="btn"><Button onClick={()=>handleClick(data)}>상세정보</Button></div>
            
        </div>
        </Container>
    );
}

export default ClickInfoBox;