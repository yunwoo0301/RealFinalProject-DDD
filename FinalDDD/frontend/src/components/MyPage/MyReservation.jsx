import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SlMagnifier } from 'react-icons/sl'
import ReservedDetail from './ReservedDetail';
import PageNation from '../../util/PageNation';
import DDDApi from '../../api/DDDApi';


const Container = styled.div`
  width: calc(100% - 2.5rem);
  height: 100%;
  padding-left: 2.5rem;
  /* background-color: #7bc1b2; */
  p {
    text-align: left;
    margin: 0rem 0 .3rem 0;
    font-size: .8rem;
    font-weight: bold;
  }
  .title {
    /* background-color: red; */
    height: 2.8rem;
    font-weight: bold;
  }
  .serachBox {
    padding-left: 1rem;
    width: calc(100% - 3.5rem);
    height: 3rem;
    display: flex;
    margin: 0rem 0 ;
    background-color: #F4F8FF;
    align-items: center;
    input, select {
      border: 1px solid #eee;
    }
    input:focus {
      outline: none;
    }

    span, input, select {
      margin-right: .6rem;
      font-size: .8rem;
    }
    .boldText {
      font-weight: bold;
      margin-right: 1.3rem;
    }
    select {
      width: 8rem;
      min-height: 21px;
    }
    .searchBar {
      width: 8rem;
      margin-right: .3rem;
    }
    .btn {
      font-size: .8rem;
      width: 1rem;
      height: 1rem;
      margin: 0;
      background-color: #eee;
      float: right;
      padding: .3rem;
      border-radius: 50%;
      text-align: center;
      align-items: center;
      display: flex;
      justify-content: center;
      cursor: pointer;
    }
  }
  .ticketBox {
    min-height: 600px;
    /* background-color: blue; */
    width: 100%;
  }

  .count {
    /* background-color: red; */
    height: 4rem;
    font-weight: bold;
    align-items: center;
    display: flex;
  }
`;

const MyReservation = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedState, setSelectedState] = useState('lastest');
  const getId = window.localStorage.getItem("memberId");
  // 검색을 위한 변수 설정
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookedList, setBookedList] = useState([]);

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleRadioChange = (e) => {
    setSelectedState(e.target.value);
  };
  // 검색어
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 관람임박순
    // 관람일자와 오늘 날짜를 비교하여 지난 예약은 리스트맨 끝으로 이동
    const sortBookedList = (list) => {
        return list.sort((a, b) => {
        const currentDate = new Date();
        const aVisitDate = new Date(a.visitDate);
        const bVisitDate = new Date(b.visitDate);
        if (aVisitDate < currentDate) {
            return -1; // a가 지난 예약일 경우 a 앞으로 이동
        }
        if (bVisitDate < currentDate) {
            return 1; // b가 지난 예약일 경우 b 앞으로 이동
        }
        return aVisitDate - bVisitDate; // 날짜 순서로 정렬
        });
    };


  useEffect(() => {
    const reservations = async () => {
      try {
        const reservationList = await DDDApi.myBookedList(getId);
        const sortedList = sortBookedList(reservationList.data);
        setBookedList(sortedList);
      } catch (e) {
        console.log(e);
      }
    };

    reservations();
  }, []);

  useEffect(() => {
    const filteredList = bookedList.filter((item) =>
      item.exhibitName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredList);
  }, [searchQuery, bookedList]);

  const ITEMS_PAGE = 3;

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const pageCount = Math.ceil(bookedList.length / ITEMS_PAGE);
  const offset = currentPage * ITEMS_PAGE;
  const currentPageData = filteredData.slice(offset, offset + ITEMS_PAGE);


  return (
    <Container>
      <div className="title">예약 관리</div>
      <div className="serachBox">
        <span className="boldText">구분</span>
        <input
          type="radio"
          name="searchDate"
          value="upcoming"
          onChange={handleRadioChange}
        />
        <span>관람임박순</span>
        <input
          type="radio"
          name="searchDate"
          value="lastest"
          defaultChecked
          onChange={handleRadioChange}
        />
        <span>최신순</span>
        <input
        type="radio"
        name='searchDate'
        value="search"
        onChange={() => setSelectedState('search')}/>
        <span>검색</span>

        {selectedState === "lastest" && (
          <select value={selectedValue} onChange={handleSelectChange}>
            <option value="2023">2023년</option>
            <option value="2022">2022년</option>
            <option value="2021">2021년</option>
            <option value="2020">2020년</option>
          </select>
        )}

        {selectedState === 'search' && (
        <>
            <input type="text" className='searchBar' height={'1rem'}
            value={searchQuery} onChange={handleSearchChange} />
            <div className='btn'><SlMagnifier/></div>
        </>
            )
        }
      </div>

      <div className="ticketBox">
        <ReservedDetail
          key={bookedList.bookingId}
          exhibitionData={bookedList}
          setExhibitionData={setBookedList}
          currentPageData={currentPageData}
        />
      </div>
      <div className="pageBlock">
        <PageNation pageCount={pageCount} onPageChange={handlePageClick} />
      </div>
    </Container>
  );
};

export default MyReservation;
