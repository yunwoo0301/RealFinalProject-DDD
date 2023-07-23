import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InfoModal from "../exhibition/InfoModal";
import PageNation from "../../util/PageNation";
import LoginApi from "../../api/LoginApi";
import ConfirmModal from "../../util/ConfirmModal";
import {MdOutlineChangeCircle} from "react-icons/md";


export const MembersContainer = styled.div`
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

export const TableHeader = styled.th`
        background-color: #050E3D;
        color: white;
        padding: 8px;
    `;

export const TableRow = styled.tr`
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

export const ButtonWrapper = styled.div`
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

export const ModalContainer = styled.div`
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

     // 날짜형식
     const formatDate = (date) => {
        const writeDate = new Date(date);
        const year = writeDate.getFullYear();
        const month = (writeDate.getMonth() + 1).toString().padStart(2, "0");
        const day = writeDate.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
      };

    // 멤버리스트가져오기
    const getMembers = async() => {
        const result = await LoginApi.getAllMembers();
        setMemberList(result.data);
    }
    useEffect(() => {
       getMembers();
    }, [])


    // 관리자권한 이메일변경
    const [newEmail, setNewEmail] = useState('');
    const [id, setId] = useState(null);

    const changeNewEmail = (e) => {
        setNewEmail(e.target.value);
    }


    const changeEmail = async() => {
        const sendData = await LoginApi.changeEmail(id, newEmail);
        if(sendData) {
            setOpenChange(false);
            setSelectedRows([]);
            getMembers();

        }
    }

    // 이메일 변경 모달오픈
    const [openChange, setOpenChange] = useState(false);
    const openToChange = () => {
        setOpenChange(true)
    }
    const closeToChange = () => {
        setOpenChange(false);
    }

    // 이메일 변경모달에 값 전달
    const props = {
        icon: <MdOutlineChangeCircle/>,
        body: (
          <>
            <h4>이메일 변경</h4>
            <p>현재 이메일: {selectedMember ? selectedMember.email : newEmail}</p>
            <input type="text" value={newEmail} onChange={changeNewEmail}/>
          </>
        ),
        button: [
          <button onClick={changeEmail}>확인</button>,
          <button onClick={closeToChange}>취소</button>
        ]
      };


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
const handleSelectRow = (id, email) => {
    if (selectedRows.includes(id)) {
      // 이미 선택된 행인 경우, 선택 해제
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      setSelectedMember(null); // 선택된 회원 정보 초기화
      setId(null); // 아이디 값 초기화
      setNewEmail(''); // newEmail 초기화
    } else {
      // 그 외의 경우, 선택
      setSelectedRows([id]);
      const member = memberList.find((item) => item.id === id);
      setSelectedMember(member); // 선택된 회원 정보 설정
      setId(id); // 아이디 값 설정
      setNewEmail(member.email); // 선택된 회원의 이메일 값을 newEmail 상태에 저장
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
        {openChange && <ConfirmModal props={props}/>}
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
            <button onClick={openToChange}>수정</button>
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
                        onChange={() => handleSelectRow(item.id, item.emailß)}
                    />
                    </td>
                    <td onClick={() => openModal(item)}>{item.id}</td>
                    <td onClick={() => openModal(item)}>{item.email}</td>
                    <td onClick={() => openModal(item)}>{item.name}</td>
                    <td>{item.tel}</td>
                    <td>{formatDate(item.regDate)}</td>
                    {item.deleteDate === "null" ? <td></td> :
                    <td>{formatDate(item.deleteDate)}</td>}
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
