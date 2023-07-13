import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import DDDApi from "../../api/DDDApi";
import AlertModal from "../../util/Alert";
import Backdrop from "@mui/material/Backdrop";
import PageNation from "../../util/PageNation";


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
const ExhibitionReview = ({ data }) => {
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
    const openToModal = () => {
        setOpenModal(true);
    }

    const closeToModal = () => {
        setOpenModal(false);
    }
    // 한줄평작성
    const handleToComment = async () => {
      if (comment.trim() === "") {
        return; // 빈 문자열이면 함수 종료
      }
      const result = await DDDApi.writeExhibitComment(getId, exhibitNo, stars, comment);
      const isOk = result.data;
      if (isOk) {
        setOpenModal(true);
        comments(); // 작성 후 한줄평 리스트초기화
        setTimeout(() => {
          setComment(""); // 한줄평 내용 초기화
          setOpenModal(false);
          setStars(0); // 별점 초기화
        }, 500); // 0.8초 후에 모달을 닫음
      }
    };

    // 한줄평리스트
    const [commentList, setCommentList] = useState([]);
    const comments = async () => {
      try {
        const commentsList = await DDDApi.commentList(exhibitNo);
        setCommentList(commentsList.data);
      } catch (e) {
        console.log(e);
      }
    };

    useEffect(() => {
      comments();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault(); // 폼의 기본 동작 막기
      await handleToComment(); // 한줄평 작성
    };

    // 페이지네이션
    //보여질 페이지 개수
    const ITEMS_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const pageCount = Math.ceil(commentList.length / ITEMS_PAGE); // 전체 페이지 수
    const offset = currentPage * ITEMS_PAGE; // 현재 페이지에서 보여줄 아이템의 시작 인덱스
    const currentPageData = commentList.slice(offset, offset + ITEMS_PAGE);


    return (
      <Container>
        {openModal &&
        <Backdrop
        sx={{
            backgroundColor: 'transparent',
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            top: 0, // 팝업을 상단에 위치
        }}
        open={openToModal}
        onClick={closeToModal}
        >
            <AlertModal />
        </Backdrop>
        }
        <div className="reviewBox">
          <div className="rating">
            <Stack spacing={1}>
              <Rating
                name="half-rating"
                value={stars}
                onChange={(e, newValue) => {
                  setStars(newValue);
                }}
                precision={0.5}
              />
            </Stack>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="textBox">
              <input
                type="text"
                value={comment}
                placeholder="한줄평을 남겨보세요!"
                onChange={handleCommentChange}
              />
              <button type="submit" disabled={!isLogin || comment.trim() === ""}>
                입력
              </button>
            </div>
          </form>
        </div>
        <div className="review">
          {currentPageData.map((e) => (
            <Review key={e.commentNo}>
              <div className="imgContainer">
                <img src={e.memberPic} alt="" />
                <div className="name">{e.memberName}</div>
              </div>

              <div className="memberInfo">
                <Rating name="read-only" value={e.starRates} readOnly />
                <div className="comment">{e.comment}</div>
              </div>
            </Review>
          ))}
        </div>
        <PageNation pageCount={pageCount} onPageChange={handlePageClick} selected={currentPage+1}  />
      </Container>
    );
  };

  export default ExhibitionReview;
