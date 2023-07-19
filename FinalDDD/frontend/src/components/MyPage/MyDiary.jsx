import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { commentAboutCount } from "./Data";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import InfiniteScroll from "react-infinite-scroll-component";
import { DiaryApi } from "../../api/MyPageApi";
import Functions from "../../util/Functions";
import Backdrop from "@mui/material/Backdrop";
import AlertModal from "../../util/Alert";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useParams } from "react-router-dom";
import Loading from "../../util/Loading";
import  useStore  from '../../store'

// ====== data 확인하기 =====


const Wrap = styled.div`
  width: 100%;
  height: auto;
  /* background-color: red; */
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  p {
        text-align: left;
        margin: 0rem 0 .3rem 0;
        font-size: 1rem;
        font-weight: bold;
    }
    .count{
        /* background-color: red; */
        font-weight: bold;
        align-items: center;
        display: flex;
        margin-top: 0;
        font-size: 3rem;
    }
    .desc {
        /* background-color: blue; */
        margin: 1.0rem;
    }
    .infiniteScroll{
      @media (max-width: 1024px) {
        width: 100%;

      }
    }


`;
const CardItem = styled.div`
  /* background-color: aqua; */
  width: calc(100% - 2.5rem);
  /* min-width: 550px; */
  height: 12rem;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid #eee;
  box-shadow: 2px 2px 10px -5px #ccc;
  margin: 1rem;
  display: flex;
  flex-direction: row;
  /* @media (max-width: 1024px) {
    width: calc(100%-0.8rem);
    background-color: blue;

  } */

  .exhibitionImage {
    /* background-color: red;  */
    width: 24%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 2px solid black; */
    @media (max-width: 1024px) {
    min-width: 5rem;
    width: 35%;
    padding:0;
    margin: 0;

  }
    img {
      width: 80%;
      /* min-width: 100px; */
      height: 85%;
      object-fit: cover;
      object-position: top;
      border: 1px solid #bbb;
      margin-left: 20px;
      /* @media (max-width: 1024px) {
        margin: 0;
        min-width: rem;
        width: 50%;

  } */

    }
  }

  .exhibitionDesc {
    /* background-color: blue; */
    width: 30%;
    /* min-width: 140px; */
    height: 100%;
    flex-shrink: 1;
    display: flex;
    padding: 0 1rem;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 1024px) {
    width: 40%;
    margin: 0;

  }
    .title {
      font-weight: bold;
      font-size: 1rem;
      margin-top: 0rem;
    }
    .date {
      font-size: 0.8rem;
      margin: 1rem 0;
    }
    .rateStar {
      padding: 1rem 0;
    }
  }

  .commentBox {
    /* background-color: brown; */
    width: 50%;
    /* min-width: 220px; */
    height: 100%;
    display: flex;
    @media (max-width: 1024px) {
    width: 80%;

  }


    .textBox {
      background-color: #f2f2f2;
      width: 80%;
      height: 40%;
      border-radius: 1rem;
      padding: 1rem;
      font-size: 0.8rem;
      resize: none;
      border: 1px solid #eee;
      outline: none;
      margin: auto 0;
      border-bottom-right-radius: 0;
      @media (max-width: 1024px) {
        min-width: 4rem;

      }
    }
    .textBox:focus {
      background-color: #f4f8ff;
    }
    .writeBox {
      /* background-color: aliceblue; */
      align-items: center;
      justify-content: center;
      border-radius: 1rem;
      height: 2rem;
    }
    .test {
      /* background-color: red; */
      .deletIconBox{
        /* background-color: blue; */
        position: relative;
        top: 2%;
        left: 0%;
      }
      .icon {
        position: relative;
        top: 45%;
        left: -50%;
        /* background-color: blue; */
        width: 2.5rem;
        height: 2.5rem;
        background-size: cover;
        cursor: pointer;
        img {
          height: 100%;
          width: 100%;
          border-radius: 2rem;
        }
      }
    }
  }
`;

