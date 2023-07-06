import React, { useEffect } from 'react';
import styled from 'styled-components';
import { dummy_reply } from './Data'
import useStore from '../../store';
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
        height: 10%;
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
`;


const MyPost = ({ memberId, posts, setPosts}) => {

    const fetchPost = async (memberId) => {
        try {
            const response = await DDDApi.getBoardsByMember(memberId);
            setPosts(response.data);
        } catch (error) {
            console.error('Failed to fetch posts', error);
        }
    };

    // 로그인했을 시 회원 ID의 값을 받아오기 위해
    useEffect(() => {
        fetchPost(memberId);
    }, [memberId]);


    const slicedPosts = posts.slice(0, 5); // 게시글 5개로 나눠서 노출
    const slicedReplies = dummy_reply.slice(0, 5);


    // 작성일자 yyyy-MM-dd 형식으로 변환
    const formatDate = (date) => {
        const formattedDate = new Date(date).toISOString().substring(0, 10);
        return formattedDate;
    };




    return (
        <>
            <PostWrap>

                <div className='title' >내 게시물</div>
                <div className='moreBox'>
                    <span>내가 쓴 글</span>
                    <span onClick={()=>{}} className='seeMore'>더 보기</span>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th style={{width:'8%'}}>번호</th>
                            <th style={{width:'10%'}}>카테고리</th>
                            <th style={{width:'42%'}}>제목</th>
                            <th style={{width:'18%'}}>작성자</th>
                            <th style={{width:'8%'}}>조회수</th>
                            <th style={{width:'14%'}}>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                       slicedPosts.length > 0 && slicedPosts.map((post, index) => (
                            <tr key={index}>
                            <td>{post.boardNo}</td>
                            <td>{post.category}</td>
                            <td style={{textAlign:'left', paddingLeft:'.6rem'}}>{post.title}</td>
                            <td>{post.author}</td>
                            <td >{post.views}</td>
                            <td>{formatDate(post.writeDate)}</td>
                            </tr>
                        ))
                    }
                                        {
                        slicedPosts.length === 0 &&
                        (
                            <tr>
                                <td colSpan={6}>작성 한 게시글이 없습니다. </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>

                <div className="buffer"/>

                <div className='moreBox' style={{marginTop:'2rem'}}>
                    <span>내가 쓴 댓글</span>
                    <span onClick={()=>{}} className='seeMore'>더 보기</span>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th style={{width:'8%'}}>번호</th>
                            <th style={{width:'10%'}}>카테고리</th>
                            <th style={{width:'42%'}}>제목</th>
                            <th style={{width:'18%'}}>작성자</th>
                            <th style={{width:'8%'}}>조회수</th>
                            <th style={{width:'14%'}}>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        dummy_reply.length > 0 && slicedReplies.map((reply, index) => (
                            <tr key={index}>
                                <td>{reply.no}</td>
                                <td>{reply.category}</td>
                                <td style={{textAlign:'left', paddingLeft:'.6rem'}}>{reply.title}</td>
                                <td>{reply.nickName}</td>
                                <td>{reply.view}</td>
                                <td>{reply.date}</td>
                            </tr>
                        ))
                    }
                    {
                        dummy_reply.length === 0 &&
                        (
                            <tr>
                                <td colSpan={6}>작성 한 댓글이 없습니다. </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>

            </PostWrap>
        </>
    );
};

export default MyPost;