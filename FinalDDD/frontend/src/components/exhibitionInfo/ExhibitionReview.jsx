import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import DDDApi from "../../api/DDDApi";
import AlertModal from "../../util/Alert";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .reviewBox {
        width: 50%;
        margin: 1em;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
       .rating{
        width: 350px;
        display: flex;
        justify-content: left;
        margin: 0 auto;
       }
        .textBox{
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
        input{
            width: 15rem;
            height: 1.5rem;
            border-radius: 0.3rem;
            
        }
        button {
            margin: 0;
            padding:0;
            width: 50px;
            border: none;
            border-radius: .5rem;
            background-color:#050E3D;
            color:  white;
            font-size: 1rem;
            font-weight: bold;
            height: 2rem;
        }
        &>*{
            margin: 10px;
        }
    }
    .review{
        width: 80%;
    }

`;

const Review = styled.div`
    background-color: #F4F8FF;
    display: flex;
    flex-direction: row;
    border-radius: 20px;
    margin: 1rem;
    padding: 1em;
    img{
        border-radius: 10rem;
        width: 5rem;
        height: 5rem;
        background-color: gray;
    }
    .memberInfo{
        margin-left: 3rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    .name{
        margin-top: 0.5rem;
        font-weight: bold;
        font-size: 1rem;
    }
    .comment{
        font-size: 1rem;
    }
    .imgContainer{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const ExhibitionReview = ({data}) => {
    const getId = window.localStorage.getItem("memberId");
    const isLogin = window.localStorage.getItem("isLogin");
    const exhibitNo = data.exhibitNo;

    // 별점
    const [stars, setStars] = useState(0);

    // 한줄평
    const [comment, setComment] = useState("");
    const handleCommentChange = (e) => {
        const newComment = e.target.value;
        setComment(newComment);
    };

    // 확인 모달
    const [openModal, setOpenModal] = useState(false);

    // 한줄평작성
    const handleToComment = async() =>{
        const result = await DDDApi.writeExhibitComment(getId, exhibitNo, stars, comment);
        const isOk = result.data;
        if(isOk) {
            setOpenModal(true);
            setTimeout(() => {
                comments(); // 작성 후 한줄평 리스트초기화
                setComment(""); // 한줄평 내용 초기화
                setOpenModal(false);
                comments(); // 작성 후 한줄평 리스트초기화
                setStars(0); // 별점 초기화
              }, 500); // 0.8초 후에 모달을 닫음
            }
    }

    // 엔터로도 입력가능
    const handleKeyPress = async (e) => {
        if (e.key === "Enter") {
          e.preventDefault(); // 기본 동작 막기
      
          await handleToComment(); // 비동기 동작이 완료될 때까지 대기
        }
      };
      


    // 한줄평리스트
    const [commentList, setCommentList] = useState([]);
    const comments = async() => {
        try{
            const commentsList = await DDDApi.commentList(exhibitNo);
            setCommentList(commentsList.data);
        } catch (e) {
            console.log(e);
        }
    };
    
    useEffect(() => {
        
        comments();
    }, []);



    return(

        <Container>
           {openModal && <AlertModal/>} 
        <div className="reviewBox">
            <div className="rating">
            <Stack spacing={1}>
              <Rating 
              name="half-rating"
              value={stars}
              onChange={(e, newValue) => {
                setStars(newValue);
              }} 
              precision={0.5} />
            </Stack>
            </div>
            <div className="textBox"> 
            <input 
            type="text"
            value={comment} 
            placeholder="한줄평을 남겨보세요!" 
            onChange={handleCommentChange}
            onKeyDown={handleKeyPress}/>
            <button onClick={handleToComment}  disabled={!isLogin}>입력</button>
            </div>
        </div>
        <div className="review">
                {commentList.map((e) => (
                    <Review key={e.commentNo}>
                    <div className="imgContainer">
                    <img src={e.memberPic} alt="" />
                    <div className="name">{e.memberName}</div> 
                    </div>
                    
                    <div className="memberInfo">
                    <Rating name="read-only" value={e.starRates} readOnly />         
                    <div className="comment">{e.comment}</div>
                    {/* <div>{e.booking? "예매자":null}</div> */}
                    </div>
                    
                    {/* <div>{e.like}</div> */}
                    </Review>
                ))}
        </div>
        

        </Container>
    );
}

export default ExhibitionReview;