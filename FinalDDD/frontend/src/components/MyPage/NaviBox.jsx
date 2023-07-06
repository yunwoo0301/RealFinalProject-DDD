import React from 'react';
import styled from 'styled-components';
import useStore from '../../store';

const Container = styled.div`
  width: calc(100%-1rem);
  height: 8rem;
  text-align: right;
  /* background-color: aqua; */
  flex-direction: row;
  padding-right: 3rem;

  .icon {
  display: inline-block;
  font-size: .6rem;
  position: relative;
  cursor: pointer;
  color: #222;
  margin: 1rem .4rem;
}

.icon::before,
.icon::after {
  content: "";
  position: absolute;
  bottom: -40%;
  width: 0;
  height: 1px;
  background-color: #5EADF7;
  transition: width 0.3s ease;
}

.icon::before {
  left: 50%;
  transform: translateX(-50%);
}

.icon::after {
  right: 50%;
  transform: translateX(50%);
}

.icon:hover::before,
.icon:hover::after {
  width: 100%;
}

.icon.active::before,
.icon.active::after {
  width: 100%;
}
.fColor{
    color: #5EADF7;
    font-weight: bold;
}





`;


const NaviBox = (props) => {
  const { showPage, setShowPage } = useStore();



    return (
        <Container>
            
            <div className='icon' onClick={()=>{setShowPage('마이페이지')}}> 마이페이지 </div>
            <div className={`icon ${showPage === '다이어리' ? 'active fColor' : ''}`} onClick={() => { setShowPage('다이어리') }}>다이어리</div>
            <div className={`icon ${showPage === '예약관리' ? 'active fColor' : ''}`} onClick={() => { setShowPage('예약관리') }}>예약 관리</div>
            <div className={`icon ${showPage === '내게시물' ? 'active fColor' : ''}`} onClick={()=>{setShowPage('내게시물')} }>내 게시물</div>
            <div className={`icon ${showPage === '내정보수정' ? 'active fColor' : ''}`} onClick={() => { setShowPage('내정보수정') }}>내 정보 수정</div>

        </Container>
    );
};

export default NaviBox;