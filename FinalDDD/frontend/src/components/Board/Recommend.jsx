import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import BoardSearch from "./BoardSearch";
import PageNation from "../../util/PageNation";
import DDDApi from "../../api/DDDApi";
import { Link } from "react-router-dom";


const BoardContainer = styled.div`
    width: 75em;
    height: 100vh;
    background-color: white;
    margin: 0 auto;
    border-radius: 10px;

`;

const Section = styled.div`
    width: 100%;
    height: calc(100vh - 40px);
    float: center;
    position: relative;

    .board_box {
        margin: 1rem;

        a {
            font-size: 1.1rem;
            color: inherit;
            text-decoration: none; // 제목 링크 시 밑줄 제거
         }
    }

    table {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: lighter;
        border-collapse: collapse;
        width: 100%;
        background-color: #4555AE;
        border-bottom: solid 1px #4555AE;
        text-align: center;
        table-layout: fixed;

        th{padding: 10px 6px; color: white; background-color: #050E3D;}

        tr{
            background-color: white;
            &:nth-child(2n) td, &:nth-child(2n){
                background-color: #fbfbfb;
            }
        }

        td {
            padding: 10px 6px;
            background-color: white;
            border-left: solid 1px #bbb;
            border-top: solid 1px #ddd;
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        // 미디어쿼리 적용 시 작성자 이후 부터 안보이도록 설정
        @media (max-width: 768px) {
          td:nth-child(5), th:nth-child(5), td:last-child, th:last-child {
            display: none;
          }
        }

        th:first-child, td:first-child {border-left: none; width: 70px;} // 글번호(열)
        td:first-child, td:nth-child(5), td:last-child { letter-spacing: -1px;}
        th:nth-child(2), td:nth-child(2) {width: 70px; letter-spacing: -.4px;} // 카테고리(열)
        td:nth-child(3) {text-align: center;} // 제목(열)
        th:nth-child(4), td:nth-child(4){width: 120px;} // 작성자(열) 크기 조절
        th:nth-child(5), td:nth-child(5){width: 60px;} // 조회수(열)
        th:last-child, td:last-child{width: 100px;} // 작성일(열)

        tr:hover, tr:hover td, tr:hover a {

            color: #4555AE;
            background-color: #efefef;
            cursor: pointer;
        }
        .bi-heart-fill {
            padding-right:5px;
            color:#FC5C7D;
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
            border-radius: 20px;
            background-color: #050E3D;
            color: white;
            border: none;
            transition: all .1s ease-in;
            cursor: pointer;
            font-weight: bold;
        }
    }

    @media (max-width: 768px) {
      width: 768px;
      min-width: 400px;
  }


`;



const Recommend = () => {

    const navigate = useNavigate();

    //  값을 불러오기위해 선언, 목록보기
    const [boardList, setBoardList] = useState([]); // boardList 불러오기
    const [noResults, setNoResults] = useState(false); // ** 추가

    const handleSearch = (boardList) => {
        if (boardList.length === 0) {
            setNoResults(true);
        } else {
            setBoardList(boardList); // 검색 결과를 상태로 설정
            setNoResults(false);
            setCurrentPage(0);
        }
    };


    //보여질 페이지 Item 개수(페이지네이션)
    const ITEMS_PAGE = 13;
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const offset = currentPage * ITEMS_PAGE; // 현재 페이지에서 보여줄 아이템의 시작 인덱스
    const currentPageData = boardList.slice(offset, offset + ITEMS_PAGE);
    const pageCount = Math.ceil(boardList.length / ITEMS_PAGE); // 전체 페이지수


    // 자유게시판(boardList) 추천수다 목록 불러오기
    useEffect(() => {
        const fetchData = async () => {
          try {
            const category = 'Recommend'; // 조회할 카테고리 이름 지정
            const response = await DDDApi.getFreeBoardsByCategory(category);
            const filteredData = response.data.filter(boardList => boardList.category === category);
            setBoardList(filteredData);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        };

        fetchData();
      }, []);


    // 비로그인 시 작성페이지 접근 제한
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
            navigate('/login'); // 로그인 화면으로 이동 ** 추가
        }
    };


    return (
        <BoardContainer>
        <BoardSearch onSearch={handleSearch} />
        <Section id="board" className="section">
          <div className="board_box">
            <table>
              <tbody>
                <tr>
                  <th>글번호</th>
                  <th>카테고리</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>조회수</th>
                  <th>작성일</th>
                </tr>
                {noResults && (
                  <tr> {/* 검색 결과가 없을 때 */}
                    <td colSpan="6">
                      <div className="SearchEmptyMessage">
                        <p>😦조회된 검색 결과가 없습니다.😦</p>
                      </div>
                    </td>
                  </tr>
                )}
                {!noResults && // 추가: 검색 결과가 있을 때에만 매핑
                  currentPageData.map((boardList) => (
                    <tr key={boardList.boardNo}>
                      <td>{boardList.boardNo}</td>
                      <td>{boardList.category === 'Recommend' ? '추천수다' : boardList.category}</td>
                      {/* <td>{boardList.category}</td> */}
                      <td>
                        <Link
                          to={`/boardList/boardView/${boardList.boardNo}`}
                          className="boardView_link"
                        >
                          {boardList.title}
                        </Link>
                      </td>
                      <td>{boardList.author}</td>
                      <td>{boardList.views}</td>
                      <td>
                        {new Date(boardList.writeDate).toISOString().split("T")[0]}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
            {!noResults && ( // 추가: 검색 결과가 있을 때에만 페이지네이션 및 글쓰기 버튼 표시
              <>
                <PageNation pageCount={pageCount} onPageChange={handlePageClick} />
                <div className="writebtn">
                  <button onClick={onClickToWrite}>글쓰기</button>
                </div>
              </>
            )}
        </Section>
        </BoardContainer>
    );
}
export default Recommend;