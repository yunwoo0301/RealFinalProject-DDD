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
  
`;
const CardItem = styled.div`
  /* background-color: aqua; */
  width: calc(100% - 2.5rem);
  min-width: 550px;
  height: 12rem;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid #eee;
  box-shadow: 2px 2px 10px -5px #ccc;
  margin: 1rem;
  display: flex;
  flex-direction: row;

  .exhibitionImage {
    /* background-color: red; */
    width: 24%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 80%;
      min-width: 100px;
      height: 85%;
      object-fit: cover;
      object-position: top;
      border: 1px solid #bbb;
      margin-left: 20px;
    }
  }

  .exhibitionDesc {
    /* background-color: blue; */
    width: 30%;
    min-width: 140px;
    height: 100%;
    flex-shrink: 1;
    display: flex;
    padding: 0 1rem;
    flex-direction: column;
    justify-content: center;
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
    min-width: 280px;
    height: 100%;
    display: flex;

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
      .icon {
        position: relative;
        top: 66%;
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
    "https://mblogthumb-phinf.pstatic.net/MjAyMTA0MDJfMTcx/MDAxNjE3MzQ3NzMzOTUz.Kg3bldcTe5OAoi3I-vBycTDxifu54mD9r3p-j7BNgKgg.Qunwt7JDPPe2v5HCeIlR55TtLn1HtVDhflu3wgLdY5Mg.JPEG.se413496/FB%EF%BC%BFIMG%EF%BC%BF1601135114387.jpg?type=w800";

  const memberId = Functions.getMemberId();
  const [myDiaryData, setMyDiaryData] = useState([]);
  const [countDiary, setCountDiary] = useState();
  const [mention, setMention] = useState("");
  const [inputComment, setInputComment] = useState([]);
  const [ratingStar, setRatingStar] = useState([]);

  const countCheck = () => {
    for (let key in commentAboutCount) {
      if (countDiary < key) {
        return commentAboutCount[key];
      }
    }
  };

  // console.log(myDiaryData)
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
  }, [memberId]);

  useEffect(() => {
    setCountDiary(myDiaryData.length);
    countCheck();
    setMention(countCheck());
  }, [myDiaryData]);

  // 담긴 데이터는 e.target.value로 inputComment를 업데이트
  const onChangeText = (e, index) => {
    let updatedComments = [...inputComment];
    updatedComments[index] = e.target.value;
    setInputComment(updatedComments);
  };
  const onChangeStar = (e, index) => {
    const newRatingStar = [...ratingStar];
    console.log(newRatingStar);
    console.log("처음 복사한 배열 " + newRatingStar.rateStar);
    newRatingStar[index] = e.target.value;
    console.log("타겟 밸류" + newRatingStar);

    setRatingStar(newRatingStar);
    console.log("마지막 저장값 " + ratingStar);
  };

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
      {myDiaryData && (
        <Wrap>

          <div className="count">{countDiary}</div>
          <div className="desc">{mention}</div>

          <InfiniteScroll
            dataLength={myDiaryData.length}
            // next={exhibitionData}
            hasMore={true}
            // loader={<h4>Loading...</h4>}
            style={{ width: "100%", minWidth: "600px", margin: "0" }}
          >
            {myDiaryData.map((item, index) => (
              <CardItem key={index}>
                <div className="exhibitionImage">
                  <img src={item.exhibitions.imgUrl} alt="exhibition" />
                </div>
                <div className="exhibitionDesc">
                  <div className="title">{item.exhibitions.exhibitName}</div>
                  <div className="date"> {item.regDate.slice(0, 10)}</div>
                  <Stack spacing={1} className="rateStar">
                    <Rating
                      name={`half-rating-${index}`}
                      precision={0.5}
                      onChange={(e) => onChangeStar(e, index)}
                      value={ratingStar[index]}
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
                    onChange={(e) => onChangeText(e, index)}
                    value={inputComment[index]}
                  />

                  <div className="test">
                    <div
                      className="icon"
                      onClick={() => {
                        (async () => {
                          const response = await DiaryApi.save(
                            Functions.getMemberId(),
                            item.exhibitions.exhibitNo,
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
                    >
                      <Tooltip title="저장" arrow placement="top-end">
                        <img src={iconUrl} alt="profile icon" onClick={handleOpen} />

                      </Tooltip>
                      <Backdrop
                        sx={{
                            backgroundColor: 'transparent', // 배경색을 녹색으로 설정
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
                  </div>
                </div>
              </CardItem>
            ))}
          </InfiniteScroll>
        </Wrap>
      )}
    </>
  );
};

export default MyDiary;
