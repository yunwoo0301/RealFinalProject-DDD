import React,{useState} from 'react';
// import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {BsList} from 'react-icons/bs';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import {RiUserHeartLine} from "react-icons/ri";
import ConfirmModal from '../../util/ConfirmModal';

const Button = styled.button`
    font-size: 1.7rem;
    border: none;
    background-color: transparent;
    margin: 0.6rem 0.4rem;
    cursor: pointer;
    @media (max-width: 768px){
        margin-top: 0.65rem;
    }


`;

const List = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: end;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 2rem;
    @media (max-width: 768px) {
    font-size: 0.8rem;
  }


`;

const Box = styled.div`
    width: 20rem;

    @media (max-width: 768px) {
    width: 100vw;
  }

`

const CustomLink = styled.div`
  color: inherit; /* 기본 색상 유지 */
  text-decoration: none; /* 밑줄 제거 */
  &:hover {
    color: #5eadf7; /* 호버 시 색상 변경 */
    text-decoration: underline; /* 호버 시 밑줄 추가 */
  }
`;



export default function SwipeableTemporaryDrawer() {
    const navigate = useNavigate();
    const isLogin = window.localStorage.getItem("isLogin");
    const [state, setState] = React.useState({
      right: false,
      isChatbotOpen: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const clickToRates = () => {
      if(isLogin){
        navigate("/rateDiary");
      } else {
        setWarnModal(true);
      }

    }

    const clickToHome = () => {
      navigate("/");
    }

    const clickToExhibit = () => {
      navigate("/exhibitList");
    }

    const clickToBoardList = () => {
      navigate("/boardList");
    }

    const clickToChatbot = () => {
      navigate("/chatbot");
    }

    // 로그인 경고모달
      const [warnModal, setWarnModal] = useState(false);
      const closeWarnModal = () => {
        setWarnModal(false);
      }
      const goToLogin = () => {
        navigate("/login");
      }

    const props = {
      icon: <RiUserHeartLine color="#FF69B4"/>,
      body:(
        <>
        <p>로그인 후 이용가능합니다🥺</p>
        <p style={{fontSize: "0.9rem"}}>확인을 누르시면 로그인페이지로 이동합니다.</p>
        </>
      ),
      button: [
        <button onClick={goToLogin}>확인</button>,
        <button onClick={closeWarnModal}>취소</button>
      ]
    }

    const list = (anchor) => (
      <Box
        // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
    <List>
        <h3 sx={{ cursor: 'pointer' }}>&times;</h3>
        <h2><CustomLink onClick={clickToHome}>HOME</CustomLink></h2>
        <h2><CustomLink onClick={clickToExhibit}>전시예매</CustomLink></h2>
        <h2><CustomLink onClick={clickToRates}>평가하기</CustomLink></h2>
        <h2><CustomLink onClick={clickToBoardList}>게시판</CustomLink></h2>
        <h2><CustomLink onClick={clickToChatbot}>고객센터</CustomLink></h2>
    </List>
      </Box>
    );

    return (
      <div>
        {warnModal && <ConfirmModal props={props}/>}
        <Button onClick={toggleDrawer('right', true)}><BsList/></Button>
        <SwipeableDrawer
          anchor="right"
          open={state.right}
          onClose={toggleDrawer('right', false)}
          onOpen={toggleDrawer('right', true)}
          sx={{
            backgroundColor:"transparent",
            '& .MuiDrawer-paper': {
            backgroundColor: '#050E3D',
            color:'#fff',
            border: 'none',
            boxShadow: 'none',
          },
          }}
        >
          {list('right')}
        </SwipeableDrawer>
      </div>
    );
  }
