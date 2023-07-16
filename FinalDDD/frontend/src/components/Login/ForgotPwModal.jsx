import React from "react";  
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import LoginApi from "../../api/LoginApi";
import { useState } from "react";
import {FcKey} from 'react-icons/fc'
import { Backdrop } from "@mui/material";
import ConfirmModal from "../../util/ConfirmModal";

const Container = styled.div`
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    /* background-color: aqua; */


`;
const Modal = styled.div`
    width: 20vw;
    min-width: 400px;
    height: 50vh;
    min-height: 500px;
    background-color: white;
    border: 1px solid #999;
    position: absolute;
    top: 50%;
    right: 5%;
    transform: translate3d(-50%, -50%, 0);
    border-radius: 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 1440px) {
    width: 30%;
      }
  @media (max-width: 1024px) {
    position: relative;
    width: 50%;
    top: 50%;
    right: -50%;
    transform: translate3d(-50%, -50%, 0);
      }
  @media (max-width: 680px) {
    width: 100%;
    position: relative;
    transform: translate3d(-50%, -50%, 0);
      }
        .title{
            font-size: 1.5rem;
            font-weight: bold;
            margin-top: 3rem;

        }
        .inputBlock{
            width: 90%;
            /* background-color: aqua; */
            justify-content: center;
            align-items: center;
            display: flex;
            flex-direction: column;
            p{
                text-align: left;
                margin-bottom: 1.3rem;
                font-size: .8rem;
                /* font-size: .8rem; */
                text-align: center;
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
            height: 13rem;
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
`;

const ModalBodyStyle = styled.div`
.warn{
    height: 10px;
    font-size: 0.8rem;
    color: red;
    line-height: 1.2;
    background-color: red;
}`;

const buttonStlye = {
  backgroundColor:'#2B5EC2',
  marginTop:'1rem',


}



const ForgotPwModal = (props) => {

    const [inputEmail, setInputEmail]   = useState();
    const [open, setOpen] = useState(false);


    const deleteProps  ={
        title: "이메일 전송 완료",
        body: (
          <ModalBodyStyle>
            가입하신 이메일로  <br />
            새로운 비밀번호를 전송하였습니다. <br/>
            로그인 후, 비밀번호를 다시 설정해주세요🎉


        </ModalBodyStyle>
        ),
        button: [
        <button style={buttonStlye} onClick={()=>setOpen(false)}>확인</button>,
        ],
        icon: <FcKey/>
    }



    const onChangeEmail = (e) =>{
        setInputEmail(e.target.value);
        console.log(inputEmail)
    }



        const forgotPwData = async (inputEmail) => {
            console.log(inputEmail)
            try{
                const response = await LoginApi.findPassword(inputEmail);
                if (response.status === 200) {
                  setOpen(true);
                  console.log('email 전송 완료')
            }
          }catch(e) {
            console.log(e)
          }

        };


    return(
        <>
        <Container>
            <Modal>
                <p className="title">비밀번호 찾기</p>
                <div className="inputBlock">
                    <p>가입 시, 사용했던 이메일을 입력해주세요</p>
                    <input type="text" placeholder="Email@:DDD.com" onChange={onChangeEmail} value={inputEmail}/>
                </div>
                <div className="btnBlock">
                    <button onClick={forgotPwData}>이메일 보내기</button>
                    <button onClick={props.showLogin}>돌아가기</button>
                </div>
            </Modal>
        </Container>
        <Backdrop
                sx={{
                    backgroundColor: 'rgb(0,0,0,0.5)', // 배경색을 투명
                    opacity:'0.5',
                    color: 'black',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    top: 0, // 팝업을 상단에 위치
                }}
                open={open}
                onClick={()=>{setOpen(false) }}
                >
            {open &&  <ConfirmModal props={deleteProps}  minWidth='400px' minHeight="450px"/> }
        </Backdrop>
        </>

    )
}

export default ForgotPwModal;