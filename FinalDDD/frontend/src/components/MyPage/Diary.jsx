import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SlArrowRight } from "react-icons/sl";
import useStore from "../../store";

const DiaryBox = styled.div`
  width: 100%;
  height: 36%;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  position: relative;
  /* overflow: hidden; */

  .title {
    display: block;
    align-items: left;
    margin: 1.2rem 0 0 2.5rem;
    font-size: 1rem;
    font-weight: bold;
  }
`;

const DiaryImage = styled.div`
  /* background-color: blue; */
  width: auto;  // 자동 너비 설정
  height: 100%;  // 높이를 부모의 100%로 설정
  display: flex;
  align-items: center;
  overflow-x: auto;  // 가로 스크롤 설정
  overflow-y: hidden;
  white-space: nowrap;  // 모든 요소를 한 줄로 표시
  padding-left: 2rem;
  cursor: pointer;

  .textBox{

    /* min-width: 140px; */

    /* height: 200px; */
    margin-right: 1rem;
    img{
      width: 8rem;
    height: 11rem;
      border: 1px solid #f2f2f2;

    }
  }
  ::-webkit-scrollbar {
    display: none; 
  }
`;
const NothingBlock = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
/* background-color: red; */
img{
  width: auto;
  height: 6rem;
  margin-bottom: 1rem;
}

  
`;

const Diary = () => {
  const { setShowPage, myDiaryData  } = useStore();
  console.log(myDiaryData)

  function scrollHorizontally(e) {
    e.preventDefault();
    this.scrollLeft += (e.deltaY + e.deltaX) * 0.4;
  }
  

  const diaryImageRef = useRef();

  useEffect(() => {
    const scrollElement = diaryImageRef.current;

    if (scrollElement) {
      scrollElement.addEventListener('wheel', scrollHorizontally);

    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('wheel', scrollHorizontally);

      }
    };
  }, []);

  const chorong = "https://mblogthumb-phinf.pstatic.net/20121029_83/cho823300_13514752090280QztN_JPEG/naver_com_20121029_104128.jpg?type=w2"

  
  return (
    <>
      <DiaryBox>
        <p
          className="title"> 다이어리 </p>
                  

            <DiaryImage ref={diaryImageRef} onClick={() => { setShowPage("다이어리");}}>
              { myDiaryData.length > 1 ?
                ( myDiaryData.map((item, index) => (
                  <div className="textBox" key={index}>
                    {/* <div className="image22"> {item.diaryId}</div> */}
                    <img src={item.exhibitions.imgUrl} alt="exhibition" className="image" />
                  </div>
                ))) :
                (
                  <NothingBlock> 
                    <img src={chorong} alt="" /> 
                    <div>다녀온 전시회를 평가해주세요!😉</div>
                  </NothingBlock>
                )
              }
            </DiaryImage>
      </DiaryBox>
    </>
  );
};

export default Diary;