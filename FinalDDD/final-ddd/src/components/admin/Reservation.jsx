import React,{useState} from "react";
import styled from "styled-components";
import InfoModal from "../exhibition/InfoModal";
import exhibitionData from "../exhibition/exhibitionData";
import PageNation from "../../util/PageNation";

const ReservContainer = styled.div`
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
    img{
        margin-left: 2rem;
        width: 10%;
        height: 100px;
    }
`;





const ReservationManage = () => {
    const [selectedRows, setSelectedRows] = useState([]); //가짜데이터 생성
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState(generateFakeData(20).map(item => ({ ...item, exhibitionIndex: Math.floor(Math.random() * exhibitionData.length) + 1 })));


       // 가짜 데이터 생성 함수
    function generateFakeData(count) {
    const fakeData = [];

    for (let i = 1; i <= count; i++) {
        const reservDate = "2023-06-2"; // 기본 가입일
    
        fakeData.push({
        id: i,
        name: `회원${i}`,
        reservDate: reservDate+i,
        visitDate: "2023-07-10",
        });
    }
    
    return fakeData;
    }


    // 전체 선택 처리
    const handleSelectAllRows = () => {
        if (selectedRows.length === data.length) {
        // 모든 행이 선택된 상태인 경우, 모든 행 선택 해제
        setSelectedRows([]);
        } else {
        // 그 외의 경우, 모든 행 선택
        setSelectedRows(data.map((item) => item.id));
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

    const pageCount = Math.ceil(data.length / ITEMS_PAGE); // 전체 페이지 수
    const offset = currentPage * ITEMS_PAGE; // 현재 페이지에서 보여줄 아이템의 시작 인덱스
    const currentPageData = data.slice(offset, offset + ITEMS_PAGE);
    



    return(
        <ReservContainer>
            <ModalContainer>
            {isModalOpen && (
            <InfoModal open={isModalOpen} close={closeModal}>
            <h3>예매 정보</h3>
            <hr />
            {selectedMember && (
                <div>
                    <p>예매일 : {selectedMember.reservDate}</p>
                    <p>예매자 : {selectedMember.name}</p>
                    <img src={exhibitionData[selectedMember.exhibitionIndex - 1]?.imgUrl} alt="전시이미지" />
                    <p>전시명 : {exhibitionData[selectedMember.exhibitionIndex - 1]?.name}</p>
                    <p>방문일 : {selectedMember.visitDate}</p>

                </div>
            )}
            </InfoModal>
            )}
            </ModalContainer>
            <h3 className="title">예매 관리</h3>
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
                        checked={selectedRows.length === data.length}
                        onChange={handleSelectAllRows}
                        />
                    </TableHeader>
                    <TableHeader style={{ width: "10%" }}>예매번호</TableHeader>
                    <TableHeader style={{ width: "20%" }}>예매자</TableHeader>
                    <TableHeader style={{ width: "15%" }}>예매일</TableHeader>
                    <TableHeader style={{ width: "30%" }}>전시명</TableHeader>
                    <TableHeader style={{ width: "15%" }}>전시방문일</TableHeader>
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
                        <td onClick={() => openModal(item)}>{item.name}</td>
                        <td onClick={() => openModal(item)}>{item.reservDate}</td>
                        <td>{exhibitionData[item.exhibitionIndex - 1]?.name}</td>
                        <td>{item.visitDate}</td>
                    </TableRow>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
            <PageNation pageCount={pageCount} onPageChange={handlePageClick} selected={currentPage+1}  />
        </ReservContainer>
    )
}

export default ReservationManage;