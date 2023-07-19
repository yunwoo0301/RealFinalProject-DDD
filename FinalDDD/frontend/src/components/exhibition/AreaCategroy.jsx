import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  width: 30em;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  select {
    border: none;
    margin-bottom: 0.6rem;
  }
  @media (max-width: 768px) {
    justify-content: flex-end;
    margin-top: 1rem;
  }
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    color: #050e3d;

  }

  ${props =>
    props.active &&
    css`
      color: #5EADF7;
      font-weight: bold;
    `}
`;

const categories = ['서울', '경기', '인천', '충청', '강원', '전북', '전남', '광주', '경북', '경남', '부산', '제주'];

const AreaCategroy = ({ onSelect, category }) => {
  const handleClick = categoryName => {
    onSelect(categoryName);
  };

  const handleSelectChange = e => {
    const selectedCategory = e.target.value;
    onSelect(selectedCategory);
  };

  return (
    <>
      <Container>
        {window.innerWidth <= 768 ? (
          <select value={category} onChange={handleSelectChange}>
            {categories.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        ) : (
          <>
            {categories.map(c => (
              <Category
                key={c}
                active={category === c}
                onClick={() => handleClick(c)}
              >
                {c}
              </Category>
            ))}
          </>
        )}
      </Container>
    </>
  );
};

export default AreaCategroy;
