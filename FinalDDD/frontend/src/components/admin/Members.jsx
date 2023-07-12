import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InfoModal from "../exhibition/InfoModal";
import PageNation from "../../util/PageNation";
import LoginApi from "../../api/LoginApi";

const MembersContainer = styled.div`
    width: 80vw;
    height: 100vh;


    .title {
        margin-left: 3rem;
        text-decoration: underline;
    }
    table {
        width: 70vw;
        border-collapse: collapse;
    }

    .table-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`;

    const TableHeader = styled.th`
        background-color: #050E3D;
        color: white;
        padding: 8px;
    `;

    const TableRow = styled.tr`
        td {
            border-bottom: 1px solid #ddd;
            padding: 8px;
            text-align: center;
            cursor: pointer;
        }
        &:hover {
        background-color: #f4f8ff;
        }

    `;

const ButtonWrapper = styled.div`
    margin-bottom: 1rem;
    width: 80%;
    text-align: right;

    button {
        background: none;
        border: none;
        color: #050e3d;
        font-weight: bold;
        cursor: pointer;
        margin-left: 1rem;

    }

    button:hover {
        color: #5EADF7;
        text-decoration: underline;
    }
`;

const ModalContainer = styled.div`
    width: 50%;
    h3{text-align: center;}
    p{
        margin-left: 2rem;
    }
`;

const Members = () => {
    const [selectedRows, setSelectedRows] = useState([]); // 체크박스
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [memberList, setMemberList] = useState([]);

    // 멤버리스트가져오기
    useEffect(() => {
        const getMembers = async() => {
            const result = await LoginApi.getAllMembers();
            setMemberList(result.data);
        }
       getMembers();
    }, [])

    // 전체 선택 처리
    const handleSelectAllRows = () => {
        if (selectedRows.length === memberList.length) {
        // 모든 행이 선택된 상태인 경우, 모든 행 선택 해제
        setSelectedRows([]);
        } else {
        // 그 외의 경우, 모든 행 선택
        setSelectedRows(memberList).map((item) => item.id);
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
  // 모달 열기
    const openModal = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    };

  // 모달 닫기
    const closeModal = () => {
    setIsModalOpen(false);
    };

      // 페이지네이션
    //보여질 페이지 개수
    const ITEMS_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const pageCount = Math.ceil(memberList.length / ITEMS_PAGE); // 전체 페이지 수
    const offset = currentPage * ITEMS_PAGE; // 현재 페이지에서 보여줄 아이템의 시작 인덱스
    const currentPageData = memberList.slice(offset, offset + ITEMS_PAGE);



return (
    <MembersContainer>
        <ModalContainer>
        {isModalOpen && (
        <InfoModal open={isModalOpen} close={closeModal}>
          <h3>회원 정보</h3>
          <hr />
          {selectedMember && (
            <div>
                <p>가입일 : {selectedMember.regDate}</p>
                <p>아이디 : {selectedMember.id}</p>
                <p>이메일 : {selectedMember.email}</p>
                <p>전화번호 : {selectedMember.tel}</p>

            </div>
          )}
        </InfoModal>
      )}
      </ModalContainer>
        <h3 className="title">회원 관리</h3>
        <div className="table-container">
        <ButtonWrapper>
            <button>수정</button>
            <button>삭제</button>
        </ButtonWrapper>
        <div className="member-table">
            <table>
            <thead>
                <TableRow>
                <TableHeader>
                    <input
                    type="checkbox"
                    checked={selectedRows.length === memberList.length}
                    onChange={handleSelectAllRows}
                    />
                </TableHeader>
                <TableHeader style={{ width: "15%" }}>회원번호</TableHeader>
                <TableHeader style={{ width: "20%" }}>이메일</TableHeader>
                <TableHeader style={{ width: "15%" }}>이름</TableHeader>
                <TableHeader style={{ width: "15%" }}>전화번호</TableHeader>
                <TableHeader style={{ width: "15%" }}>가입일</TableHeader>
                <TableHeader style={{ width: "15%" }}>탈퇴일</TableHeader>
                </TableRow>
            </thead>
            <tbody>
                {currentPageData.map((item) => (
                <TableRow key={item.id} >
                    <td>
                    <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => handleSelectRow(item.id)}
                    />
                    </td>
                    <td onClick={() => openModal(item)}>{item.id}</td>
                    <td onClick={() => openModal(item)}>{item.email}</td>
                    <td onClick={() => openModal(item)}>{item.name}</td>
                    <td>{item.tel}</td>
                    <td>{item.regDate}</td>
                    <td>{item.deleteDate}</td>
                </TableRow>
                ))}
            </tbody>
            </table>
        </div>
        </div>
            <PageNation pageCount={pageCount} onPageChange={handlePageClick} selected={currentPage+1}  />
        </MembersContainer>
    );
    };

export default Members;
