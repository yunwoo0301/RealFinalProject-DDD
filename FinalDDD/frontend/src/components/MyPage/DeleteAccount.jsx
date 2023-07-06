import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 60%;
    height: 100%;
    /* background-color: #f96c6c; */
    /* padding-left: 1rem; */


    p {
        text-align: left;
        /* margin-left: 7%; */
        margin: 1rem 0 .3rem 0rem;
        font-weight: 400;
        line-height: 1.5rem;
        font-size: .8rem;
    }
    span{
        font-size: .9rem;
        font-weight: bold;
        margin: 1rem 0 .3rem 0rem;

    }
    .title {
        /* background-color: red; */
        height: 7%;
        font-weight: bold;
    }
    .textBlock{
        width: 90%;
        /* background-color: aqua; */
        justify-content: center;
        display: flex;
        flex-direction: column;
        /* padding-left:1rem; */
        .desc{
            font-weight: 400;
            line-height: 1.5rem;
            font-size: .8rem;
        }
    }
    .inputBlock{
        /* background-color: blue; */
        width:100%;
        display: flex;
        /* padding-left: 1rem; */
        margin-top: 1.4rem;

        input{
            width: 80%;
            height: 1.6rem;
            background-color: #F4F8FF;
            border: 1px solid #5EADF7;
            /* margin: 0; */
            border-radius: .3rem;
            padding-left: .8rem;
            ::placeholder{
                font-size: .6rem;
            }
        }
        input:focus{
            background-color: #5EADF7;
            outline: none;
            color: white;
            ::placeholder{
            color: #F4F8FF;
            }
        }

    }
    .btnBlock{
        height: 6rem;
        width: 100%;
        display: flex;
        justify-content: center;
        /* background-color: red; */

        button{
            width: 26%;
            height: 2.2rem;
            border-radius: 3rem;
            margin : 3rem .6rem;
            background-color: #2B5EC2 ;
            border: 1px solid #F4F8FF;
            color: white;
            font-size: .8rem;
            cursor: pointer;
            /* float : right; */
            display: flex;
            justify-content:center;
            align-items: center;
        }
    }
`;

const DeleteAccount = () => {
    return (
        <>
            <Container>
                <div className='title'>회원탈퇴</div>
                <div className="textBlock">
                    <span> :DDD 에서 회원을 탈퇴하시겠습니까?</span>
                    <p>
                    - 탈퇴하신 이메일은 다시 사용이 불가능합니다. <br/>
                    - 이메일과 비밀번호를 다시 한 번 입력해주세요.</p>
                </div>
                <div className="inputBlock">
                    <div>
                    <p>이메일</p>
                    <input type="text" placeholder="Email@:DDD.com"/>
                    </div>
                    <div>
                    <p>비밀번호</p>
                    <input type="password" placeholder="비밀번호를 입력하세요"/> 
                    </div>
                </div>
                <div className="btnBlock">
                    <button>탈퇴하기</button>
                    <button>돌아가기</button>
                </div>
                
            </Container>
            
        </>
    );
};

export default DeleteAccount;