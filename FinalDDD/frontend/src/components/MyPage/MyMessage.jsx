import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PageNation from '../../util/PageNation';
import DDDApi from '../../api/DDDApi';



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
    const getId = window.localStorage.getItem("memberId");
    // 받은메세지
    const [msgData, setMsgData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    // 보낸메세지
    const [sentMsgData, setSentMsgData] = useState([]);
    const [sentCurrentPage, setSentCurrentPage] = useState(0);


    // 작성일자 yyyy-MM-dd 형식으로 변환
    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().substring(0, 10);
        return formattedDate;
    };

    useEffect(() => {
        const checkMsg = async() => {
            const msgList = await DDDApi.receivedMsg(getId);
            setMsgData(msgList.data);
            console.log("메세지들어오는거  : ", msgList.data);
        }
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


    return (
        <>
        <PostWrap>

            <div className='title' >내 쪽지함</div>
            <div className='moreBox'>
                <span>받은 쪽지함</span>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th style={{width:'42%'}}>제목</th>
                        <th style={{width:'18%'}}>보낸사람</th>
                        <th style={{width:'14%'}}>작성일</th>
                    </tr>
                </thead>
                <tbody>
                {
                   currentPageData.length > 0 && currentPageData.map((post, index) => (
                        <tr key={index}>
                        <td
                            style={{cursor: 'pointer' }}
                            onClick={(post.messageNo)}>{post.title}
                        </td>
                        <td>{post.senderNickname}</td>
                        <td>{formatDate(post.messageDate)}</td>
                        </tr>
                    ))
                }
                    {
                    currentPageData.length === 0 &&
                    (
                        <tr>
                            <td colSpan={6}>작성 한 게시글이 없습니다. </td>
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
                        <th style={{width:'42%'}}>제목</th>
                        <th style={{width:'18%'}}>받는사람</th>
                        <th style={{width:'14%'}}>보낸날짜</th>
                    </tr>
                </thead>
                <tbody>
                {sentCurrentPageData.length > 0 && sentCurrentPageData.map((sent, index) => (
                        <tr key={index}>
                            <td
                            style={{ cursor: 'pointer' }}
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
                            <td colSpan={6}>작성 한 댓글이 없습니다. </td>
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