const MyDiary = () => {
  const iconUrl =
    "https://firebasestorage.googleapis.com/v0/b/real-final-project-ddd.appspot.com/o/%EA%B8%B0%EB%B3%B8%ED%94%84%EB%A1%9C%ED%95%84.png?alt=media&token=7d664c18-037d-4e60-9415-32f26fb0d430";
    const {stealExhibition} = useStore();

  // const memberId = Functions.getMemberId();
  const {memberId} = useParams();
  const [myDiaryData, setMyDiaryData] = useState([]);
  const [countDiary, setCountDiary] = useState();
  const [mention, setMention] = useState("");

  const [ratingStar, setRatingStar] = useState(Array(stealExhibition.length).fill(0));
  const [inputComment, setInputComment] = useState(Array(stealExhibition.length).fill(""));
  const [loading, setLoading]= useState(true);

  const countCheck = () => {
    for (let key in commentAboutCount) {
      if (countDiary < Number(key)) {
        return commentAboutCount[key];
      }
    }
    return "당신은 전시 전문가! 하산하세요";
};

  console.log(myDiaryData)

  useEffect(() => {
    const infoFetchDate = async () => {
      const response = await DiaryApi.info(memberId);

      const newMyDiaryData = response.data;
      setMyDiaryData(newMyDiaryData);
      console.log(newMyDiaryData); // 작동

      const newComments = stealExhibition.map((exhibition) => {
        // Find the diary with the same exhibitNo
        const diary = newMyDiaryData.find((item) => item.exhibitions.exhibitNo === exhibition.exhibitNo);
        // console.log(diary) // 작동

        // If such a diary exists, use its comment. Otherwise, use the existing comment.
        return diary ? diary.comment : inputComment[stealExhibition.indexOf(exhibition)];
      });

      setInputComment(newComments);
      console.log(newComments); // 작동함
      console.log(inputComment)

      const newStar = stealExhibition.map((exhibition) => {
        // Find the diary with the same exhibitNo
        const diary = newMyDiaryData.find((item) => item.exhibitions.exhibitNo === exhibition.exhibitNo);

        // If such a diary exists, use its comment. Otherwise, use the existing comment.
        return diary ? diary.rateStar : ratingStar[stealExhibition.indexOf(exhibition)];
      });

      setRatingStar(newStar);
      console.log(newStar); // 작동함.
      setLoading(false)
    };
    infoFetchDate();
  }, [memberId]);




  useEffect(() => {
    setCountDiary(myDiaryData.length);
    countCheck();
    setMention(countCheck());
  }, [myDiaryData]);

  // 담긴 데이터는 e.target.value로 inputComment를 업데이트

// star 핸들러
const onChangeStar = ((event, value, exhibitNo) => {
  console.log('별표 작동시작');
  // stealExhibition의 데이터중 exhibitNo와 입력중인 exhibitNo가 같은 index를 찾음.
  const index = stealExhibition.findIndex((diary) => diary.exhibitNo === exhibitNo);

  // 일치하는 diary가 없는 경우 아무런 동작도 하지 않습니다.
  if (index === -1) {
    return;
  }

  // 일치하는 diary의 comment를 업데이트합니다.
  const newRatingStar = [...ratingStar];
  newRatingStar[index] = Number(value);
  setRatingStar(newRatingStar);
});


// 텍스트 변경 핸들러
const onChangeText = ((e, exhibitNo) => {
  // console.log('wkf wkr동함?')
// stealExhibition의 데이터중 exhibitNo와 입력중인 exhibitNo가 같은 index를 찾음.
const index = stealExhibition.findIndex((diary) => diary.exhibitNo === exhibitNo)


// 일치하는 diary가 없는 경우 아무런 동작도 하지 않습니다.
if (index === -1) {
return;
}

// 일치하는 diary의 comment를 업데이트합니다.
const newComments = [...inputComment];
newComments[index] = e.target.value;
setInputComment(newComments);
});


  // backdrop openState
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
    setTimeout(handleClose, 1000)
  };

