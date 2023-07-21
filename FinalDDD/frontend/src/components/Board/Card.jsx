import React from "react"
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdPin, IoMdEye } from "react-icons/io";
import { useState, useEffect } from "react";
import PageNation from "../../util/PageNation";
import DDDApi from "../../api/DDDApi";

const Wrapper = styled.div` // 동행찾기 게시판 전체 컨테이너 영역
    box-sizing: border-box;
//    width: 100vw;
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .writebtn {
        display: flex;
        margin-bottom: 1em;
        width: 75%;
        justify-content: flex-end; // 버튼을 오른쪽으로 정렬
        margin-right: 10em;

        button {
            margin: -1em 1em ;
            font-size: .9em;
            padding: .5em 2em;
            border-radius: 20px;
            background-color: #050E3D;
            color: white;
            border: none;
            transition: all .1s ease-in;
            cursor: pointer;
            font-weight: bold;
        }

        @media(max-width:768px) {
            width: 100%;
            justify-content: flex-end; // 버튼을 오른쪽으로 정렬
            margin-right: 0;
    }
}

`;

const CardContainer = styled.div` // 전체 카드아이템 컨테이너
    max-width: 80em;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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
    .container { // 카드아이템 컨테이너
        overflow: hidden; /* 영역을 벗어날 시 가려짐 */
        box-shadow: 0 1px 2px 0px;
        background-color: #ffffff;
        text-align: center;
        border-radius: 1rem;
        position: relative;
        margin: 0.8rem;
        cursor: pointer;
        height: auto; // 내용물에 따라 높이 자동 조절

    }

    .img_area {
        width: 100%;
        height: 15rem;
        position:relative;
        top:0;


    .cardimage {
        width: 100%;
        height: 100%;
        object-fit: cover;


    }
}

    .cardinfo { // 카드정보 영역(지역, 제목, 작성자, 작성일)
        height: 8rem;

        .region, .cardtitle, .cardnickname, .datearea {
        text-align: left;
        margin-left: 1rem;
        margin: .4rem;
        font-size: 1em;
        font-weight: bold;
    }

    .viewarea, .commentarea {
        margin-left: .2em; // 아이콘과 숫자 사이 여백 */
        margin-top: .2em; // 아이콘 옆 숫자 위치
        font-size: 1em;
    }

}

    .icon-container { /* 조회수 댓글 영역 */
        display: flex;
        justify-content: flex-end;
        margin-right: 1.5rem;

        .icon {
        margin-left: 1.2rem;
        font-size: 1.4rem;
        }
    }

    @media(max-width:768px) {
        width: 80%;

        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); // 수정사항

        .card-image {
    }
}
`;


const SelectWrapper = styled.div`
    width: 80em;

    @media (max-width: 768px) {
        width: 100%;
        float: right;
    }

`;

const SelectBox = styled.select`
    width: 6rem;
    height: 2rem;
    display: flex;
    float: right;

    option{
        font-size: 1.2em;
    }

    @media (max-width: 768px) {
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
            const category = 'DDDmate'; // 조회할 카테고리 이름 지정
            const response = await DDDApi.getFreeBoardsByCategory(category);
            const filteredData = response.data.filter(boardList => boardList.category === category);
            setBoardList(filteredData);
            setFilterRegion(filteredData); // 지역별 필터링 추가
            console.log(filteredData);
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
        const isLogin = window.localStorage.getItem("isLogin");
        const getId = window.localStorage.getItem("memberId");
        console.log(isLogin);
        console.log(getId);

        if (isLogin === "true") {
            const link = "write/";
            navigate(link);
        } else {
            alert("로그인 완료 시 작성 진행 가능합니다.");
            navigate('/login');
        }
    };

    // 게시글 상세 페이지로 이동
    const boardDetailClick = (boardNo) => {
        navigate(`/boardList/boardView/${boardNo}`);
        };



    return(

        <Wrapper>
        <SelectWrapper>
            <SelectBox value={selectedRegion} onChange={handleRegionChange}>
                <option value="">전체</option>
                <option value="서울">서울</option>
                <option value="경기">경기</option>
                <option value="인천">인천</option>
                <option value="충청">충청</option>
                <option value="강원">강원</option>
                <option value="전북">전북</option>
                <option value="전남">전남</option>
                <option value="광주">광주</option>
                <option value="경북">경북</option>
                <option value="경남">경남</option>
                <option value="부산">부산</option>
                <option value="제주">제주</option>
            </SelectBox>
        </SelectWrapper>
        <CardContainer>
        {currentPageData.map((data, index) => (
            <div className="container" key={index} onClick={() => boardDetailClick(data.boardNo)}
            style={{ cursor: 'pointer' }}>
                <div className="img_area">
                    <img src={data.image} alt="CardImage" className="cardimage" />
                </div>
                <div className = "cardinfo">
                    <div className="region">
                        <IoMdPin style={{fontSize:'1.2em', color:'#528BF9'}}/>{data.region}
                    </div>

                    <h3 className="cardtitle">{data.title}</h3>
                    <div className="cardnickname">{data.author}</div>
                    <div className="datearea">{data.writeDate.substring(0, 10)}</div>
                </div>

                <div className="icon-container">
                    <IoMdEye className="icon" style={{color:'#686565'}} />
                    <div className="viewarea">{data.views}</div>
                    <IoChatbubbleEllipses className="icon" style={{color:'#55aafa'}} />
                    {data.commentCount && <div className="commentarea">{data.commentCount}</div>}
                </div>
            </div>
        ))}
    </CardContainer>
    <PageNation pageCount={pageCount} onPageChange={handlePageClick} />
    <div className="writebtn">
        <button onClick={onClickToWrite}>글쓰기</button>
    </div>
</Wrapper>

    )
};
export default Card;