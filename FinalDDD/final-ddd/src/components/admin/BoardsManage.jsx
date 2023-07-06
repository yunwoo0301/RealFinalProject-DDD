import React, { useState } from "react";
import styled from "styled-components";

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
        background: none;
        border: none;
        color: #050e3d;
        font-weight: bold;
        float: right;
        cursor: pointer;
        margin-left: 1rem;
        
    }

    button:hover {
        color: #5EADF7;
        text-decoration: underline;
    }
`;


const BoardsManage = () => {
    const boardData = [
        {
          category: "추천수다",
          posts: [
            {
              id: 1,
              date: "2023-06-20",
              author: "User1",
              title: "첫 번째 글",
              contents: "첫 번째 글 내용입니다.",
              views: 10,
              comments: [
                {
                  postId: 1,
                  id: 1,
                  author: "댓글 작성자1",
                  content: "댓글 내용123423423",
                  timestamp: "2023-06-13 12:34:00",
                },
                {
                  postId: 1,
                  id: 2,
                  author: "댓글 작성자2",
                  content: "댓글 내용22423423423",
                  timestamp: "2023-06-13 12:35:00",
                },
              ],
            },
            {
              id: 6,
              date: "2023-06-15",
              author: "User2",
              title: "여섯 번째 글",
              contents: "여섯 번째 글 내용입니다.",
              views: 8,
              comments: [
                {
                  postId: 6,
                  id: 3,
                  author: "댓글 작성자2",
                  content: "댓글 내용32423232",
                  timestamp: "2023-06-13 12:35:00",
                }
              ],
            },
          ],
        },
        {
          category: "질문하기",
          posts: [
            {
              id: 3,
              date: "2023-06-18",
              author: "User3",
              title: "질문 글",
              contents: "질문 글 내용입니다.",
              views: 8,
              comments: [
                {
                postId: 3,
                id: 4,
                author: "댓글 작성자2",
                content: "댓글 내용22342311321",
                timestamp: "2023-06-13 12:35:00",
              }
              ],
            },
          ],
        },
        {
          category: "동행찾기",
          posts: [
            {
              id: 4,
              date: "2023-06-17",
              author: "User4",
              title: "동행 글",
              contents: "동행 글 내용입니다.",
              views: 12,
              comments: [
                {
                postId: 4,
                id: 5,
                author: "댓글 작성자2",
                content: "댓글 내용244444444444",
                timestamp: "2023-06-13 12:35:00",
              }
              ],
            },
            {
              id: 5,
              date: "2023-06-16",
              author: "User5",
              title: "다섯 번째 글",
              contents: "다섯 번째 글 내용입니다.",
              views: 7,
              comments: [
                {
                    postId: 5,
                    id: 6,
                    author: "댓글 작성자2",
                    content: "댓글 내용2223333232322",
                    timestamp: "2023-06-13 12:35:00",
                  }
              ],
            },
          ],
        },
    ];
    
    const [selectedRows, setSelectedRows] = useState([]); // 체크박스

  const [selectedCategory, setSelectedCategory] = useState(boardData[0].category);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const selectedBoard = boardData.find(
    (board) => board.category === selectedCategory
  );
     // 전체 선택 처리
     const handleSelectAllRows = () => {
        if (selectedRows.length === selectedBoard.posts.length) {
          // 모든 행이 선택된 상태인 경우, 모든 행 선택 해제
          setSelectedRows([]);
        } else {
          // 그 외의 경우, 모든 행 선택
          setSelectedRows(selectedBoard.posts.map((item) => item.id));
        }
      };

// 개별 행 선택 처리
    const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
    // 이미 선택된 행인 경우, 선택 해제
    setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
    // 그 외의 경우, 선택
    setSelectedRows([...selectedRows, id]);
    }
};
    // 댓글 10글자이상이면 줄여서 10글자 이후는 ...으로 표시
    const renderContent = (content) => {
        if (content.length > 10) {
          return content.substring(0, 10) + '...';
        }
        return content;
      };

  return (
    <MembersContainer>
      <div className="boards">
        <h3>게시판 관리</h3>
        <TableContainer>
        <div className="select">
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          {boardData.map((board) => (
            <option key={board.category} value={board.category}>
              {board.category}
            </option>
          ))}
        </select>
        <ButtonWrapper>
            <button>삭제</button>
            <button>수정</button>
        </ButtonWrapper>
        </div>
        <table>
          <thead>
            <TableRow>
            <TableHeader>
            <input
                type="checkbox"
                checked={selectedRows.length === selectedBoard.posts.length}
                onChange={handleSelectAllRows}
            />
            </TableHeader>
            <TableHeader>작성일</TableHeader>
            <TableHeader>작성자</TableHeader>
            <TableHeader>작성제목</TableHeader>
            <TableHeader>조회수</TableHeader>
            <TableHeader>댓글수</TableHeader>
            </TableRow>
          </thead>
          <tbody>
          {selectedBoard &&
            selectedBoard.posts.map((post) => (
                <TableRow key={post.id}>
                    <td>
                    <input
                        type="checkbox"
                        checked={selectedRows.includes(post.id)}
                        onChange={() => handleSelectRow(post.id)}
                    />
                    </td>
                <td>{post.date}</td>
                <td>{post.author}</td>
                <td>{post.title}</td>
                <td>{post.views}</td>
                <td>{post.comments.length}</td>
                </TableRow>
            ))}
        </tbody>
        </table>
      </TableContainer>
      </div>
      <div className="reply">
      <h3>댓글 관리</h3>
      <TableContainer>
        <div className="select">
        <ButtonWrapper>
            <button>삭제</button>
            <button>수정</button>
        </ButtonWrapper>
        </div>
        <table>
          <thead>
            <TableRow>
            <TableHeader>
            <input
                type="checkbox"
                checked={selectedRows.length === selectedBoard.posts.length}
                onChange={handleSelectAllRows}
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
  {boardData.map((category) =>
    category.posts.map((post) =>
      post.comments.map((comment) => (
        <TableRow key={comment.id}>
            <td>
                <input
                    type="checkbox"
                    checked={selectedRows.includes(post.id)}
                    onChange={() => handleSelectRow(post.id)}
                />
            </td>
            <td>{category.category}</td>
            <td>{post.title}</td>
            <td>{comment.author}</td>
            <td>{renderContent(comment.content)}</td>
            <td>{comment.timestamp}</td>
        </TableRow>
      ))
    )
  )}



          </tbody>
        </table>
      </TableContainer>
    </div>
    </MembersContainer>
  );
};

export default BoardsManage;
