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

const Container = styled.div`
    margin-top: 10rem;
    .header { 
        width: 100%;
        height: 170px;
    }
    .apiBox {
        width: 70%;
        height: 250px;
        border: 3px solid #eee;
        margin: 0 auto;
        border-radius:5px;
       
    }
    .category{
        margin: 10px;
    }
    .section{
        border: 1px solid #050E3D;
        width: 70%;
        margin : 0 auto;
        position: relative;
        padding-top: 2em;
        border-radius:5px;
        .select{
            position: absolute;
            right: 5px;
            top: 5px;
        }

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
    .imgBoxs{
        display: flex;
        flex: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    @media (max-width: 768px) {
    width: 768px;

  }

`;
const HeaderStyle = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;
`;




const ExhibitListPage = () => {
    // 전시 목록보기
    const [exhibitionList, setExhibitionList] = useState([]);
    //셀렉트박스 상태관리
    const [selectedOption, setSelectedOption] = useState('');
     //메뉴 바 상태 관리 
    const [category,setCategory] = useState('menu1');
    //카테고리 배열
    const categories = [
      {name :'menu1',text : '인기순'},
      {name :'menu2',text : '장소/지역'},
      {name :'menu3',text : '최신순'}]
     //보여질 페이지 개수
   const ITEMS_PAGE = 12;
   const [currentPage, setCurrentPage] = useState(0);
   const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
    const onSelect = useCallback(category => {
        setCategory(category);
        setCurrentPage(0);
    },[]);

    // 전시리스트 불러오기
    useEffect(() => {
      const exhibitions = async () => {
        try {
          const exhibitListData = await DDDApi.exhibitionList();
          setExhibitionList(exhibitListData.data);
        } catch(e) {
          console.log(e);
        }
      }
      exhibitions();
    }, []);

   
    useEffect(() => {
        if (category === "menu1") {
        // 인기순 데이터로 리셋
        setFilteredData(exhibitionList);
              
        } else if (category === "menu2") {
          setAreaCategory("서울");
          const areaData = exhibitionList.filter((item) =>
            item.region.includes(areaCategory)
          );
          setFilteredData(areaData);
          
        } else {
          // 최신순 데이터로 리셋
          const dateData = [...exhibitionList].sort((a, b) => {
            const dateA = new Date(a.startDate);
            const dateB = new Date(b.startDate);
            return dateB - dateA;
          });
          setFilteredData(dateData);
        }
      }, [category, exhibitionList]);

     //필터 데이터 
   const [filteredData, setFilteredData] = useState([]);
    //지역 메뉴바 상태관리 
    const [areaCategory,setAreaCategory] = useState('서울');
    const AreaOnSelect = useCallback(areaCategory =>{ 
        setAreaCategory(areaCategory);
        if(category === 'menu2'){
            const areaData = exhibitionList.filter(item=> item.region.includes(areaCategory))
            setFilteredData(areaData);
            console.log(areaData);
        }
      
    },[category]);

  const pageCount = Math.ceil(filteredData.length / ITEMS_PAGE); // 전체 페이지 수
  const offset = currentPage * ITEMS_PAGE; // 현재 페이지에서 보여줄 아이템의 시작 인덱스
  const currentPageData = filteredData.slice(offset, offset + ITEMS_PAGE);

  const [modalOpen,setModalOpen] = useState(false);
  const closeModal =() => {
    setModalOpen(false);
   
  }
  //선택한 전시 정보 상태 관리 
  const [selectEx, setSelectEx] = useState('');
  const exClick=(selectEx) => { 
    setModalOpen(true);
    setSelectEx(selectEx);
   
  }
    return(
      <>
      <HeaderStyle>
      <Header/>
      </HeaderStyle>
        <Container>
          
        <div className="apiBox">
            <Carousel data={exhibitionList}/>
        </div>
        <div className="category">
            <Categroy category={category} onSelect={onSelect}categories={categories}/>
        </div>
        <div className="section">
            {category==='menu2' &&
            <div className="areaSelectBox">
            <AreaCategroy category={areaCategory} onSelect={AreaOnSelect}/>
            </div>
            }
            <div className="select">
            <SelectBtn selectedOption={selectedOption} setSelectedOption={setSelectedOption} options={['갤러리','리스트']} />
            </div>
            <div className="imgBoxs">
            {currentPageData.map((data) => (
            <InfoBox key={data.exhibitNo} data={data}  selectedOption={selectedOption} onClick={()=>exClick(data)}/>
            ))}
            </div>
            <PageNation pageCount={pageCount} onPageChange={handlePageClick} selected={currentPage+1}  />
        </div>
        <InfoModal open={modalOpen} close={closeModal}> <ClickInfoBox data={selectEx}/></InfoModal>
        </Container>
        </>
    );
}

export default ExhibitListPage;