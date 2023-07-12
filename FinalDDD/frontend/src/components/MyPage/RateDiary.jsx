import React, { useEffect, useMemo, useState } from 'react';
import  useStore  from '../../store'
import Functions from '../../util/Functions';
import styled from 'styled-components';
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import profileImage from '../../resources/기본프로필.png';
import { DiaryApi } from '../../api/MyPageApi';
import { debounce } from 'lodash';

const Container = styled.div`
    width: 100%;
    height: auto;
    /* background-color: aqua; */
    display: flex;
    justify-content: center;
    .wrap{
        /* background-color: blue; */
        padding: 2rem;
        width: 70%;
        min-width: 980px;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr); // 3개의 카드 아이템을 행으로 정렬
        grid-gap: 4rem 2rem; // 카드 아이템들 사이의 간격
        justify-items: center; // 아이템들을 행 방향으로 중앙에 위치시킴
    
        
}
`;
const CardItem = styled.div`
    width: 240px;
    height: 340px;  
    /* width: 300px;
    height: 400px;   */
    background-color: white;
    position: relative;
    border-radius: 0.8rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);

    img{
        width: 100%;
        height: 60%;
        object-fit: cover;
        border-radius: inherit;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .desc{
        /* background-color: orange; */
        width: 100%;
        height: 40%;
        position: absolute;
        top: 60%;
        padding: 1rem;
        .title{
            font-size: 0.8rem;
            width: 90%;
            font-weight: bold;
            margin-bottom: 0.5rem;
            /* background-color: aliceblue; */
        }
        .rateStar{
            margin-bottom: 0.6rem;
        }
        .textBox{
            display: flex;
            flex-direction: row;
            margin: 0;
            /* background-color: blue; */

            .comment{
            background-color: #f2f2f2;
            resize: none;
            border: 1px solid #eee;
            outline: none;
            border-radius: 0.2rem;
            padding: 0.3rem;
            
            }
            .comment:focus {
                background-color: #f4f8ff;
            }
            .comment::-webkit-scrollbar {
                    display: none; /* 크롬, 사파리, 오페라, 엣지 */
                }

        .saveIcon{
            position: relative;
            top: 0%;
            left: -0%;
            /* background-color: blue; */
            width: 2.5rem;
            height: 2.5rem;
            background-size: cover;
            cursor: pointer;

            img {
                height: 100%;
                width: 100%;
                border-radius: 2rem;
                margin-left: 0.5rem;
                
            }
    }

}

}
&:hover{
    box-shadow: 0 3px 10px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.22);
       
}
`;
const BlackBG = styled.div`
    width: 100%;
    height: 60%;
    background-color: black;
    opacity: 0.5;
    position: absolute;
    top: 0%;
    border-radius: inherit;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;

`;

const RateDiary = () => {

    const {stealExhibition} = useStore();
    const [myDiaryData, setMyDiaryData] = useState([]);
    // console.log(stealExhibition)
    const memberId = Functions.getMemberId();

    useEffect(() => {
        const infoFetchDate = async () => {
          const response = await DiaryApi.info(memberId);

          const newMyDiaryData = response.data;
          setMyDiaryData(newMyDiaryData);
          console.log(newMyDiaryData);
          // inputComment에 데이터를 일단 전부 다 담음.
          const comments = newMyDiaryData.map((item) => item.comment);
          setInputComment(comments);
          console.log(inputComment);
    
          const stars = newMyDiaryData.map((item) => item.rateStar);
    
          setRatingStar(stars);
          console.log(ratingStar);
        };
        infoFetchDate();
      }, []);



    //   const onChangeText = (e, index) => {
    //     let updatedComments = [...inputComment];
    //     updatedComments[index] = e.target.value;
    //     setInputComment(updatedComments);
    //   };

    //   const onChangeStar = (e, index) => {
    //     const newRatingStar = [...ratingStar];
    //     console.log(newRatingStar);
    //     console.log("처음 복사한 배열 " + newRatingStar.rateStar);
    //     newRatingStar[index] = e.target.value;
    //     console.log("타겟 밸류" + newRatingStar);
    
    //     setRatingStar(newRatingStar);
    //     console.log("마지막 저장값 " + ratingStar);
    //   };

    //   const diaryByExhibitNo = myDiaryData.reduce((acc, diary) => {
    //     acc[diary.exhibitions.exhibitNo] = diary;
    //     return acc;
    //   }, {});
    
// ratingStar와 inputComment 상태 정의
const [ratingStar, setRatingStar] = useState(Array(stealExhibition.length).fill(0));
const [inputComment, setInputComment] = useState(Array(stealExhibition.length).fill(""));

// 별점 변경 핸들러
const onChangeStar = (e, index) => {
  const newRatingStar = [...ratingStar];
  newRatingStar[index] = Number(e.target.value); // 숫자로 변환
  setRatingStar(newRatingStar);
};

// 텍스트 변경 핸들러
const onChangeText = ((e, index) => {
    const newComments = [...inputComment];
    newComments[index] = e.target.value;
    setInputComment(newComments);
  }); 

// exhibitNo를 키로 하는 myDiaryData 객체 변환
const diaryByExhibitNo = myDiaryData.reduce((acc, diary) => {
    acc[diary.exhibitions.exhibitNo] = diary;
    return acc;
  }, {});

  // `stealExhibition`에서 `myDiaryData.exhibitions.exhibitNo`와 일치하는 항목을 제거
const filteredExhibition = stealExhibition.filter(item => !diaryByExhibitNo.hasOwnProperty(item.exhibitNo));
console.log(diaryByExhibitNo)


    return (

        
        <>
 <Container>
            <div className="wrap">
           {filteredExhibition.map((item, index) => {
                return (
                    <CardItem key={index}>
                    <BlackBG/>
                    <img src={item.imgUrl} alt="" />
                    <div className="desc">
                        <div className="title">{item.exhibitName}</div>
                        <Stack spacing={1} className="rateStar">
                        <Rating
                            precision={0.5}
                            value={ratingStar[index]}
                            onChange={(e) => onChangeStar(e, index)}
                        />
                        </Stack>
                        <div className='textBox'>
                        <textarea className='comment' name="" id="" cols="18" rows="2" 
                            onChange={(e) => onChangeText(e, index)} 
                            value={inputComment[index]}
                        />
                        <div className="saveIcon" 
                         onClick={() => {
                            (async () => {
                              const response = await DiaryApi.save(
                                Functions.getMemberId(),
                                item.exhibitNo,
                                ratingStar[index],
                                inputComment[index]
                              );
                              if (response.status === 200) {
                                console.log("Diary successfully saved!");
                              } else {
                                console.error("Failed to save diary");
                              }
                            })();
                          }}
                        ><img src={profileImage} alt="" /></div>
                        </div>
                    </div>
                    </CardItem>
                );
                })}
            </div>
        </Container>
        </>
    );
};
export default RateDiary;
