import React from "react";
import styled,{css} from "styled-components";


const Container = styled.div`
    width: 15rem;
    height: 20rem;
    border: 1px solid #eee;
    border-radius: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1.5rem;
    .imgBox{
        overflow: hidden;
        width: 10rem;
        height: 15rem;
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
        height: 5rem;
        .title{
            height: 3rem;
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
    @media (max-width: 768px) {
        width: 100%;
        height: 70%;
        margin: 0;
        padding: 0;
        border: none;
    .imgBox {
      width: 100%; /* 이미지를 한 줄에 하나씩 보이도록 설정 */
    }
    .textBox{
        height: 2rem;
        .title{
            font-size: 0.8rem;
            margin-bottom: 1rem;
        }
        .location{
            font-size: 0.7rem;
        }
        .date{
           font-size: 0.7rem;
        }
    }
  }

    ${({ selectedOption }) =>
    selectedOption === "리스트" &&
    css`
    width: 50rem;
    height: 15rem;
    border: 1px solid #eee;
    border-radius: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    .imgBox{
        overflow: hidden;
        width: 10rem;
        height: 15rem;
        position: relative;
        background-image: url(${props => props.imgUrl});
        background-repeat: no-repeat;
        background-size: contain;
    }
    .textBox{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 7rem;
        .title{
            width: 100%;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 2.5rem;

        }

    }
    &>*{
        margin: 2rem;
    }
    `}

`;

const InfoBox = ({data,selectedOption,onClick}) => {

    const handleClick = () => {
        onClick();
    }

    return (
        <Container selectedOption={selectedOption} imgUrl={data.imgUrl} onClick={handleClick}>
          <div className="imgBox"></div>
          <div className="textBox">
          <div className="title">
      {window.innerWidth > 768 ? (
        selectedOption ? (
          <p>{data.exhibitName}</p>
        ) : (
          <>
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
          </>
        )
      ) : (
        <p>{data.exhibitName}</p>
      )}
    </div>
            {window.innerWidth > 768 ? ( <div className="date">{data.startDate} ~ {data.endDate}</div>)
            : (<div className="date">{data.startDate} ~ <br/> {data.endDate}</div>)}
            <div className="location">{data.exhibitLocation}</div>
          </div>
        </Container>
      );

}

export default InfoBox;