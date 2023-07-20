import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PageNation from '../../util/PageNation';
import DDDApi from '../../api/DDDApi';
import ShowMsg from '../Message/ShowMessage';
import {MdOutlinePersonPin} from "react-icons/md";
import {GiLoveLetter} from  "react-icons/gi";
import Button from '../../util/Button';
import {useNavigate} from "react-router-dom";



const PostWrap = styled.div`
    width: calc(100% - 2rem);
    height: 100%;
    /* background-color: #fed081; */
    /* position : relative;
    top: 12%; */
    padding-left: 2.5rem;
    p {
        text-align: left;
        margin: 0rem 0 .3rem 0;
        font-size: 1rem;
        font-weight: bold;
    }
    .title {
        /* background-color: red; */
        height: 2.8rem;
        font-weight: bold;
    }
    .moreBox{
        width: 90%;
        display: flex;
        justify-content: space-between;
        margin: 1rem 0 ;
        font-size: .8rem;
        font-weight: bold;
        color:#555;
        .seeMore{
            cursor: pointer;
        }
    }
    .buffer{
        width: 90%;
        height: 5%;
        /* background-color: aqua; */
        border-bottom : 1px solid #ddd;
    }
`;

const Table = styled.table`
    width: 92%;
    /* background-color: aqua; */
    text-align: center;
    border-collapse: collapse;
    border: none;

    .new{
      color: red;
      font-weight: bold;
    }

    th,td{
        font-size: .8rem;
        font-weight: 400;
        height: 2rem;
        line-height: .8rem;
        color:#000;
        border-bottom : 1px solid #ccc;
        border-top: 1px solid #ccc;

    }
    th{
        font-weight:500;
        background-color: #5EADF7;
        color: white;
    }
    tr:nth-child(even) {
        background-color: #F4F8FF;
    }
    .pageArea {
        align-items: center;
    }
`;


const MyMessage = () => {
    const navigate = useNavigate();
    const getId = window.localStorage.getItem("memberId");
    // 받은메세지
    const [msgData, setMsgData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    // 보낸메세지
    const [sentMsgData, setSentMsgData] = useState([]);
    const [sentCurrentPage, setSentCurrentPage] = useState(0);
    // 쪽지모달열고닫음
    const [openMsg, setOpenMsg] = useState(false);
    // 쪽지모달에게 정보전달
    const [msgProps, setMsgProps] = useState({
        messageNo: "",
        msg: "",
        icon: "",
        id:"",
        isOpened:"",
        name: "",
        title: "",
        contents: "",
        button: "",
      });
    //답장모달
    const [openReply, setOpenReply] = useState(false);
    const openToReply = () => {
        setOpenReply(true);
    }


    // 작성일자 yyyy-MM-dd 형식으로 변환
    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().substring(0, 10);
        return formattedDate;
    };

    const checkMsg = async() => {
      const msgList = await DDDApi.receivedMsg(getId);
      setMsgData(msgList.data);
    }
    useEffect(() => {
        checkMsg();
    }, []);

    const ITEMS_PAGE = 3;

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    }

    const pageCount = Math.ceil(msgData.length / ITEMS_PAGE);
    const offset = currentPage * ITEMS_PAGE;
    const currentPageData = msgData.slice(offset, offset + ITEMS_PAGE);

    useEffect(() => {
        const checkSentMsg = async() => {
            const sentMsgList = await DDDApi.sentMsg(getId);
            setSentMsgData(sentMsgList.data);
        }
        checkSentMsg();
    }, []);

    const handleSentMsgClick = (selectedPage) => {
        setSentCurrentPage(selectedPage.selected);

    }

    const ITEM_PAGE2 = 3;
    const pageCount2 = Math.ceil(sentMsgData.length / ITEM_PAGE2);
    const offset2 = sentCurrentPage * ITEMS_PAGE;
    const sentCurrentPageData = sentMsgData.slice(offset2, offset2 + ITEM_PAGE2);


    // 받은메세지 확인
