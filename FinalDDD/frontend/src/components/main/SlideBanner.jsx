import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import DDDApi from '../../api/DDDApi';


const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  .title{
    text-align: center;
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    color: #050E3D;
  }

  .RollDiv {
    margin: 0 auto;
    width: 100vw;
    height: 50vh;
    overflow: hidden;
  }
  .RollDiv > div {
    display: flex;
    animation: slideAnimation 20s linear infinite;
  }
  .RollDiv > div > a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .RollDiv > div > a > img {
    width: 15rem;
    height: 20rem;
    margin: 0 1rem;
  }

  .RollDiv > div > a > p {
    font-weight: bold;
    font-size: 1rem;
  }

  @keyframes slideAnimation {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;
const RollDiv = () => {
  const { t } = useTranslation();
  const [exhibitionList, setExhibitionList] = useState([]);
  console.log("anchors" + exhibitionList[0]?.imgUrl);

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setExhibitionList((prevList) => {
        const updatedList = [...prevList.slice(1), prevList[0]];
        return updatedList;
      });
    }, 10000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  // 전시리스트 불러오기
  useEffect(() => {
    const exhibitions = async () => {
      try {
        const exhibitListData = await DDDApi.exhibitionList();
        setExhibitionList(exhibitListData.data);
        console.log("전시리스트 + ", exhibitListData.data);
        console.log("첫번째 리스트" + exhibitListData.data[0]?.imgUrl);
      } catch (e) {
        console.log(e);
      }
    };
    exhibitions();
  }, []);

  return (
    <SlideContainer>
      <div className="title">
        <h2>{t('추천전시')}</h2>
      </div>
      <div className="RollDiv">
        <div>
          {exhibitionList.map((exhibition) => (
            <a key={exhibition.exhibitNo} href={exhibition.href}>
              <img src={exhibition.imgUrl} alt="전시사진" />
              {exhibition.exhibitName.length > 15 ? (
            <p>
              {exhibition.exhibitName.slice(0, 15)}
              <br />
              {exhibition.exhibitName.slice(15)}
            </p>
              ) : (
            <p>
            {exhibition.exhibitName}
            {exhibition.exhibitName.length < 15 && <br />}
            &nbsp;
          </p>
          )}
            </a>
          ))}
        </div>
      </div>
    </SlideContainer>
  );
};

export default RollDiv;