//   console.log(stealExhibition)
//   console.log(ratingStar)
//   console.log(myDiaryData)
//   console.log(stealExhibition)
console.log(stealExhibition.exhibitNo)


  return (
    <>

    { loading ? <Loading/>: (
        <Wrap>
            <div className="count">{countDiary}</div>
            <div className="desc">{mention}</div>
            <InfiniteScroll
                className="infiniteScroll"
                    dataLength={myDiaryData.length}
                    // next={exhibitionData}
                    hasMore={true}
                    // loader={<h4>Loading...</h4>}
                    style={{ width: "100%",  margin: "0"}}
                    // style={{ width: "100%", minWidth: "600px", margin: "0" }}
            >
            { stealExhibition.map((exhibition, index) => {

                 const diaryData = myDiaryData.filter((item) => item.exhibitions.exhibitNo === exhibition.exhibitNo);

                 return diaryData.map((item, index) => (
                <CardItem key={index}>
                    <div className="exhibitionImage">
                        <img src={item.exhibitions.imgUrl} alt="exhibition" />
                    </div>
                    <div className="exhibitionDesc">
                        <div className="title">{item.exhibitions.exhibitName}</div>
                        <div className="date">{item.regDate.slice(0, 10)}</div>
                        <Stack spacing={1} className="rateStar">
                        <Rating
    precision={0.5}
    value={ratingStar[stealExhibition.findIndex((diary) => diary.exhibitNo === item.exhibitions.exhibitNo)] || 0}
    onChange={(event, value) => onChangeStar(event, value, item.exhibitions.exhibitNo)}
/>


                        </Stack>
                    </div>

                    <div className="commentBox">
                        <textarea
                            className="textBox"
                            name=""
                            id=""
                            cols="20"
                            rows="8"
                            onChange={(e) => onChangeText(e, item.exhibitions.exhibitNo)}
                            value={inputComment[stealExhibition.findIndex((diary) => diary.exhibitNo === item.exhibitions.exhibitNo)] || ''}
                            />

                    { memberId == Functions.getMemberId() ? (

                        <div className="test">
                            <Tooltip title="Delete">
                                <IconButton className="deletIconBox" onClick={()=>{
                                   (async () => {
                                    const response = await DiaryApi.delete(
                                        memberId,
                                        item.exhibitions.exhibitNo,
                                    );
                                    if (response.status === 200) {
                                        handleOpen();
                                        console.log("Diary successfully saved!");
                                    } else {
                                        console.error("Failed to save diary");
                                    }
                                })();


                                }}>
                                    <DeleteIcon fontSize='small' />
                                </IconButton>
                            </Tooltip>
                            <div
                                className="icon"
                                onClick={() => {
                                (async () => {
                                    const response = await DiaryApi.save(
                                    Functions.getMemberId(),
                                    item.exhibitions.exhibitNo,
                                    ratingStar[stealExhibition.findIndex((diary) => diary.exhibitNo === item.exhibitions.exhibitNo)],
                                    inputComment[stealExhibition.findIndex((diary) => diary.exhibitNo === item.exhibitions.exhibitNo)],
                                    );
                                    if (response.status === 200) {
                                    console.log("Diary successfully saved!");
                                    } else {
                                    console.error("Failed to save diary");
                                    }
                                })();
                                }}
                            >

                                <Tooltip title="저장" arrow placement="top-end">
                                <img src={iconUrl} alt="profile icon" onClick={handleOpen} />

                                </Tooltip>
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
                                </div>
                        </div>) : null }



                    </div>
              </CardItem>


                 ))

            })}




            </InfiniteScroll>

        </Wrap>)}
    </>

  )
}


export default MyDiary;
