import React,{useEffect, useState, useMemo} from "react";
import styled from "styled-components";
import InfoModal from "../exhibition/InfoModal";
import PageNation from "../../util/PageNation";
import DDDApi from "../../api/DDDApi";

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

    button:nth-child(2),
    button:nth-child(1) {
        color: #5EADF7;
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
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingList, setBookingList] = useState([]);
    const [sortOption, setSortOption] = useState(""); // 정렬 옵션 추가

    // 전체 예매리스트
    useEffect(() => {
      const getBookings = async () => {
        const result = await DDDApi.bookingList();
        setBookingList(result.data);
      };
      getBookings();
    }, []);

    // 정렬된 예매리스트
    const sortedBookingList = useMemo(() => {
      let sortedList = [...bookingList];

      if (sortOption === "upcomingVisit") {
        sortedList.sort(
          (a, b) => new Date(a.visitDate) - new Date(b.visitDate)
        );
      } else if (sortOption === "recentBooking") {
        sortedList.sort(
          (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
        );
      }

      return sortedList;
    }, [bookingList, sortOption]);

    // 전체 선택 처리
    const handleSelectAllRows = () => {
      if (selectedRows.length === bookingList.length) {
        setSelectedRows([]);
      } else {
        setSelectedRows(sortedBookingList.map((item) => item.id));
      }
    };

    // 개별 행 선택 처리
    const handleSelectRow = (id) => {
      if (selectedRows.includes(id)) {
        setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
      } else {
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

    // 날짜 형식 변환 함수
    const formatDate = (date) => {
      const writeDate = new Date(date);
      const year = writeDate.getFullYear();
      const month = (writeDate.getMonth() + 1).toString().padStart(2, "0");
      const day = writeDate.getDate().toString().padStart(2, "0");
      const hours = writeDate.getHours().toString().padStart(2, "0");
      const minutes = writeDate.getMinutes().toString().padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    // 페이지네이션
    const ITEMS_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(0);
    const handlePageClick = (selectedPage) => {
      setCurrentPage(selectedPage.selected);
    };

    const pageCount = Math.ceil(sortedBookingList.length / ITEMS_PAGE);
    const offset = currentPage * ITEMS_PAGE;
    const currentPageData = sortedBookingList.slice(
      offset,
      offset + ITEMS_PAGE
    );

    // 예약목록삭제
    const cancelReservation = async () => {
      for (const bookingId of selectedRows) {
        await DDDApi.cancelReservation(bookingId);
      }
      const updatedBookingList = bookingList.filter(
        (item) => !selectedRows.includes(item.bookingId)
      );
      setBookingList(updatedBookingList);
      setSelectedRows([]);
    };

    // 정렬 옵션 변경 처리
    const handleSortOptionChange = (option) => {
      setSortOption(option);
    };

    return (
      <ReservContainer>
        <ModalContainer>
          {isModalOpen && (
            <InfoModal open={isModalOpen} close={closeModal}>
              <h3>예매 정보</h3>
              <hr />
              {selectedMember && (
                <div>
                  <p>예매일 : {formatDate(selectedMember.bookingDate)}</p>
                  <p>예매자(실제방문자) : {selectedMember.bookedName}</p>
                  <p>방문자 전화번호 : {selectedMember.bookedTel}</p>
                  <p>전시명 : {selectedMember.exhibitName}</p>
                  <p>방문일 : {selectedMember.visitDate}</p>
                  <p>방문인원 : {selectedMember.paymentDTO.paymentCnt}</p>
                  <h3>결제 정보</h3>
                  <hr />
                  <p>결제일 : {formatDate(selectedMember.paymentDTO.paymentDate)}</p>
                  <p>결제수단 : {selectedMember.paymentDTO.paymentType}</p>
                  <p>결제금액 : {selectedMember.paymentDTO.paidPrice}</p>
                </div>
              )}
            </InfoModal>
          )}
        </ModalContainer>
        <h3 className="title">예매 관리</h3>
        <div className="table-container">
          <ButtonWrapper>
            <button onClick={() => handleSortOptionChange("upcomingVisit")}>
                방문일 임박순￬
            </button>
            <button onClick={() => handleSortOptionChange("recentBooking")}>
                예매일순￬
            </button>
            <button onClick={cancelReservation}>삭제</button>
          </ButtonWrapper>
          <div className="member-table">
            <table>
              <thead>
                <TableRow>
                  <TableHeader>
                    <input
                      type="checkbox"
                      checked={selectedRows.length === sortedBookingList.length}
                      onChange={handleSelectAllRows}
                    />
                  </TableHeader>
                  <TableHeader style={{ width: "10%" }}>예매번호</TableHeader>
                  <TableHeader style={{ width: "20%" }}>예매자</TableHeader>
                  <TableHeader style={{ width: "15%" }}>예매일시</TableHeader>
                  <TableHeader style={{ width: "30%" }}>전시명</TableHeader>
                  <TableHeader style={{ width: "15%" }}>전시방문일</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {currentPageData.map((item) => (
                  <TableRow key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.bookingId)}
                        onChange={() => handleSelectRow(item.bookingId)}
                      />
                    </td>
                    <td onClick={() => openModal(item)}>{item.bookingId}</td>
                    <td onClick={() => openModal(item)}>{item.memberName}</td>
                    <td onClick={() => openModal(item)}>
                      {formatDate(item.bookingDate)}
                    </td>
                    <td>{item.exhibitName}</td>
                    <td>{item.visitDate}</td>
                  </TableRow>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
        </div>
        <PageNation
          pageCount={pageCount}
          onPageChange={handlePageClick}
          selected={currentPage + 1}
        />
      </ReservContainer>
    );
  };

  export default ReservationManage;
