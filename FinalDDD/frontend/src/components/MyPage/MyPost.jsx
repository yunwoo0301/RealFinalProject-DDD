import React, { useEffect } from 'react';
import styled from 'styled-components';
import { dummy_reply } from './Data'
import useStore from '../../store';
import DDDApi from '../../api/DDDApi';
import { useNavigate } from 'react-router-dom';
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

    // 로그인 했을 시 회원 ID 값을 받아오기 위해
    useEffect(() => {
        fetchPost(memberId);
        fetchComments(memberId);
    }, [memberId]);


    const slicedPosts = posts.slice(0, 5); // 게시글 5개로 나눠서 노출
    const slicedComments = comments.slice(0, 5); // 댓글 5개로 나눠서 노출


    // 작성일자 yyyy-MM-dd 형식으로 변환
    const formatDate = (date) => {
        const year = date.toString().substring(0, 4);
        const month = date.toString().substring(5, 7);
        const day = date.toString().substring(8, 10);
        return `${year}-${month}-${day}`;
};


    // 타이틀 클릭 시 해당 게시물로 이동
    const handleTitleClick = (no) => {
        navigate(`/boardList/boardView/${memberId}`);
    };

    // 페이지 네이션
    const ITEMS_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const offset = currentPage * ITEMS_PAGE;
    const currentPageData = slicedPosts.slice(offset, offset + ITEMS_PAGE);
    const pageCount = Math.ceil(slicedPosts.length / ITEMS_PAGE);






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
                            <th style={{width:'42%'}}>제목</th>
                            <th style={{width:'18%'}}>작성자</th>
                            <th style={{width:'7%'}}>조회수</th>
                            <th style={{width:'15%'}}>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                       currentPageData.length > 0 && currentPageData.map((post, index) => (
                            <tr key={index}>
                            <td>{post.boardNo}</td>
                            <td>{post.category}</td>
                            <td
                                style={{ textAlign: 'left', paddingLeft: '.6rem', cursor: 'pointer' }}
                                onClick={() => handleTitleClick(post.memberId)}>{post.title}
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
                            <th style={{width:'42%'}}>내용</th>
                            <th style={{width:'18%'}}>작성자</th>
                            <th style={{width:'14%'}}>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        slicedComments.length > 0 && slicedComments.map((comment, index) => (
                            <tr key={index}>
                                <td>{comment.commentNo}</td>
                                <td>{comment.category}</td>
                                {/* <td style={{textAlign:'left', paddingLeft:'.6rem'}}>{comment.content}</td>  */}
                                <td>{comment.content}</td>
                                <td>{comment.nickname}</td>
                                <td>{formatDate(comment.writeDate)}</td>
                            </tr>
                        ))
                    }
                    {
                        slicedComments.length === 0 &&
                        (
                            <tr>
                                <td colSpan={6}>작성 한 댓글이 없습니다. </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
                <PageNation pageCount={pageCount} onPageChange={handlePageClick}/>
            </PostWrap>
        </>
    );
};

export default MyPost;