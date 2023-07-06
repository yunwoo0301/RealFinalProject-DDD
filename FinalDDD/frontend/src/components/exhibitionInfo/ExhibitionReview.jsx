import React, { useEffect, useState } from "react";
import profile from "./../../resources/프로필.png";
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
            width: 300px;
            height: 30px;
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
            height: 35px;
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
        border-radius:100px;
        width: 100px;
        height: 100px;
        margin-right: 30px;
        background-color: gray;
    }
    .memberInfo{
        display: flex;
        flex-direction: column;
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
                setComment(""); // 한줄평 내용 초기화
                setOpenModal(false);
                setStars(0); // 별점 초기화
                // 등록되자마자 리스트 업데이트
                comments();
              }, 500); // 0.8초 후에 모달을 닫음
            }
    }

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
            onChange={handleCommentChange}/>
            <button onClick={handleToComment} disabled={!isLogin}>입력</button>
            </div>
        </div>
        <div className="review">
                {commentList.map((e) => (
                    <Review key={e.commentNo}>
                    <img src={e.memberPic} alt="" />
                    <div>
                    <div className="memberInfo">
                    <Rating name="read-only" value={e.starRates} readOnly />         
                    <div>{e.memberName}</div>        
                    {/* <div>{e.booking? "예매자":null}</div> */}
                    </div>
                    <div>{e.comment}</div>
                    {/* <div>{e.like}</div> */}
                    </div>  
                    </Review>
                ))}
        </div>
        

        </Container>
    );
}

export default ExhibitionReview;