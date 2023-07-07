import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { MyPageApi } from '../../api/MyPageApi';
import Functions from '../../util/Functions';
import AlertModal from '../../util/Alert';

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
        height: 40%;
        display: flex;
        /* padding-left: 1rem; */
        margin-top: 1.0rem;
        display: flex;
        flex-direction: column;
        .pwBox{
            display: flex;
            flex-direction: column;
            width: 50%;
            float: right;
            .hint{
                /* background-color: red; */
                width: 86%;
                height: 1rem;
                text-align: right;
                font-size: .7rem;
            }
        }

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



const ChangePwd = () => {

    const memberId = Functions.getMemberId();
    const [inputCurrentPwd , setInputCurrentPwd] = useState();
    const [inputNewPwd , setInputNewPwd] = useState();
    const [inputNewPwdCheck , setInputNewPwdCheck] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [conMessage, setConMessage] = useState();
    const [ isPwd, setIsPwd ] = useState(false);
    const [pwdCheck, setPwdCheck] = useState(false);
    
    const msg = {
        regex: "숫자+영문자+특수문자의 8자리 이상",
        correct: "올바른 형식 입니다.",
        match: '비밀번호가 일치합니다.',
        mismatch: '새로운 비밀번호가 일치하지 않습니다.',
        error : '변경이 실패하였습니다. '
        
      }
      

    // 새 비밀번호 유효성 검사
    const onChangePwd = (e) => {
        setInputNewPwd(e.target.value);
        const regexPwd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        const pwdCheck = regexPwd.test(e.target.value);
        if (!pwdCheck) {
            setErrorMessage(msg.regex);
            setIsPwd(false);    
        } else {
            setErrorMessage(msg.correct);
            setIsPwd(true);
        }
    }
    
    const onChangeConPw = (e) => {
        setInputNewPwdCheck(e.target.value);
        if(e.target.value !== inputNewPwd) {
            setConMessage(msg.mismatch);
            setPwdCheck(false);
        } else {
            setConMessage(msg.match);
            setPwdCheck(true);
        }
    }

    const onChangeCurrentPw = (e) => {
        setInputCurrentPwd(e.target.value)
    }
    
      
const pwdFetchDate = async () => {
    try {
      const response = await MyPageApi.password(memberId, inputCurrentPwd, inputNewPwd);
      if (response.status === 200) {
      } else {
        setErrorMessage(msg.error);
      }
    } catch (e) {
      console.log(e);
      setErrorMessage(msg.error + 'catch e');
    }
  };

    const onClickChange = () => {
        pwdFetchDate();
        setOpen(true);
        setTimeout(handleClose, 1000)
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
        <>
            <Container>
                <div className='title'>비밀번호 변경</div>
                <div className="textBlock">
                    <p>
                    비밀번호 변경을 위하여 <br/>
                    현재 비밀번호와 새로운 비밀번호를 입력해주세요.</p>
                </div>
                <div className="inputBlock">
                    <div className='pwBox'>
                        <p>현재 비밀번호 </p>
                        <input type="password" placeholder="Email@:DDD.com" onChange={(e)=>{onChangeCurrentPw(e)}} value={inputCurrentPwd} tabIndex={1}/>
                        {/* <div className="hint">{errorMessage}</div> */}
                    </div>
                    <div className='rowBox'>
                    <div className='pwBox'>
                        <p>새 비밀번호 확인</p>
                        <input type="password" placeholder="비밀번호를 입력하세요"  onChange={(e) => onChangeConPw(e)} value={inputNewPwdCheck} tabIndex={3}/> 
                        <div className="hint">{conMessage}</div>
                    </div>
                    <div className='pwBox'>
                        <p>새 비밀번호</p>
                        <input type="password" placeholder="비밀번호를 입력하세요"  onChange={(e) => onChangePwd(e)} value={inputNewPwd} tabIndex={2}/> 
                        <div className="hint">{errorMessage}</div>
                    </div>

                    </div>
                </div>

                <div className="btnBlock">
                <button 
                        style={isPwd && pwdCheck ?  null : { backgroundColor: '#ddd'}  }
                        disabled={!isPwd || !pwdCheck }
                    onClick={onClickChange}>변경</button>
                    {
                        open && <AlertModal />
                    }
                    <button>돌아가기</button> 
                </div>
                
            </Container>
        </>
    );
};

export default ChangePwd;
