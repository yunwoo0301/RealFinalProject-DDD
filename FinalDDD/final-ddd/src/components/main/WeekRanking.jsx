import React from 'react';
import styled from 'styled-components';

const WeekRankingContainer = styled.div`
  display: flex;
  margin: 1rem -1rem;
`;

const WeekRankingImage = styled.img`
  width: calc(20% - 2rem);
  margin: 1rem;
  @media (max-width: 768px) {
    width: calc(18% - 2rem);
  }
`;



const WeekRanking = () => {
  // 금주의 랭킹 이미지 배열
  const weekRankingImages = [
    "https://firebasestorage.googleapis.com/v0/b/final-ddd.appspot.com/o/%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%89%E1%85%B5%E1%84%92%E1%85%AC1.jpeg?alt=media&token=f4fa3f59-ef5a-406a-9dc7-6f4a0f3c0760&_gl=1*ynqlgj*_ga*MzE3NjcyODA1LjE2ODQyMDc5Njc.*_ga_CW55HF8NVT*MTY4NjQ5NzU1OS41LjEuMTY4NjQ5ODA1Ny4wLjAuMA..",
    "https://firebasestorage.googleapis.com/v0/b/final-ddd.appspot.com/o/%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%89%E1%85%B5%E1%84%92%E1%85%AC2.jpeg?alt=media&token=040f2f77-e447-42e9-8d5c-d9f8b8ad785a&_gl=1*vqi6u2*_ga*MzE3NjcyODA1LjE2ODQyMDc5Njc.*_ga_CW55HF8NVT*MTY4NjQ5NzU1OS41LjEuMTY4NjQ5ODA4My4wLjAuMA..",
    "https://firebasestorage.googleapis.com/v0/b/final-ddd.appspot.com/o/%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%89%E1%85%B5%E1%84%92%E1%85%AC3.jpeg?alt=media&token=0c62d83f-cad9-4931-96a4-d7d6d8e3cfa8&_gl=1*1o1nz3j*_ga*MzE3NjcyODA1LjE2ODQyMDc5Njc.*_ga_CW55HF8NVT*MTY4NjQ5NzU1OS41LjEuMTY4NjQ5ODA5Ny4wLjAuMA..",
    "https://firebasestorage.googleapis.com/v0/b/final-ddd.appspot.com/o/%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%89%E1%85%B5%E1%84%92%E1%85%AC4.jpeg?alt=media&token=65983a2b-cabf-433f-8043-f213791d6364&_gl=1*lcx369*_ga*MzE3NjcyODA1LjE2ODQyMDc5Njc.*_ga_CW55HF8NVT*MTY4NjQ5NzU1OS41LjEuMTY4NjQ5ODExMy4wLjAuMA..",
    "https://firebasestorage.googleapis.com/v0/b/final-ddd.appspot.com/o/%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%89%E1%85%B5%E1%84%92%E1%85%AC5.jpeg?alt=media&token=f3c51458-12bd-4350-a6ae-09e966e93e13&_gl=1*150mesx*_ga*MzE3NjcyODA1LjE2ODQyMDc5Njc.*_ga_CW55HF8NVT*MTY4NjQ5NzU1OS41LjEuMTY4NjQ5ODEyMi4wLjAuMA.."
  ]; 

  return (
    <WeekRankingContainer>
      {weekRankingImages.map((image, index) => (
        <WeekRankingImage key={index} src={image} alt={`Week Ranking ${index + 1}`} />
      ))}
    </WeekRankingContainer>
  );
};

export default WeekRanking;
