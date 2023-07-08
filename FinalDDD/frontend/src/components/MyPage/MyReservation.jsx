import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SlMagnifier } from 'react-icons/sl'
import ReservedDetail from './ReservedDetail';
import exhibitionData from '../exhibition/exhibitionData';
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
    .serachBox{
        padding-left: 1rem;
        width: calc(100% - 3.5rem);
        height: 3rem;
        display: flex;
        margin: 0rem 0 ;
        background-color: #F4F8FF;
        align-items: center;
        input, select{
            border: 1px solid #eee;
        }
        input:focus{
            outline: none;
        }

        span, input, select{
            margin-right: .6rem;
            font-size: .8rem;
        }
        .boldText{
            font-weight: bold;
            margin-right: 1.3rem;
        }
        select{
            width: 8rem;
            min-height: 21px;
        }
        .searchBar{
            width: 8rem;
            margin-right: .3rem;

        }
        .btn{
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
    .ticketBox{
        min-height: 600px;
        /* background-color: blue; */
        width: 100%;
    }

    .count{
        /* background-color: red; */
        height: 4rem;
        font-weight: bold;
        align-items: center;
        display: flex;


    }
`;






const MyReservation = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedState, setSelectedState] = useState('lastest')
    const getId = window.localStorage.getItem("memberId");
    // 검색을 위한 변수설정
    const [searchQuery, setSearchQuery] = useState('');


    const handleSelectChange = (e) => {
      setSelectedValue(e.target.value);
    };

    // 검색어
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };

    // 내가 한 예매리스트
    const [bookedList, setBookedList] = useState([]);

useEffect(() => {
    const reservations = async () => {
      try {
        const reservationList = await DDDApi.myBookedList(getId);
        const sortedList = reservationList.data.sort((a, b) => {
          return new Date(b.bookingDate) - new Date(a.bookingDate);
        });
        setBookedList(sortedList);
        console.log("가져오는 데이터 : ", sortedList);
      } catch (e) {
        console.log(e);
      }
    };

    reservations();
  }, []);

    //

    //보여질 페이지 Item 개수(페이지네이션)
    const ITEMS_PAGE = 3;
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };
    const pageCount = Math.ceil(bookedList.length / ITEMS_PAGE); // 전체 페이지 수
    const offset = currentPage * ITEMS_PAGE; // 현재 페이지에서 보여줄 아이템의 시작 인덱스

    // 검색어에 따라 예매 목록 필터링
    const filteredData = bookedList.filter((item) =>
    item.exhibitName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const currentPageData = filteredData.slice(offset, offset + ITEMS_PAGE);


    return (
        <>
            <Container>
                <div className='title' >예약 관리</div>
                <div className='serachBox'>
                    <span className='boldText'>구분</span>
                    <input type="radio" name="searchDate" value="lastest" defaultChecked onChange={() => setSelectedState('lastest')}/>
                    <span>최신순</span>
                    <input type="radio" name='searchDate' value="search" onChange={() => setSelectedState('search')}/>
                    <span>검색</span>
                    {
                        selectedState === 'lastest' && (
                            <select value={selectedValue} onChange={handleSelectChange}>
                            <option value="2023">2023년</option>
                            <option value="2022">2022년</option>
                            <option value="2021">2021년</option>
                            <option value="2020">2020년</option>
                            </select>)
                    }
                    {
                        selectedState === 'search' && (
                            <>
                                <input type="text" className='searchBar' height={'1rem'}
                                value={searchQuery} onChange={handleSearchChange} />
                                <div className='btn'><SlMagnifier/></div>
                            </>
                        )
                    }
                </div>
                <div className='ticketBox'>
                    <ReservedDetail exhibitionData={bookedList} currentPageData={currentPageData}/>
                </div>
                    
            <div className="pageBlock">
                <PageNation pageCount={pageCount} onPageChange={handlePageClick} />
            </div>


            </Container>
            
        </>
    );
};

export default MyReservation;