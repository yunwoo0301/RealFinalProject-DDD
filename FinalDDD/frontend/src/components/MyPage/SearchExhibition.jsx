import {React, useState, useEffect} from 'react';
import useStore from '../../store';
import Functions from '../../util/Functions';
import styled from 'styled-components';
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import profileImage from '../../resources/기본프로필.png';
import { DiaryApi } from '../../api/MyPageApi';
import Backdrop from '@mui/material/Backdrop';
import AlertModal from '../../util/Alert';


const SearchExhibition = () => {
    const { stealExhibition, search , setSearch, myDiaryData} =useStore(); // 데이터 받아옴.
    const [ filterExhibition, setFilterExhibition ] = useState([]);
    const [ratingStar, setRatingStar] = useState(Array(stealExhibition.length).fill(0));
    const [inputComment, setInputComment] = useState(Array(stealExhibition.length).fill(""));
    const [loading, setLoading] = useState(false);

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






    return (
        <>
        <input type="text" value={search} onChange={handleFind}/>
            {filterExhibition.map((item, index) => (
                 <div key={item.exhibitNo}>
                    {item.exhibitName}

                    <div style={{backgroundColor:'aqua'}}>
                    {ratingStar[stealExhibition.findIndex((exhibition) => exhibition.exhibitNo === item.exhibitNo)]}
                    <Stack spacing={1} className="rateStar">
                        <Rating
                            precision={0.5}
                            value={ratingStar[stealExhibition.findIndex((exhibition) => exhibition.exhibitNo === item.exhibitNo)]}
                            onChange={(e) => onChangeStar(e, item.exhibitNo)}
                        />
                        </Stack>

                    </div>
                    <div style={{backgroundColor:'aqua'}}>
                        <textarea name="" id="" cols="30" rows="10"
                            onChange={(e) => onChangeText(e, item.exhibitNo)}
                            value={inputComment[stealExhibition.findIndex((exhibition) => exhibition.exhibitNo === item.exhibitNo)]}
                        />

                    </div>

                 </div>
                ))}


        </>
    );
};

export default SearchExhibition;