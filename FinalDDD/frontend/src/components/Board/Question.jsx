import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DDDApi from "../../api/DDDApi";
import styled from "styled-components";
import BoardSearch from "./BoardSearch";
import PageNation from "../../util/PageNation";
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

        a{
            font-size: 1.1rem;
            color:  inherit;
            text-decoration: none;
        }
        button {
            font-size: 16px;
            font-weight: 400;
            float: right;
            padding: 8px 35px;
            border-radius: 10px;
            background-color: #135CD2;
            color: white;
            border: none;
            transition: all .1s ease-in;
             cursor: pointer;

            &:hover{background-color:  #a1f7d9; color: #135CD2;}
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
`;




const Question = () => {

    const navigate = useNavigate();

    const handleSearch = (boardList) => {
        setBoardList(boardList); // 검색 결과를 상태로 설정
    };

    //  값을 불러오기위해 선언, 목록보기
    const [boardList, setBoardList] = useState([]); // boardList 불러오기
   

    //보여질 페이지 Item 개수(페이지네이션)
    const ITEMS_PAGE = 13;
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const offset = currentPage * ITEMS_PAGE; // 현재 페이지에서 보여줄 아이템의 시작 인덱스
    const currentPageData = boardList.slice(offset, offset + ITEMS_PAGE);
    const pageCount = Math.ceil(boardList.length / ITEMS_PAGE); // 전체 페이지수
      

    // 자유게시판(boardList) 질문하기 목록 불러오기
    useEffect(() => {
        const fetchData = async () => {
          try {
            const category = '질문하기'; // 조회할 카테고리 이름 지정
            const response = await DDDApi.getFreeBoardsByCategory(category);
            setBoardList(response.data);
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
        const getId = window.localStorage.getItem("Id");
        console.log(isLogin);
        console.log(getId);
        
        if (isLogin && getId) {
            const link = "write/";
            navigate(link);
        } else {
            alert("로그인 완료 시 작성 진행 가능합니다.");
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
                            {currentPageData.map((boardList) => (
                            <tr key={boardList.boardNo}>
                                <td>{boardList.boardNo}</td>
                                <td>{boardList.category}</td>
                                <td>
                                    {/* 게시판 상세조회로 이동 */}

                                    <Link to={`/boardList/boardView/${boardList.boardNo}`} 
                                    className="boardView_link">{boardList.title}
                                    </Link>
                                </td>
                                <td>{boardList.author}</td>
                                <td>{boardList.views}</td>

                                {/* 작성일자 "yyyy-mm-dd" 형식으로 문자열 반환 */}
                                <td>{new Date(boardList.writeDate).toISOString().split("T")[0]}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <PageNation pageCount={pageCount} onPageChange={handlePageClick}/>
                <div className="writebtn">
                    <button onClick={onClickToWrite}>글쓰기</button>
                </div>
            </Section>
        </BoardContainer>
    );
}

export default Question;