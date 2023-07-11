import React,{ useState, useEffect } from "react";
import styled from "styled-components";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from "@mui/material/TextField";
import DDDApi from "../../api/DDDApi";
import dayjs from "dayjs";
import  {AiOutlineCheckCircle} from "react-icons/ai";
import ConfirmModal from "../../util/ConfirmModal";
import { Pagination } from "@mui/material";

const ExhibitContainer = styled.div`
    width: 80vw;
    height: 100vh;
    .title {
        margin-left: 3rem;
        text-decoration: underline;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        button{
          width: 4rem;
          height: 2rem;
          background-color: white;
          border: none;
          cursor: pointer;
        }
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

    .select {
    width: 90%;
    margin-left: 3rem;
    margin-bottom: 1rem;
    float: right;
    select {
        float: left;
    }
  }

  .date-container{
    float: right;
    margin-right: 5rem;
    gap: 1rem;
  }

  .paginationContainer{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }


`;
const TableHeader = styled.th`
  background-color: #050E3D;
  color: white;
  padding: 8px;
  width: ${({ width }) => width};
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

const ExhibitManage = () => {
  const [newData, setNewData] = useState('');
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [filteredExhibition, setFilteredExhibition] = useState([]);
  const [exhibitionList, setExhibitionList] = useState([]);
  const currentDate = dayjs(); // 현재 날짜 가져오기


  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredExhibition.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };



  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };


  // 전시리스트 불러오기
  const exhibitions = async () => {
    try {
      const exhibitListData = await DDDApi.exhibitionList();
      setExhibitionList(exhibitListData.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    exhibitions();
  }, []);

    // 전시리스트 리셋
    const resetExhibitions = async () => {
      const resetData = await DDDApi.resetExhibitions();
      setNewData(resetData.data);
      if(newData){
        exhibitions();
        setOpenModal(false);
      }
    }





  useEffect(() => {
    let filteredExhibitions = exhibitionList;

    if (selectedLocation !== "") {
      filteredExhibitions = filteredExhibitions.filter(
        (exhibition) => exhibition.region === selectedLocation
      );
    }

    if (selectedStartDate !== null) {
      filteredExhibitions = filteredExhibitions.filter(
        (exhibition) =>
          dayjs(exhibition.startDate, "YYYY-MM-DD").isSame(
            selectedStartDate,
            "day"
          )
      );
    }

    if (selectedEndDate !== null) {
      filteredExhibitions = filteredExhibitions.filter(
        (exhibition) =>
          dayjs(exhibition.endDate, "YYYY-MM-DD").isSame(
            selectedEndDate,
            "day"
          )
      );
    }

    // 전시마감일이 지난 전시는 화면에서 보이지않음
    filteredExhibitions = filteredExhibitions.filter(
      (exhibition) => dayjs(exhibition.endDate, "YYYY-MM-DD").isAfter(currentDate)
    );

    filteredExhibitions.sort((a, b) => {
      const endDateA = dayjs(a.endDate, "YYYY-MM-DD");
      const endDateB = dayjs(b.endDate, "YYYY-MM-DD");

      return endDateA.diff(currentDate) - endDateB.diff(currentDate);
    });

    setFilteredExhibition(filteredExhibitions);
  }, [selectedLocation, selectedStartDate, selectedEndDate, exhibitionList, currentDate]);


  // 리셋모달창
  const [openModal, setOpenModal] =useState(false);
  const openToReset = () => {
    setOpenModal(true);
  }
  const closeModal = () =>{
    setOpenModal(false);
  }

  const props = {
    icon: <AiOutlineCheckCircle/>,
    body: (
      <div>
        전시목록을 다시 불러오시겠습니까?
      </div>
    ),
    button:[<button onClick={resetExhibitions}>확인</button>,
    <button onClick={closeModal}>취소</button>]
  }


  return (
    <ExhibitContainer>
      {openModal && <ConfirmModal props={props}/>}
      <div className="title">
      <h3>전시 관리</h3>
      <button onClick={openToReset}>Reset</button>
      </div>
      <div className="table-container">
        <div className="select">
          <select
            id="location-select"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <option value="">지역선택</option>
            <option value="서울">서울</option>
            <option value="경기">경기/인천</option>
            <option value="충청">충청</option>
            <option value="강원">강원</option>
            <option value="전라">전라/제주</option>
            <option value="경상도">경상도</option>
          </select>

          <div className="date-container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="전시 시작일"
                value={selectedStartDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
                slotProps={{
                  textField: { size: "small" },
                  actionBar: {
                    actions: ["clear", "cancel"],
                  },
                }}
                sx={{ width: "10rem" }}
              />

              <DatePicker
                label="전시 마감일"
                value={selectedEndDate}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} />}
                slotProps={{
                  textField: { size: "small" },
                  actionBar: {
                    actions: ["clear", "cancel"],
                  },
                }}
                sx={{ width: "10rem" }}
              />
            </LocalizationProvider>
          </div>
        </div>
        <table>
          <thead>
            <TableRow>
              <TableHeader style={{ width: "15%" }}>전시번호</TableHeader>
              <TableHeader style={{ width: "15%" }}>지역</TableHeader>
              <TableHeader style={{ width: "20%" }}>전시명</TableHeader>
              <TableHeader style={{ width: "15%" }}>전시시작일</TableHeader>
              <TableHeader style={{ width: "15%" }}>전시마감일</TableHeader>
              <TableHeader style={{ width: "15%" }}>전시기간</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {currentItems.map((exhibition) => {
              const startDate = new Date(exhibition.startDate);
              const endDate = new Date(exhibition.endDate);
              const totalDays = Math.ceil(
                (endDate - startDate) / (1000 * 60 * 60 * 24)
              );

              return (
                <TableRow key={exhibition.exhibitNo}>
                  <td>{exhibition.exhibitNo}</td>
                  <td>{exhibition.region}</td>
                  <td>{exhibition.exhibitName}</td>
                  <td>{exhibition.startDate}</td>
                  <td>{exhibition.endDate}</td>
                  <td>{totalDays}일</td>
                </TableRow>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="paginationContainer">
      <Pagination
        count={Math.ceil(filteredExhibition.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
      </div>
    </ExhibitContainer>
  );
};

export default ExhibitManage;