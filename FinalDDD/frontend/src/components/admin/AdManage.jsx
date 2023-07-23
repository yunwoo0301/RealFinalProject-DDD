import React, {useEffect, useState} from "react";
import { MembersContainer, ButtonWrapper, TableHeader, TableRow } from "./Members";
import LoginApi from "../../api/LoginApi";
import PageNation from "../../util/PageNation";
import SendEmail from "../Message/SendEmail";
import DDDApi from "../../api/DDDApi";
import styled from "styled-components";

const AdContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const AdsManage = () => {
    const [selectedRows, setSelectedRows] = useState([]); // 체크박스
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [memberList, setMemberList] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    // 전체메일보내기
    const [selectedMembers, setSelectedMembers] = useState([]);

    // 날짜형식
    const formatDate = (date) => {
      const writeDate = new Date(date);
      const year = writeDate.getFullYear();
      const month = (writeDate.getMonth() + 1).toString().padStart(2, "0");
      const day = writeDate.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    // 멤버리스트가져오기
    const getMembers = async () => {
      const result = await LoginApi.getAllMembers();
      const filteredMembers = result.data.filter((member) => member.deleteDate === "null");
      setMemberList(filteredMembers);
    };

    useEffect(() => {
      getMembers();
    }, []);

    // 전체 선택 처리
    const handleSelectAllRows = () => {
        if (selectedRows.length === memberList.length) {
          // 모든 행이 선택된 상태이면, 모든 행 선택 해제
          setSelectedRows([]);
          setSelectedMembers([]); // 전체 선택된 멤버들의 배열 초기화
        } else {
          // 그 외의 경우, 모든 행 선택
          setSelectedRows(memberList.map((item) => item.id));
          setSelectedMembers([...memberList]); // 전체 멤버들을 선택된 멤버들의 배열로 설정
        }
      };

    // 개별 행 선택 처리
    const handleSelectRow = (id, email) => {
        if (selectedRows.includes(id)) {
          // 이미 선택된 행인 경우, 선택 해제
          setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
          setSelectedMember(null); // 개별 선택된 멤버 데이터 초기화
        } else {
          // 그 외의 경우, 선택
          setSelectedRows([...selectedRows, id]);
          const selectedRow = memberList.find((item) => item.id === id);
          setSelectedMember(selectedRow); // 개별 선택된 멤버 데이터 설정
        }
      };


      const handleSendIndividualEmail = () => {
        if (selectedMember) {
          setIsModalOpen(true);
        }
      };

      // 전체 메일 보내기 버튼 클릭 시, 선택된 멤버들의 배열인 selectedMembers 확인하고 모달 열기
      const handleSendBulkEmail = () => {
        if (selectedMembers.length > 0) {
          setIsModalOpen(true);
        }
      };

    // 페이지네이션
    //보여질 페이지 개수
    const ITEMS_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const pageCount = Math.ceil(memberList.length / ITEMS_PAGE); // 전체 페이지 수
    const offset = currentPage * ITEMS_PAGE; // 현재 페이지에서 보여줄 아이템의 시작 인덱스
    const currentPageData = memberList.slice(offset, offset + ITEMS_PAGE);

    // 이메일 리스트보기
    const [emailList, setEmailList] = useState([])

    useEffect(() => {
        const getList = async() => {
           const result = await DDDApi.emailAdList();
           setEmailList(result.data);
        }
        getList();
    }, [])

    // 이메일리스트 페이지네이션
    const [currentEmailPage, setCurrentEmailPage] = useState(0);
    const handleEmailPage = (selectedPage) => {
        setCurrentEmailPage(selectedPage.selected);
    }

    const emailPageCount = Math.ceil(emailList.length / ITEMS_PAGE);
    const emailOffset = currentEmailPage * ITEMS_PAGE;
    const emailPageData = emailList.slice(emailOffset, emailOffset + ITEMS_PAGE);


    return (
      <>
      <AdContainer>
        {isModalOpen && (
          <SendEmail
            onClose={() => {
                setSelectedMember(null);
                setSelectedMembers([]);
                setIsModalOpen(false);
              }}
              selectedMember={selectedMember}
              selectedMembers={selectedMembers}
          />
        )}
        <MembersContainer>
          <h3 className="title">광고 관리</h3>
          <div className="table-container">
          <ButtonWrapper>
          <button onClick={handleSendIndividualEmail}>개별 메일 보내기</button>
      <button onClick={handleSendBulkEmail}>전체 메일 보내기</button>
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
                  </TableRow>
                </thead>
                <tbody>
                  {currentPageData.map((item) => (
                    <TableRow key={item.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(item.id)}
                          onChange={() => handleSelectRow(item.id, item.email)}
                        />
                      </td>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.name}</td>
                      <td>{item.tel}</td>
                      <td>{formatDate(item.regDate)}</td>
                    </TableRow>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <PageNation
            pageCount={pageCount}
            onPageChange={handlePageClick}
            selected={currentPage + 1}
          />
        </MembersContainer>
        <MembersContainer>
          <h3 className="title">보낸 광고</h3>
          <div className="table-container">
            <div className="member-table">
              <table>
                <thead>
                  <TableRow>
                    <TableHeader style={{ width: "15%" }}>이메일번호</TableHeader>
                    <TableHeader style={{ width: "20%" }}>제목</TableHeader>
                    <TableHeader style={{ width: "35%%" }}>내용</TableHeader>
                    <TableHeader style={{ width: "20%" }}>보낸날짜</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {emailPageData.map((item) => (
                    <TableRow key={item.emailNo}>
                      <td>{item.emailNo}</td>
                      <td>{item.title}</td>
                      <td>{item.emailContents}</td>
                      <td>{formatDate(item.sentEmailDate)}</td>
                    </TableRow>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <PageNation
            pageCount={emailPageCount}
            onPageChange={handleEmailPage}
            selected={currentEmailPage + 1}
          />
        </MembersContainer>
        </AdContainer>
      </>
    );
  };

  export default AdsManage;