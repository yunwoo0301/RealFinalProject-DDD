import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DDDApi from '../../api/DDDApi';
import { useNavigate } from 'react-router-dom';
import PageNation from '../../util/PageNation';



const PostWrap = styled.div`
    width: calc(100% - 2rem);
    height: 100%;
    padding-left: 2.5rem;
    p {
        text-align: left;
        margin: 0rem 0 .3rem 0;
        font-size: 1rem;
        font-weight: bold;
    }
    .title {
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
        border-bottom : 1px solid #ddd;
    }
`;

const Table = styled.table`
    width: 92%;
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


const MyPost = ({ memberId }) => {

    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    const fetchPost = async (memberId) => {
        try {
            const response = await DDDApi.getBoardsByMember(memberId);
            setPosts(response.data);
        } catch (error) {
            console.error('게시글 정보를 불러오지 못했습니다', error);
        }
    };

    const fetchComments = async (memberId) => {
        try {
            const response = await DDDApi.commentLoad(memberId);
            setComments(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('댓글 정보를 불러오지 못했습니다', error);
        }
    };

    // 한줄평
    const [exhibitComment, setExhibitComment] = useState([]);

    useEffect(() => {
        const getExhibitComment = async() => {
            const exhibitCommentData = await DDDApi.myExhibitComments(memberId);
            setExhibitComment(exhibitCommentData.data);
        }
        getExhibitComment();
    }, [])


    // 로그인 했을 시 회원 ID 값을 받아오기 위해
    useEffect(() => {
        fetchPost(memberId);
        fetchComments(memberId);
    }, [memberId]);


    // 작성일자 yyyy-MM-dd 형식으로 변환
    const formatDate = (date) => {
        const year = date.toString().substring(0, 4);
        const month = date.toString().substring(5, 7);
        const day = date.toString().substring(8, 10);
        return `${year}-${month}-${day}`;
};


    // 타이틀 클릭 시 해당 게시물로 이동
    const handleTitleClick = (no) => {
        navigate(`/boardList/boardView/${no}`, { state : {memberId} });
    };


    // 페이지 네이션
    const ITEMS_PAGE = 3;
    const [currentPage, setCurrentPage] = useState(0);
    const [currentCommentPage, setCurrentCommentPage] = useState(0);
    const [currentExhibitPage, setCurrentExhibitPage] = useState(0);

    // 게시글 페이지 넘기기
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    // 댓글 페이지 넘기기
    const handleCommentPageClick = (selectedPage) => {
        setCurrentCommentPage(selectedPage.selected);
    };

    // 한줄평 페이지 넘기기
    const handleExhibitPageClick = (selectedPage) => {
        setCurrentExhibitPage(selectedPage.selected);
    }


    const offset = currentPage * ITEMS_PAGE;
    const comoffset = currentCommentPage * ITEMS_PAGE;
    const exhibitOffset = currentExhibitPage * ITEMS_PAGE;

    const currentPageData = posts.slice(offset, offset + ITEMS_PAGE); // 게시글
    const currentSecData = comments.slice(comoffset, comoffset + ITEMS_PAGE); // 댓글
    const exhibitCurrentData = exhibitComment.slice(exhibitOffset, exhibitOffset + ITEMS_PAGE);
    const pageCount = Math.ceil(posts.length / ITEMS_PAGE);
    const pageCount2 = Math.ceil(comments.length / ITEMS_PAGE);
    const pageCount3 = Math.ceil(exhibitComment.length / ITEMS_PAGE);

    return (
        <>
            <PostWrap>

                <div className='title' >내 게시물</div>
                <div className='moreBox'>
                    <span>내가 쓴 글</span>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th style={{width:'8%'}}>번호</th>
                            <th style={{width:'10%'}}>카테고리</th>
                            <th style={{width:'50%'}}>제목</th>
                            <th style={{width:'18%'}}>작성자</th>
                            <th style={{width:'14%'}}>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                       currentPageData.length > 0 && currentPageData.map((post, index) => (
                            <tr key={index}>
                            <td>{post.boardNo}</td>
                            <td>{post.category}</td>
                            <td
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleTitleClick(post.boardNo)}>{post.title}
                            </td>
                            <td>{post.author}</td>
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
                    }
                    </tbody>
                </Table>
                <div className="pageArea">
                    <PageNation pageCount={pageCount} onPageChange={handlePageClick}/>
                </div>

                <div className="buffer"/>

                <div className='moreBox' style={{marginTop:'2rem'}}>
                    <span>내가 쓴 댓글</span>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th style={{width:'8%'}}>번호</th>
                            <th style={{width:'10%'}}>카테고리</th>
                            <th style={{width:'50%'}}>내용</th>
                            <th style={{width:'18%'}}>작성자</th>
                            <th style={{width:'14%'}}>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        currentSecData.length > 0 && currentSecData.map((comment, index) => (
                            <tr key={index}>
                                <td>{comment.commentNo}</td>
                                <td>{comment.category}</td>
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
                    }
                    </tbody>
                </Table>
                <PageNation pageCount={pageCount2} onPageChange={handleCommentPageClick}/>

                <div className='moreBox' style={{marginTop:'2rem'}}>
                    <span>내가 쓴 한줄평</span>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th style={{width:'30%'}}>전시회명</th>
                            <th style={{width:'10%'}}>별점</th>
                            <th style={{width:'40%'}}>한줄평</th>
                            <th style={{width:'20%'}}>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {exhibitCurrentData.length > 0 && exhibitCurrentData.map((exhibit) => (
                            <tr key={exhibit.commentNo}>
                                <td>{exhibit.exhibitName}</td>
                                <td>{exhibit.starRates}</td>
                                <td>{exhibit.comment}</td>
                                <td>{formatDate(exhibit.commentTime)}</td>
                            </tr>
                        ))
                    }
                    {exhibitCurrentData.length === 0 &&
                        (
                            <tr>
                                <td colSpan={6}>작성 한 한줄평이 없습니다. </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
                <PageNation pageCount={pageCount3} onPageChange={handleExhibitPageClick}/>
            </PostWrap>
        </>
    );
};

export default MyPost;