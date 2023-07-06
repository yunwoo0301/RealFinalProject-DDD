import React,{ useState, useEffect } from "react";
import styled from "styled-components";
import exhibitionData from "../exhibition/exhibitionData";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from "@mui/material/TextField";
import dayjs from 'dayjs';

const ExhibitContainer = styled.div`
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



const ExhibitManage = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [filteredExhibitions, setFilteredExhibitions] = useState([]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  useEffect(() => {

  const filteredExhibitions = exhibitionData.filter((exhibition) => {
    const isLocationMatched =
      selectedLocation === "" || exhibition.location === selectedLocation;
  
      
const isStartDateMatched =
selectedStartDate === null ||
(exhibition.startDate && dayjs(exhibition.startDate).isSame(selectedStartDate, 'day'));

const isEndDateMatched =
selectedEndDate === null ||
(exhibition.endDate && dayjs(exhibition.endDate).isSame(selectedEndDate, 'day'));

  
    if (selectedStartDate && !selectedEndDate) {
      // 시작일만 선택된 경우, 마감일은 상관없이 해당 시작일의 전시 표시
      return isLocationMatched && isStartDateMatched;
    }
  
    if (!selectedStartDate && selectedEndDate) {
      // 마감일만 선택된 경우, 시작일은 상관없이 해당 마감일의 전시 표시
      return isLocationMatched && isEndDateMatched;
    }
  
    return isLocationMatched || isStartDateMatched || isEndDateMatched ;
  });

  setFilteredExhibitions(filteredExhibitions);
}, [selectedLocation, selectedStartDate, selectedEndDate]);


  return(
    <ExhibitContainer>
          <h3 className="title">전시 관리</h3>
          <div className="table-container">
            <div className="select">
          <select
            id="location-select"
            value={selectedLocation}
            onChange={handleLocationChange}
          >
            <option value="">지역선택</option>
            <option value="서울">서울</option>
            <option value="경기/인천">경기/인천</option>
            <option value="충청">충청</option>
            <option value="강원">강원</option>
            <option value="전라/제주">전라/제주</option>
            <option value="경상도">경상도</option>
          </select>
          <div className="date-container">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="전시 시작일"
            value={selectedStartDate}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} />}
            slotProps={{ textField: { size: 'small'},actionBar: {
                actions: [ 'clear','cancel'],
              }}}
            sx={{ width: "10rem" }}
            
          />
          
          <DatePicker
            label="전시 마감일"
            value={selectedEndDate}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} />}
            slotProps={{ textField: { size: 'small' }, actionBar: {
                actions: [ 'clear','cancel'],
              }}}
            sx={{ width: "10rem"}}
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
                {filteredExhibitions
                .sort((a, b) => a.location.localeCompare(b.location))
                .map((exhibition) => {
                    const startDate = new Date(exhibition.startDate);
                    const endDate = new Date(exhibition.endDate);
                    const totalDays = Math.ceil(
                    (endDate - startDate) / (1000 * 60 * 60 * 24)
                    );

                    return (
                    <TableRow key={exhibition.index}>
                        <td>{exhibition.index}</td>
                        <td>{exhibition.location}</td>
                        <td>{exhibition.name}</td>
                        <td>{exhibition.startDate}</td>
                        <td>{exhibition.endDate}</td>
                        <td>{totalDays}일</td>
                    </TableRow>
                    );
                })}
          </tbody>
        </table>
        </div>
    </ExhibitContainer>
  );
};

export default ExhibitManage;