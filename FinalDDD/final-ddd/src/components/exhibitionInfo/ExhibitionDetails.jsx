import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    .textBox{
        width: 100%;
            &>*{
                margin-top: 1rem;
                }
    }
    .title {
        font-size: 1.5em;
        font-weight: bold;
        
    }
    .period{
            font-size: 1rem;
            font-weight: bold;
            color: #585656;
        }
    .price {
        font-size: 1rem;
        color: #585656;
    }
    img{
        width: 90%;
    }
    .imgBox{
        text-align: center;
    }
`;
const ExhibitionDetails = ({data}) => {

    // 날짜형식 바꾸기
    
    const formatDate = (dateStr) => {
        const year = dateStr.toString().substring(0, 4);
        const month = dateStr.toString().substring(4, 6);
        const day = dateStr.toString().substring(6, 8);
        return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
      };
    

    return(
        <>
        {data &&
        <Container>
        <div className="textBox">
        <div className="title">전시시간 정보</div>
        <div className="period">{formatDate(data.startDate)} ~ {formatDate(data.endDate)}</div>
        <div className="price">{data.exhibitPrice} </div>
        </div>
        <div className="imgBox">
        <img src={data.imgUrl} alt="상세정보" />
        </div>
        
        </Container>
        }
        </>
    );
}

export default ExhibitionDetails;