import * as React from 'react';
// import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {BsList} from 'react-icons/bs';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled.button`
    font-size: 1.7rem;
    border: none;
    background-color: transparent;
    margin: 0.6rem 0.4rem;
    cursor: pointer;


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

const CustomLink = styled(Link)`
  color: inherit; /* 기본 색상 유지 */
  text-decoration: none; /* 밑줄 제거 */
  &:hover {
    color: #5eadf7; /* 호버 시 색상 변경 */
    text-decoration: underline; /* 호버 시 밑줄 추가 */
  }
`;



export default function SwipeableTemporaryDrawer() {
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

    const list = (anchor) => (
      <Box
        // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
    <List>
        <h3 sx={{ cursor: 'pointer' }}>&times;</h3>
        <h2><CustomLink to="/">HOME</CustomLink></h2>
        <h2><CustomLink to="/exhibitList">전시예매</CustomLink></h2>
        <h2><CustomLink to="/boardList">게시판</CustomLink></h2>
        <h2><CustomLink to="/chatbot">고객센터</CustomLink></h2>
    </List>
      </Box>
    );

    return (
      <div>
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
