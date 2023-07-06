import React from "react";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";

const Container = styled.div`

.react-calendar {
        width: 400px;
        max-width: 100%;
        background-color: #fff;
        color: #222;
        border-radius: 8px;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        line-height: 1.125em;
        font-size: 20px;
        }
 
        .react-calendar__navigation button {
        color: #050E3D;
        min-width: 44px;
        background: none;
        font-size: 20px;
        margin-top: 8px;
        font-weight:bold;
        }
        
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
        background-color: #F4F8FF;
        }
        .react-calendar__navigation button[disabled] {
        background-color: #F4F8FF;
        }
        abbr[title] {
        text-decoration: none;
        }
        .react-calendar__tile{
            height: 60px;
            font-size: 1rem;
        }

        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
        background: #050E3D;
        color: #fff;
        border-radius: 6px;
        }
        
        .react-calendar__tile--now {
        background: #5EADF7;
        border-radius: 6px;
        font-weight: bold;
        color: black;
        }
        

        
        .react-calendar__tile--active {
        background: #050E3D;
        border-radius: 6px;
        font-weight: bold;
        color: white;
        }
        
        .react-calendar__tile--active:enabled:hover,
        .react-calendar__tile--active:enabled:focus {
        background: #050E3D;
        color: white;
        }
        .printDate {
            margin-top: 0.5rem;
            color: #050E3D;
            font-size: 1.2em;
            font-weight: bolder;
        }

`;
const ReservationCalendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const formatDate = (date) => {
       const year = date.getFullYear();
       const month = String(date.getMonth() + 1).padStart(2, "0");
       const day = String(date.getDate()).padStart(2, "0");
       return `선택한 날짜: ${year}년 ${month}월 ${day}일`;
    };

    const handleDateChange = (date) => {
       setSelectedDate(date);
    };

   return (
       <Container>
           <Calendar
               value={selectedDate}
               onChange={handleDateChange}
               formatDay={(locale, date) => {
                   const day = date.toLocaleString("en", { day: "numeric" });
                   const isSunday = date.getDay() === 0;
                   const isSaturday = date.getDay() === 6;
                   const style = {
                       color: isSunday ? "red" : isSaturday ? "blue" : "inherit",
                   };
                   return <span style={style}>{day}</span>;
               }}
               calendarType="US"
           />
           <div className="printDate">{formatDate(selectedDate)}</div>
       </Container>
   );
};



export default ReservationCalendar;