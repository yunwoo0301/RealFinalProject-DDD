import React from "react";
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    /* background-color: aqua; */
    

`;
const Modal = styled.div`
    width: 24vw;
    min-width: 350px;
    height: 60vh;
    background-color: white;
    position: absolute;
    top: 50%;
    right: 5%;
    transform: translate3d(-50%, -50%, 0);
    border-radius: 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
        .title{
            font-size: 1.5rem;
            font-weight: bold;
            margin-top: 3rem;
            text-align: center;

        }
        .inputBlock{
            width: 90%;
            /* background-color: aqua; */
            p{
                text-align: left;
                margin-left: 10%;
                margin-bottom: .3rem;
                font-size: .8rem;
                /* font-size: .8rem; */
                font-weight: bold;
            }
            input{
                width: calc(80% - 0.8rem);
                height: 30px;
                background-color: #F4F8FF;
                border: 1px solid #5EADF7;
                /* margin: 0; */
                border-radius: .3rem;
                padding-left: .8rem;


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
            width: 90%;
            display: flex;
            justify-content: center;
            align-items: center;
            /* background-color: red; */

            button{
                width: 35%;
                height: 2.3rem;
                border-radius: 3rem;
                margin : 0 6px;
                background-color: #050E3D ;
                border: 1px solid #F4F8FF;
                color: white;
                font-size: .8rem;
                cursor: pointer;
                /* float : right; */
                display: flex;
                justify-content:center;
                align-items: center;
                div{
                    background-color: #6F4F28;
                    width: 10px;
                    height: 10px;
                    border-radius: 5px;
                    margin-right: 3px;
                }

            }
        }
        .AskBlock{
            width: 70%;
            height: 4rem;
            /* background-color: aqua; */
            display: flex;
            justify-content: space-between;
            align-items: end;
            p{
                margin-bottom: .3rem;
                font-size: .75rem;
                text-decoration: underline;
                cursor: pointer; 
            }
        }
`;

const LoginModal = () => {

    return(
        <Container>
            <Modal>
                <p className="title">안녕하세요! <br/> :DDD에 로그인해보세요</p>
                <div className="inputBlock">
                    <p>이메일</p>
                    <input type="text" placeholder="Email@:DDD.com"/>
                    <p>패스워드</p>
                    <input type="password" placeholder="Password"/>
                </div>
                <div className="btnBlock">
                    <button>로그인</button>
                    <button style={{backgroundColor:'#F9E000', color:'#6F4F28'}}><div></div>카카오로그인</button>
                </div>
                <div className="AskBlock">
                    <p>:DDD가 처음이신가요?</p>
                    <p>비밀번호를 잊어버리셨나요?</p>
                </div>
            </Modal>
        </Container>
    )
}

export default LoginModal;