import React from 'react';
import styled from 'styled-components';
import PageNation from '../../util/PageNation';



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
                        <th style={{width:'8%'}}>번호</th>
                        <th style={{width:'10%'}}>카테고리</th>
                        <th style={{width:'42%'}}>제목</th>
                        <th style={{width:'18%'}}>작성자</th>
                        <th style={{width:'7%'}}>조회수</th>
                        <th style={{width:'15%'}}>작성일</th>
                    </tr>
                </thead>
                <tbody>
                {/* {
                   currentPageData.length > 0 && currentPageData.map((post, index) => (
                        <tr key={index}>
                        <td>{post.boardNo}</td> 
                        <td>{post.category}</td> 
                        <td
                            style={{ textAlign: 'left', paddingLeft: '.6rem', cursor: 'pointer' }}
                            onClick={() => handleTitleClick(post.boardNo)}>{post.title}
                        </td>
                        <td>{post.author}</td> 
                        <td >{post.views}</td> 
                        <td>{formatDate(post.writeDate)}</td> 
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
                } */}
                </tbody>
            </Table>
            <div className="pageArea">
                {/* <PageNation pageCount={pageCount} onPageChange={handlePageClick}/> */}
            </div>

            <div className="buffer"/>

            <div className='moreBox' style={{marginTop:'2rem'}}>
                <span>보낸 쪽지함</span>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th style={{width:'8%'}}>번호</th>
                        <th style={{width:'10%'}}>카테고리</th>
                        <th style={{width:'42%'}}>내용</th>
                        <th style={{width:'18%'}}>작성자</th>
                        <th style={{width:'14%'}}>작성일</th>
                    </tr>
                </thead>
                <tbody>
                {/* {
                    currentSecData.length > 0 && currentSecData.map((comment, index) => (
                        <tr key={index}>
                            <td>{comment.commentNo}</td> 
                            <td>{comment.category}</td> 
                            <td style={{textAlign:'left', paddingLeft:'.6rem'}}>{comment.content}</td> 
                            <td
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleTitleClick(comment.boardNo)}>{comment.content}
                            </td> 
                            <td>{comment.nickname}</td>  
                            <td>{formatDate(comment.writeDate)}</td> 
                        </tr>
                    ))
                }
                {
                    currentSecData.length === 0 && 
                    (
                        <tr>
                            <td colSpan={6}>작성 한 댓글이 없습니다. </td>
                        </tr>
                    )
                } */}
                </tbody>
            </Table>
            {/* <PageNation pageCount={pageCount2} onPageChange={handleCommentPageClick}/>  */}
        </PostWrap>
    </>
    );
};

export default MyMessage;