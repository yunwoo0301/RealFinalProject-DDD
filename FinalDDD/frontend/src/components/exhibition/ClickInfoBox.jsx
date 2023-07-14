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
        width: 40%;
        height: 20rem;
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

    @media (max-width: 768px) {
        .imgBox{
            width: 100%;
        }
        .textBox {
            text-align: center;
        .title{
            margin-top: 2rem;
            font-size: 1rem;
            text-align: center;
        }
        .date{
            font-size: 0.3rem;
        }
        .btn{
            width: 4rem;
            height: 2rem;
            margin: 0 auto;
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
            {window.innerWidth > 768 ? ( <div className="date">{data.startDate} ~ {data.endDate}</div>)
            : (<div className="date">{data.startDate} ~ <br/> {data.endDate}</div>)}

            <div>{data.exhibitLocation}</div>
            <div className="btn"><Button onClick={()=>handleClick(data)}>상세정보</Button></div>
            
        </div>
        </Container>
    );
}

export default ClickInfoBox;