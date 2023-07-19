import React, { useCallback, useState } from "react";
import styled from "styled-components";
import SelectBtn from "../components/exhibition/SelectBtn";
import InfoBox from "../components/exhibition/InfoBox";
import Categroy from '../components/exhibition/Category';
import PageNation from "../util/PageNation";
import AreaCategroy from "../components/exhibition/AreaCategroy";
import Carousel from "../util/Carousel";
import { useEffect } from "react";
import InfoModal from "../components/exhibition/InfoModal";
import ClickInfoBox from "../components/exhibition/ClickInfoBox";
import DDDApi from "../api/DDDApi";
import Header from "../components/header/Header";
import {FiSearch} from "react-icons/fi";

const Container = styled.div`
    .header {
        width: 100%;
        height: 170px;
    }
    .apiBox {
        width: 70%;
        height: 250px;
        /* border: 3px solid #eee; */
        margin: 0 auto;
        border-radius:5px;

    }
    .category{
        margin-top: 2rem;
    @media (max-width: 768px) {
      margin-top: 3rem;
    }
    }
    .section{
        /* border: 1px solid #050E3D; */
        width: 70%;
        margin : 0 auto;
        position: relative;
        padding-top: 2em;
        border-radius:5px;
        .select{
            position: absolute;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            right: 5px;
            top: 5px;
            @media (max-width: 768px) {
                  justify-content: center;
                }
            .searchBox{
              margin-right: 1rem;
              display: flex;
              flex-direction: row;
              @media (max-width: 768px) {
                  margin-left: 2rem;
                  margin-bottom: 1rem;
                }
              .searchBar{
                margin-right: 0.5rem;
                width: 12rem;
                border: 1px solid #eee;
                @media (max-width: 768px) {

                }
              }
              .searchIcon{
                cursor: pointer;
                text-align: center;
                color: #fff;
                width: 1rem;
                height: 1rem;
                padding: 0.3rem;
                border-radius: 100%;
                background-color: #5EADF7;
              }
            }
        }
        /* @media (max-width: 768px) {
        width: 40%;
      } */
    }
    .areaSelectBox{
        display: flex;
        flex-direction: row;
        cursor: pointer;
        & > *{
            margin-left: 10px;
            font-size:20px;
        }
    }


  .imgBoxs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    // 미디어 쿼리
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-top: 1rem;
    }


  }


`;




const ExhibitListPage = () => {
  // 전시목록
  const [exhibitionList, setExhibitionList] = useState([]);
  // 셀렉트박스(갤러리, 리스트)
  const [selectedOption, setSelectedOption] = useState('');
  // 카테고리
  const [category, setCategory] = useState('menu1');
  // 검색
  const [searchName, setSearchName] = useState('');
  // 검색한 내용다시
  const [filteredData, setFilteredData] = useState([]);
  // 지역
  const [areaCategory, setAreaCategory] = useState('서울');
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectEx, setSelectEx] = useState('');

  const categories = [
    { name: 'menu1', text: '인기순' },
    { name: 'menu2', text: '장소/지역' },
    { name: 'menu3', text: '최신순' }
  ];
  const ITEMS_PAGE = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exhibitListData = await DDDApi.exhibitionList();
        setExhibitionList(exhibitListData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (category === 'menu1') {
      setFilteredData(exhibitionList);
    } else if (category === 'menu2') {
      const areaData = exhibitionList.filter((item) =>
        item.region.includes(areaCategory)
      );
      setFilteredData(areaData);
    } else {
      // 최신순으로 정렬
      const dateData = [...exhibitionList].sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);
        return dateB - dateA;
      });
      setFilteredData(dateData);
    }
  }, [category, exhibitionList, areaCategory]);

  const handleChangeExhibition = (e) => {
    setSearchName(e.target.value);
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  // 전시검색
  const searchExhibitions = () => {
    const searchTerm = searchName.toLowerCase();
    return filteredData.filter((exhibition) =>
      exhibition.exhibitName.toLowerCase().includes(searchTerm)
    );
  };

  const filteredExhibitions = searchExhibitions();
  const pageCount = Math.ceil(filteredExhibitions.length / ITEMS_PAGE);
  const offset = currentPage * ITEMS_PAGE;
  const currentPageData = filteredExhibitions.slice(offset, offset + ITEMS_PAGE);

  const closeModal = () => {
    setModalOpen(false);
  };

  const exClick = (selectEx) => {
    setModalOpen(true);
    setSelectEx(selectEx);
  };

  const onSelect = useCallback((category) => {
    setCategory(category);
    setCurrentPage(0);
  }, []);

  const AreaOnSelect = useCallback(
    (areaCategory) => {
      setAreaCategory(areaCategory);
      if (category === 'menu2') {
        const areaData = exhibitionList.filter((item) =>
          item.region.includes(areaCategory)
        );
        setFilteredData(areaData);
      }
    },
    [category, exhibitionList]
  );

  return (
    <>
      <Header />
      <Container>
        <div className="apiBox">
          <Carousel data={exhibitionList} />
        </div>
        <div className="category">
          <Categroy category={category} onSelect={onSelect} categories={categories} />
        </div>
        <div className="section">
          {category === 'menu2' && (
            <div className="areaSelectBox">
              <AreaCategroy category={areaCategory} onSelect={AreaOnSelect} />
            </div>
          )}
          <div className="select">
            <SelectBtn selectedOption={selectedOption} setSelectedOption={setSelectedOption} options={['갤러리', '리스트']} />
            <div className="searchBox">
              <input className="searchBar" type="text" value={searchName} onChange={handleChangeExhibition} />
              <div className="searchIcon">
                <FiSearch />
              </div>
            </div>
          </div>
          <div className="imgBoxs">
            {currentPageData.map((data) => (
              <InfoBox key={data.exhibitNo} data={data} selectedOption={selectedOption} onClick={() => exClick(data)} />
            ))}
          </div>
          <PageNation pageCount={pageCount} onPageChange={handlePageClick} selected={currentPage + 1} />
        </div>
        <InfoModal open={modalOpen} close={closeModal}>
          <ClickInfoBox data={selectEx} />
        </InfoModal>
      </Container>
    </>
  );
};

export default ExhibitListPage;
