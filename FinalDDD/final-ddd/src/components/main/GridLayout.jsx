import React from 'react';
import styled from 'styled-components';
import { DisplayData } from './DisplayData';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  margin-top: 5.2rem;
  text-align: center;
  >h2{
    font-size: 1.3rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  grid-template-columns: repeat(4, 1fr);
  gap: 0.2rem;
  width: 100vw;
  height: 80vh;
  background-color: #050E3D;
`;

const GridItem = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: #fff;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
  flex-direction: row;

  &.large {
    grid-row: span 4;
    grid-column: span 2;
  }

  &.medium {
    grid-row: span 3;
    grid-column: span 2;
  }

  & > img {
    width: 70%;
    height: 80%;
    object-fit: contain;
  }

  & > .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);

    & > .overlay {
      opacity: 1;
    }
  }

  & > .overlay > .name {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const GridComponent = () => {
    const {t} = useTranslation();
  // Like가 높은 순서로 DisplayData를 정렬
  const sortedData = [...DisplayData].sort((a, b) => b.like - a.like);

  // 상위 4개의 데이터를 선택
  const topFourData = sortedData.slice(0, 4);

  return (
    <Container>
      <h2>{t('오늘의랭킹')}</h2>
      <GridContainer>
        {topFourData.map((data, index) => (
          <GridItem
            key={index}
            className={index === 0 || index === 2 ? 'large' : 'medium'}
          >
            <h4>{index+1}{t('위')}</h4>
            <img src={data.imgUrl} alt={data.name} />
            <div className="overlay">
              <div className="name">{data.name}</div>
            </div>
          </GridItem>
        ))}
      </GridContainer>
    </Container>
  );
};

export default GridComponent;