const openToMsg = async (messageNo, senderId, isOpened, senderNickname, title, contents) => {
    // isOpened 값을 1로 변경
    await isOpenedCheck(messageNo, 1);

    // 쪽지로 보내줄 정보들
    setMsgProps({
        ...msgProps,
        messageNo: messageNo,
        msg: "받은메세지",
        icon: <MdOutlinePersonPin/>,
        id: senderId,
        isOpened: isOpened,
        name: senderNickname,
        title: title,
        contents: contents,
        button: [
            <Button className="message" onClick={closeMsg}>확인</Button>,
            <Button className="message" onClick={openToReply}>답장하기</Button>
        ]
    });
    setOpenMsg(true);
}

    // 보낸메세지 확인
    const openToSentMsg = (messageNo, receiverNickname, title, contents) => {
        setMsgProps({
            ...msgProps,
            messageNo: messageNo,
            msg: "보낸메세지",
            icon: <GiLoveLetter/>,
            name: receiverNickname,
            title: title,
            contents: contents,
            button: (<Button className="oneMessage" onClick={closeMsg}>확인</Button>)
        });
        setOpenMsg(true);
    }

    const closeMsg = () => {
        checkMsg();
        setOpenMsg(false);
    }

    // isOpened 값을 변경하는 함수
    const isOpenedCheck = async (messageNo, isOpened) => {
        await DDDApi.openedMsg(messageNo, isOpened);
    }

return (
  <>
  {openMsg && <ShowMsg props={msgProps} openReply={openReply}
    setOpenReply={setOpenReply}/>}
  <PostWrap>
    <div className='title' >내 쪽지함</div>
    <div className='moreBox'>
        <span>받은 쪽지함</span>
    </div>
    <Table>
        <thead>
            <tr>
                <th style={{width:'5%'}}></th>
                <th style={{width:'45%'}}>제목</th>
                <th style={{width:'25%'}}>보낸사람</th>
                <th style={{width:'25%'}}>작성일</th>
            </tr>
        </thead>
        <tbody>
        {currentPageData.length > 0 && currentPageData.map((receiveMsg) => (
          <tr key={receiveMsg.messageNo}>
          <td>
          {receiveMsg.isOpened === 0 ? <span className="new">new</span> : null}
          </td>
          <td
          style={{cursor: 'pointer' }}
          onClick={() => openToMsg(receiveMsg.messageNo,
              receiveMsg.senderId,
              receiveMsg.isOpened,
              receiveMsg.senderNickname,
              receiveMsg.title,
              receiveMsg.contents)}
          >{receiveMsg.title}</td>
          <td>{receiveMsg.senderNickname}</td>
          <td>{formatDate(receiveMsg.messageDate)}</td>
          </tr>
          ))}
          {currentPageData.length === 0 &&
            (
                <tr>
                    <td colSpan={6}>받은 메세지가 없습니다.🥲</td>
                </tr>
            )
        }
        </tbody>
    </Table>
    <div className="pageArea">
        <PageNation pageCount={pageCount} onPageChange={handlePageClick}/>
    </div>

    <div className="buffer"/>

    <div className='moreBox' style={{marginTop:'2rem'}}>
        <span>보낸 쪽지함</span>
    </div>
    <Table>
        <thead>
            <tr>
                <th style={{width:'50%'}}>제목</th>
                <th style={{width:'25%'}}>받는사람</th>
                <th style={{width:'25%'}}>보낸날짜</th>
            </tr>
        </thead>
        <tbody>
        {sentCurrentPageData.length > 0 && sentCurrentPageData.map((sent) => (
                <tr key={sent.messageNo}>
                    <td
                    style={{ cursor: 'pointer' }}
                    onClick={()=>openToSentMsg(sent.messageNo, sent.receiverNickname, sent.title, sent.contents)}
                      >{sent.title}
                    </td>
                    <td>{sent.receiverNickname}</td>
                    <td>{formatDate(sent.messageDate)}</td>
                </tr>
            ))
        }
        {
            sentCurrentPageData.length === 0 &&
            (
                <tr>
                    <td colSpan={6}>보낸 메세지가 없습니다.🥲 </td>
                </tr>
            )
        }
        </tbody>
      </Table>
      <PageNation pageCount={pageCount2} onPageChange={handleSentMsgClick}/>
  </PostWrap>
</>
);
};

export default MyMessage;