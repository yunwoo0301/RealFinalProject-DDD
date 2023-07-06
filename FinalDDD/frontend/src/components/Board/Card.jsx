import React from "react"
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdPin, IoMdEye } from "react-icons/io";
import { useState, useEffect } from "react";
import PageNation from "../../util/PageNation";
import DDDApi from "../../api/DDDApi";
import { Link } from "react-router-dom";


const CardContainer = styled.div`
    max-width: 100vw;
    display: grid;
    grid-template-columns: repeat(auto-fit, 22.2em); // 반복(자동맞춤, 1fr 크기)  카드 이미지 추후 변경 예정
    justify-content: center;
    margin: 2rem;
    gap: 1rem;
    transition: width 1s, height 1s;
    

    * {
        margin: 2rem;
        box-sizing: border-box;
        margin: 0;
        padding:0;
    }
    .container {
        overflow: hidden; /* 영역을 벗어날 시 가려짐 */
        box-shadow: 0 1px 2px 0px;
        background-color: #ffffff;
        text-align: center;
        border-radius: 1rem;
        position: relative;
        margin: 0.8rem;
        cursor: pointer;
    }

    .img_area {
    .cardimage {
        width: 100%; 
        height: 11rem; 
    }
}

    .region, .cardtitle, .cardnickname, .datearea {
        text-align: left;
        margin-left: 1rem;
        margin: .4rem;
        font-size: 1em;
        font-weight: bold;
    }
    
    .viewarea, .replyarea {
        margin-left: .2em; // 아이콘과 숫자 사이 여백
        margin-top: .2em; // 아이콘 옆 숫자 위치
        font-size: 1em;
        
    }

    .icon-container {
        /* border-top: 2px solid #ccc; */
        display: flex;
        justify-content: flex-end;
        margin-right: 1.5rem;

        .icon {
        margin-left: 1.2rem;
        font-size: 1.6rem;   
        }
    }
    .writebtn {
        display: flex;
        margin-bottom: 1em 0em ;
    
        button {
            margin: -1em 1em ;
            margin-left: auto;
            font-size: .9em;
            padding: .5em 2em;
            border-radius: 10px;
            background-color: #050E3D;
            color: white;
            border: none;
            transition: all .1s ease-in;
            cursor: pointer;
            font-weight: bold;
        }
    }
`;

const SelectBox = styled.select`
    width: 100px;
    height: 30px;
    float: right;
    display: flex;
    margin-right: 17em;
    option{
        font-size: 20px;
    }

    @media (max-width: 768px) {
    margin-right: 8em;
    
    }
 `; 



const Card = () => {    

    const navigate = useNavigate();
    const [selectedRegion, setSelectedRegion] = useState("");
    const [filterRegion, setFilterRegion] = useState([]);

    const [boardList, setBoardList] = useState([]); // boardList 불러오기


    //보여질 페이지 Item 개수(페이지네이션)
    const ITEMS_PAGE = 8;
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const offset = currentPage * ITEMS_PAGE; // 현재 페이지에서 보여줄 아이템의 시작 인덱스
    const currentPageData = filterRegion.slice(offset, offset + ITEMS_PAGE);
    const pageCount = Math.ceil(filterRegion.length / ITEMS_PAGE); // 전체 페이지수


    // 동행찾기 게시글 정보 받기(** 자역별 필터정보로 수정 ** )
    useEffect(() => {
        const fetchData = async () => {
          try {
            const category = '동행찾기'; // 조회할 카테고리 이름 지정
            const response = await DDDApi.getFreeBoardsByCategory(category);
            setBoardList(response.data);
            setFilterRegion(response.data); // 지역별 필터링 추가
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);
    
    
    
    
      const handleRegionChange = (event) => {
        const selectedRegion = event.target.value;
        setSelectedRegion(selectedRegion);
      
        console.log(selectedRegion);
      
        // 선택된 지역에 해당하는 데이터를 필터링하여 업데이트
        const filteredData = boardList.filter((item) => {
          return selectedRegion ? item.region === selectedRegion : true;
        });
      
        setFilterRegion(filteredData);
      };
       


    

    // 글쓰기 버튼 클릭 시 게시판 작성페이지로 이동
    const onClickToWrite = () => {
        const link = "write/"
        navigate(link);
    }


    return(
        <>
        <SelectBox value={selectedRegion} onChange={handleRegionChange}>
            <option value="">전체</option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
            <option value="인천">인천</option>
            <option value="충청">충청</option>
            <option value="강원">강원</option>
            <option value="경상도">경상도</option>
            <option value="전라도">전라도</option>
            <option value="제주">제주</option>
        </SelectBox>
        <CardContainer> 
            {currentPageData.map((data, index) => (
                <div className="container" key={index}>
                <Link to={`/boardList/boardView/${data.boardNo}`} className="boardView_link" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="img_area">
                    <img src={data.image} alt="CardImage" className="cardimage" />
                </div>
                
                <div className="region">
                    <IoMdPin style={{fontSize:'1.2em', color:'#528BF9'}}/>{data.region}
                </div>
                <h3 className="cardtitle">{data.title}</h3>
                <div className="cardnickname">{data.author}</div>
                <div className="datearea">{data.writeDate.substring(0, 10)}</div>
                
                <div className="icon-container">
                    <IoMdEye className="icon" style={{color:'#686565'}} /> 
                    <div className="viewarea">{data.views}</div>
                    <IoChatbubbleEllipses className="icon" style={{color:'#2468ee'}} />
                    {data.reply && <div className="replyarea">{data.reply}</div>} 
                </div>
                </Link>
            </div>
            
        ))}
      </CardContainer> 
       <PageNation pageCount={pageCount} onPageChange={handlePageClick} />
       <div className="writebtn">
            <button onClick={onClickToWrite}>글쓰기</button>
        </div>
      </>
    )
};
export default Card;