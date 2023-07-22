import React, { useEffect, useMemo, useState } from 'react';
import  useStore  from '../../store'
import Functions from '../../util/Functions';
import styled from 'styled-components';
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import profileImage from '../../resources/기본프로필.png';
import { DiaryApi } from '../../api/MyPageApi';
import Backdrop from '@mui/material/Backdrop';
import AlertModal from '../../util/Alert';
import SearchExhibition from './SearchExhibition';

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    /* background-color: aqua; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;



    .progressBlock{
      width: 100%;
      height: auto;
      background-color: #c2c2c2;
      position: sticky;
      top: -1%;
      z-index: 1;
      .progressBar {
        width: 100%;
        height: 1.5rem;
        background-color: black;
      }
    }
    .wrap{
        /* background-color: blue; */
        padding: 2rem;
        width: 70%;
        min-width: 250px;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr); // 3개의 카드 아이템을 행으로 정렬
        /* grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); */

        grid-gap: 4rem 2rem; // 카드 아이템들 사이의 간격
        justify-items: center; // 아이템들을 행 방향으로 중앙에 위치시킴


      @media (max-width: 1280px) {
      grid-gap: 4rem 1rem; // 카드 아이템들 사이의 간격.
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      /* width: 20%; */
      justify-content: center;
      padding: 0;
      margin: 0;
    }




}
`;
const CardItem = styled.div`
    width: 240px;
    height: 360px;
    /* width: 240px;
    height: 360px;   */

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
        width: 85%;
        height: 40%;
        position: absolute;
        top: 60%;
        padding: 1rem;
        .title{
            font-size: 0.8rem;
            width: 70%;
            height: 2rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            /* background-color: red; */

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

  const { stealExhibition, search , setSearch, myDiaryData, setMyDiaryData } = useStore();
  const [ filterExhibition, setFilterExhibition ] = useState([]);
  const [ratingStar, setRatingStar] = useState(Array(stealExhibition.length).fill(0));
  const [inputComment, setInputComment] = useState(Array(stealExhibition.length).fill(""));
  const [loading, setLoading] = useState(false);
  const memberId = Functions.getMemberId();

  const updateCommentsAndStars = (exhibitions, diaryData) => {
    const newComments = exhibitions.map((exhibition) => {
      const diary = diaryData.find((item) => item.exhibitions.exhibitNo === exhibition.exhibitNo);
      return diary ? diary.comment : '';
    });
    setInputComment(newComments);

    const newStar = exhibitions.map((exhibition) => {
      const diary = diaryData.find((item) => item.exhibitions.exhibitNo === exhibition.exhibitNo);
      return diary ? diary.rateStar : 0;
    });
    setRatingStar(newStar);
  }

  // 초기 값 설정
useEffect(() => {
  updateCommentsAndStars(stealExhibition, myDiaryData);
  setLoading(true);
}, []);

useEffect(() => {
  const infoFetchDate = async () => {
    const response = await DiaryApi.info(memberId);

    const newMyDiaryData = response.data;
    setMyDiaryData(newMyDiaryData);

    updateCommentsAndStars(stealExhibition, newMyDiaryData);
    setLoading(false);
  };
  infoFetchDate();
}, [memberId, search, filterExhibition]);


// 검색 부분
const handleFind = (e) => {
  const currentWord = e.target.value;
  setSearch(currentWord);
};

useEffect(() => {
  const filterSearch = stealExhibition.filter((item) =>
      item.exhibitName.toString().includes(search.toString())
  );
  setFilterExhibition(filterSearch);
}, [search, stealExhibition]);

// 별점 수정
const onChangeStar = (e, exhibitNo) => {
const newRatingStar = [...ratingStar];
  // stealExhibition의 데이터중 exhibitNo와 입력중인 exhibitNo가 같은 index를 찾음.
  const index = stealExhibition.findIndex((exhibition) => exhibition.exhibitNo === exhibitNo);

  // 일치하는 diary가 없는 경우 아무런 동작도 하지 않습니다.
  if (index === -1) {
    return;
  }

newRatingStar[index] = Number(e.target.value); // 숫자로 변환
setRatingStar(newRatingStar);
// console.log(ratingStar)
};


// 텍스트 핸들링
const onChangeText = (e, exhibitNo) => {
const newComments = [...inputComment]; //불변성의 원칙으로 새로운 배열 생성
// stealExhibition의 데이터중 exhibitNo와 입력중인 exhibitNo가 같은 index를 찾음.
const index = stealExhibition.findIndex((exhibition) => exhibition.exhibitNo === exhibitNo);
// 일치하는 diary가 없는 경우 아무런 동작도 하지 않습니다.
if (index === -1) {
return;
}

// 일치하는 diary의 comment를 업데이트합니다.
newComments[index] = e.target.value;
setInputComment(newComments);
};

  // backdrop openState
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
    setTimeout(handleClose, 1000)
  };

  useEffect(() => {
      const updateProgressBar = () => {
        const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercentage = (scrollPosition / scrollTotal) * 100;

        document.querySelector('.progressBar').style.width = `${scrollPercentage}%`;
      };

      window.addEventListener('scroll', updateProgressBar);

      return () => {
        window.removeEventListener('scroll', updateProgressBar);
      };
    }, []);



    return (
      <>
      <SearchExhibition/>

      <Container>
        <>
                    <div className='progressBlock'>
                      <div className='progressBar'/>
                    </div>
            <div className="wrap">
           {filterExhibition.map((item, index) => {
                return (
                    <CardItem key={item.exhibitNo}>
                    <BlackBG/>
                    <img src={item.imgUrl} alt="" />
                    <div className="desc">
                        <div className="title">{item.exhibitName}</div>
                        <Stack spacing={1} className="rateStar">
                        <Rating
                            precision={0.5}
                            value={ratingStar[stealExhibition.findIndex((exhibition) => exhibition.exhibitNo === item.exhibitNo)]}
                            onChange={(e) => onChangeStar(e, item.exhibitNo)}
                        />
                        </Stack>
                        <div className='textBox'>
                        <textarea className='comment' name="" id="" cols="18" rows="2"
                            onChange={(e) => onChangeText(e, item.exhibitNo)}
                            value={inputComment[stealExhibition.findIndex((exhibition) => exhibition.exhibitNo === item.exhibitNo)]}
                        />
                        <div className="saveIcon"
                         onClick={() => {
                            (async () => {
                              const response = await DiaryApi.save(
                                Functions.getMemberId(),
                                item.exhibitNo,
                                ratingStar[stealExhibition.findIndex((exhibition) => exhibition.exhibitNo === item.exhibitNo)],
                                inputComment[stealExhibition.findIndex((exhibition) => exhibition.exhibitNo === item.exhibitNo)]
                              );
                              if (response.status === 200) {
                                handleOpen();
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
            <Backdrop
            sx={{
                backgroundColor: 'transparent', // 배경색을 투명으로 설정
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                top: 0, // 팝업을 상단에 위치
            }}
            open={open}
            onClick={handleClose}
            >
                <AlertModal />
            </Backdrop>
        </>
        </Container>
      </>


    );
};
export default RateDiary;
