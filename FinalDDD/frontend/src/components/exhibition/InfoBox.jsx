import React from "react";
import styled,{css} from "styled-components";
const Container = styled.div`
    width: 250px;
    height: 400px;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    .imgBox{
        overflow: hidden;
        width: 200px;
        height: 320px;
        position: relative;
        background-image: url(${props => props.imgUrl});
        background-repeat: no-repeat;
        background-size: cover;
        margin-bottom: 1rem;
    }
    .textBox{
        display: flex;
        flex-direction: column;
        text-align: center;
        height: 100px;
        .title{
            height: 50px;
            font-size: 1rem;
            font-weight: bold;
        }
        &>*{
            margin-bottom: 0.3rem;
        }
        .location{
            font-size: 0.8rem;
        }
        .date{
            font-size: 0.9rem;
        }
    }

    ${({ selectedOption }) =>
    selectedOption === "리스트" &&
    css`
    width: 800px;
    height: 300px;
    border: 1px solid #eee;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    margin: 20px;
    .imgBox{
        overflow: hidden;
        width: 200px;
        height: 280px;
        position: relative;
        background-image: url(${props => props.imgUrl});
        background-repeat: no-repeat;
        background-size: contain;
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
    `} 
`
const InfoBox = ({data,selectedOption,onClick}) => {

    const handleClick = () => {
        onClick();
    }

    return(

        <Container selectedOption={selectedOption} imgUrl ={data.imgUrl} onClick={handleClick}>
        <div className="imgBox" >
        </div>
        <div className="textBox">
            <div className="title">
            {data.exhibitName.length > 19 ? (
            <p>
              {data.exhibitName.slice(0, 20)}
              <br />
              {data.exhibitName.slice(20)}
            </p>
              ) : (
            <p>
            {data.exhibitName}
            {data.exhibitName.length < 10 && <br />}
            &nbsp;
          </p>
          )}
            </div>
            <div className="date">{data.startDate} ~ {data.endDate}</div>
            <div className="location">{data.exhibitLocation}</div>
        </div>
        </Container>
    );
}

export default InfoBox;