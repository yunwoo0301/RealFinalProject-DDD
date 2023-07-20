import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DDDApi from "../../api/DDDApi";
import { Pagination } from "@mui/material";


const MembersContainer = styled.div`
  width: 80vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h3{
    margin-left: 3rem;
    text-decoration: underline;
  }

  table{
    width: 70vw;
    border-collapse: collapse;
   tbody{
    text-align: center;
   }
  }

  .reply{
    margin-bottom: 10%;
  }



`;

const TableContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .select {
    width: 90%;
    margin-left: 3rem;
    margin-bottom: 1rem;
    float: right;
    select {
        float: left;
    }
  }
  .paginationContainer{
    margin-top: 1rem;
  }


`;

const TableHeader = styled.th`
  background-color: #050e3d;
  color: white;
  padding: 8px;
`;

const TableRow = styled.tr`
  td {
    border-bottom: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  &:hover {
        background-color: #f4f8ff;
    }
`;

const ButtonWrapper = styled.div`
    margin-bottom: 1rem;
    width: 80%;
    margin-left: 9em;
    button {
      margin-left: 1rem;
        margin-top: 0.1rem;
        background: none;
        border: none;
        color: #050e3d;
        font-weight: bold;
        float: right;
        cursor: pointer;

    }

    button:hover {
        color: #5EADF7;
        text-decoration: underline;
    }

    input{
      margin-left: 2rem;
      float: right;
    }

`;


const BoardsManage = () => {
  const [selectedRows1, setSelectedRows1] = useState([]); // 게시판 관리 테이블의 체크박스 선택 상태
  const [selectedRows2, setSelectedRows2] = useState([]); // 댓글 관리 테이블의 체크박스 선택 상태
  const [selectedCategory, setSelectedCategory] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [boardData, setBoardData] = useState([]);

    // 페이지네이션
    const [currentPage1, setCurrentPage1] = useState(1);
    const [itemsPerPage1] = useState(5);

    const [currentPage2, setCurrentPage2] = useState(1);
    const [itemsPerPage2] = useState(5);

    const indexOfLastItem1 = currentPage1 * itemsPerPage1;
    const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
    const currentBoardData = boardData
      .filter((board) => board.category === selectedCategory || selectedCategory === "")
      .slice(indexOfFirstItem1, indexOfLastItem1);

    const indexOfLastItem2 = currentPage2 * itemsPerPage2;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
    const currentCommentList = commentList.slice(indexOfFirstItem2, indexOfLastItem2);

    const handlePageChange1 = (event, page) => {
      setCurrentPage1(page);
    };

    const handlePageChange2 = (event, page) => {
      setCurrentPage2(page);
    };

    // 검색기능 추가
    const [searchKeyword, setSearchKeyword] = useState(""); // 글쓰기

    const handleSearchChange = (e) => {
      setSearchKeyword(e.target.value);
    };

    const [searchComment, setSearchComment] = useState(""); // 댓글

    const handleSearchComment = (e) =>{
      setSearchComment(e.target.value);
    };

    const filteredBoardData = currentBoardData.filter((board) => {
      const boardTitle = board.title.toLowerCase();
      const contents = board.contents.toLowerCase();
      const keyword = searchKeyword.toLowerCase();

      return boardTitle.includes(keyword) || contents.includes(keyword);
    });


    const filteredCommentList = currentCommentList.filter((comment) => {
      const boardTitle = comment.boardTitle.toLowerCase();
      const nickname = comment.nickname.toLowerCase();
      const keyword = searchComment.toLowerCase();

      return boardTitle.includes(keyword) || nickname.includes(keyword);
    });





  // 날짜 형식 변환 함수
  const formatDate = (date) => {
    const writeDate = new Date(date);
    const year = writeDate.getFullYear();
    const month = (writeDate.getMonth() + 1).toString().padStart(2, '0');
    const day = writeDate.getDate().toString().padStart(2, '0');
    const hours = writeDate.getHours().toString().padStart(2, '0');
    const minutes = writeDate.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // 댓글 전체 조회
  const getComments = async () => {
    try {
      const commentsData = await DDDApi.boardCommentsList();
      setCommentList(commentsData.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getComments();
  }, []);

  // 글 전체조회
  const getBoards = async () => {
    try {
      const result = await DDDApi.articleList();
      setBoardData(result.data);

    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getBoards();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setCurrentPage1(1);
    setCurrentPage2(1);
  };

  const handleSelectAllRows1 = () => {
    if (selectedRows1.length === boardData.length) {
      setSelectedRows1([]);
    } else {
      setSelectedRows1(boardData.map((board) => board.boardNo));
    }
  };

  const handleSelectRow1 = (boardNo) => {
    if (selectedRows1.includes(boardNo)) {
      setSelectedRows1(selectedRows1.filter((no) => no !== boardNo));
    } else {
      setSelectedRows1([...selectedRows1, boardNo]);
    }
  };

  const handleSelectAllRows2 = () => {
    if (selectedRows2.length === commentList.length) {
      setSelectedRows2([]);
    } else {
      setSelectedRows2(commentList.map((comment) => comment.commentNo));
    }
  };

  const handleSelectRow2 = (commentNo) => {
    if (selectedRows2.includes(commentNo)) {
      setSelectedRows2(selectedRows2.filter((no) => no !== commentNo));
    } else {
      setSelectedRows2([...selectedRows2, commentNo]);
    }
  };

  // 댓글 삭제 로직
  const deleteSelectedComments = () => {
    selectedRows2.forEach((commentNo) => {
      deleteComments(commentNo);
    });
  };

  // 댓글 삭제
  const deleteComments = async (commentNo) => {
    await DDDApi.commentDelete(commentNo);
    getComments();
  };

  // 글 삭제 로직
  const deleteSelectedArticles = () => {
    selectedRows1.forEach((boardNo) => {
      deleteArticles(boardNo);
    })
  }

  // 글삭제
  const deleteArticles = async(boardNo) => {
    await DDDApi.delBoards(boardNo);
    getBoards();
  }






  return (
    <MembersContainer>
      <div className="boards">
        <h3>게시판 관리</h3>
        <TableContainer>
          <div className="select">
          <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">전체</option>
            {[...new Set(boardData.map((board) => board.category))].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
            <ButtonWrapper>
            <button onClick={deleteSelectedArticles }>삭제</button>
            <input type="text" className='searchBar' height={'1rem'}
                      value={searchKeyword} onChange={handleSearchChange} />
            </ButtonWrapper>
          </div>
          <table>
            <thead>
              <TableRow>
                <TableHeader>
                 <input
                    type="checkbox"
                    checked={selectedRows1.length === boardData.length}
                    onChange={handleSelectAllRows1}
                  />
                </TableHeader>
                <TableHeader>카테고리</TableHeader>
                <TableHeader>작성자</TableHeader>
                <TableHeader>작성제목</TableHeader>
                <TableHeader>작성내용</TableHeader>
                <TableHeader>작성일</TableHeader>
              </TableRow>
            </thead>
            <tbody>
            {filteredBoardData
              .filter((board) => board.category === selectedCategory || selectedCategory === "")
              .map((board) => (
                <TableRow key={board.boardNo}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows1.includes(board.boardNo)}
                      onChange={() => handleSelectRow1(board.boardNo)}
                    />
                  </td>
                  <td>{board.category}</td>
                  <td>{board.author}</td>
                  <td>{board.title}</td>
                  <td dangerouslySetInnerHTML={{__html: board.contents}}></td>
                  <td>{formatDate(board.writeDate)}</td>
                </TableRow>
              ))}
          </tbody>
          </table>
          <div className="paginationContainer">
          <Pagination
            count={Math.ceil(
              (boardData.filter((board) => board.category === selectedCategory || selectedCategory === "").length) /
                itemsPerPage1
            )}
            page={currentPage1}
            onChange={handlePageChange1}
          />
          </div>
        </TableContainer>
      </div>
      <div className="reply">
        <h3>댓글 관리</h3>
        <TableContainer>
          <div className="select">
            <ButtonWrapper>
              <button onClick={deleteSelectedComments }>삭제</button>
              <input type="text" className='searchBar' height={'1rem'}
                      value={searchComment} onChange={handleSearchComment} />
            </ButtonWrapper>
          </div>
          <table>
            <thead>
              <TableRow>
                <TableHeader>
                  <input
                    type="checkbox"
                    checked={selectedRows2.length === commentList.length}
                    onChange={handleSelectAllRows2}
                  />
                </TableHeader>
                <TableHeader>카테고리</TableHeader>
                <TableHeader>글 제목</TableHeader>
                <TableHeader>댓글 작성자</TableHeader>
                <TableHeader>댓글 내용</TableHeader>
                <TableHeader>댓글 작성 시간</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {filteredCommentList.map((comment) => (
                <TableRow key={comment.commentNo}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows2.includes(comment.commentNo)}
                      onChange={() => handleSelectRow2(comment.commentNo)}
                    />
                  </td>
                  <td>{comment.categoryName}</td>
                  <td>{comment.boardTitle}</td>
                  <td>{comment.nickname}</td>
                  <td>{comment.content}</td>
                  <td>{formatDate(comment.writeDate)}</td>
                </TableRow>
              ))}
            </tbody>
          </table>
          <div className="paginationContainer">
          <Pagination
            count={Math.ceil(commentList.length / itemsPerPage2)}
            page={currentPage2}
            onChange={handlePageChange2}
          />
          </div>
        </TableContainer>
      </div>
    </MembersContainer>
  );
};

export default BoardsManage;
