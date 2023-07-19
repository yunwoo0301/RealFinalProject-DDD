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

const Container = styled.div`
    width: 100%;
    height: auto;
    /* background-color: aqua; */
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {

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

  const { stealExhibition, search , setSearch, myDiaryData} =useStore(); // 데이터 받아옴.
  const [ filterExhibition, setFilterExhibition ] = useState([]);

    // ratingStar와 inputComment 상태 정의
    const [ratingStar, setRatingStar] = useState(Array(stealExhibition.length).fill(0));
    const [inputComment, setInputComment] = useState(Array(stealExhibition.length).fill(""));
    const [loading, setLoading] = useState(false);
    const memberId = Functions.getMemberId();

     // 처음에 myDiaryData에 있던 값 합치기
     useEffect(()=>{ // 마운트 되면
      const newComments = stealExhibition.map((exhibition) => {
        // 다이어리 and 전시회리스트에서 exhibitNo가 같은 값 찾기
        const diary = myDiaryData.find((item) => item.exhibitions.exhibitNo === exhibition.exhibitNo);
        // diary = { memberId: 1, diaryId: 19, regDate: '2023-07-19T14:49:57.558976', rateStar: 5, comment: '김포 다도 박물관 0329', …}
        // 같은 값을 찾았으면, 이걸 가지고 comment에 넣음
        return diary ? diary.comment : inputComment[stealExhibition.indexOf(exhibition)];
      });
      setInputComment(newComments); // 받아온 데이터의 comment만 업데이트
      // console.log(inputComment) // 0: "김포 다도 박물관 0329" 1: "" ...

      const newStar = stealExhibition.map((exhibition) => {
        const diary = myDiaryData.find((item) => item.exhibitions.exhibitNo === exhibition.exhibitNo);
        // console.log(diary) // 0: "김포 다도 박물관 0329" 1: "" ...

        return diary ? diary.rateStar : ratingStar[stealExhibition.indexOf(exhibition)];

      });
      setRatingStar(newStar);
      // console.log(ratingStar) // / 0: 5 1:0 ...
      setLoading(true)
    },[])


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

console.log(inputComment)


useEffect(() => {
const newComments = stealExhibition.map((exhibition) => {
const diary = myDiaryData.find((item) => item.exhibitions.exhibitNo === exhibition.exhibitNo);
return diary ? diary.comment : '';
});
setInputComment(newComments);

const newStar = stealExhibition.map((exhibition) => {
const diary = myDiaryData.find((item) => item.exhibitions.exhibitNo === exhibition.exhibitNo);
return diary ? diary.rateStar : 0;
});
setRatingStar(newStar);
}, [filterExhibition, search]);

  // backdrop openState
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
    setTimeout(handleClose, 1000)
  };


    return (


        <>
                <input type="text" value={search} onChange={handleFind}/>
 <Container>
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
        </Container>
        </>
    );
};
export default RateDiary;
