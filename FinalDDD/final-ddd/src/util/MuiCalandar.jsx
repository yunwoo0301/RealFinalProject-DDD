import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한글 언어팩
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  width: 100%;
`;

const SelectedDateText = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;

const DateCalendarValue = ({ onDateChange, selectedDate }) => {

  const formatSelectedDate = (date) => {
    if (date) {
      return dayjs(date).format('YYYY년 MM월 DD일');
    }
    return '';
  };
  
  // 지난 날짜 disable만들기위해
  const isPastDate = (date) => {
    return dayjs(date).isBefore(dayjs(), 'day');
  };

  const shouldDisableDate = (date) => {
    return isPastDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="ko"> {/* 언어팩 설정 */}
      <CalendarContainer>
        <DemoContainer components={['DateCalendar', 'DateCalendar']}>
          <DemoItem>
            <DateCalendar value={selectedDate} onChange={onDateChange} shouldDisableDate={shouldDisableDate} />
          </DemoItem>
        </DemoContainer>
        <SelectedDateText>선택 날짜: {formatSelectedDate(selectedDate)}</SelectedDateText>
      </CalendarContainer>
    </LocalizationProvider>
  );
}

export default DateCalendarValue;
