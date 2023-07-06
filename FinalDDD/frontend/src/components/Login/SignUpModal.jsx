import React, { useState } from "react";
import styled from "styled-components";
import LoginApi from "../../api/LoginApi";
import Backdrop from '@mui/material/Backdrop';

const Container = styled.div`
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    /* background-color: aqua; */
    

`;
const Modal = styled.div`
    width: 40vw;
    min-width: 600px;
    height: 70vh;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    border-radius: 1.4rem;
    border: 1px solid #999;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;

        .title{
            font-size: 1.5rem;
            font-weight: bold;
            text-align: center;
            margin :3rem 0 0.2rem 0 ;
        }
        .wrap{
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
        }

        .inputBlock{
            width: 90%;
            /* background-color: aqua; */
            padding-left: 3vw;
            p{
                text-align: left;
                /* margin-left: 7%; */
                margin: 0 0 .3rem 0;
                font-size: .8rem;
                /* font-size: .8rem; */
                font-weight: bold;
            }
            input{
                width: calc(70% - 0.8rem);
                background-color: #F2F2F2;    
                /* border: 1px solid #5EADF7; */
                /* opacity: 0; */
                border: none;
                color: black;
                /* margin: 0; */
                /* padding-left: 0.8rem; */
                /* border-top-left-radius : .3rem;
                border-bottom-left-radius : .3rem; */
                ::placeholder{
                color: #000;
                }
            }
            input:focus{
                /* background-color: #5EADF7; */
                outline: none;
                /* color: white; */
                ::placeholder{
                color: #2B5EC2;
                }
            }
            .regCheckBox{
                /* background-color: red; */
                width: 10%;
                height: 100%;
                margin: 0, 1px;
                justify-content: center;
                align-items: center;
                display: flex;
            }
            .textBox{
                display: flex;
                height: 2rem;
                background-color: #F2F2F2;
                width: 80%;
                justify-content: space-around;
                border-radius: .3rem;
            }



        }
        .btnBlock{
            height: 30%;
            width: 90%;
            display: flex;
            justify-content: center;
            /* background-color: red; */

            button{
                width: 22%;
                height: 2.3rem;
                border-radius: 3rem;
                margin : 0 1rem;
                background-color: #050E3D ;
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
        .hint{
            font-size: .3rem;
            text-align:center;
            display: flex;
            width: 80%;
            justify-content: right;
            height: 1rem;

        }
`;
const LeftBox = styled.div`
    width: 50%;
    height: calc(50%-2rem);
    /* background-color: aqua; */
    padding-top: 2rem;
    min-width: 300px;
`;
const RightBox = styled.div`
    width: 50%;
    height: calc(80%-2rem);
    /* background-color: red; */
    padding-top: 2rem;
    min-width: 300px;

`;
const True = styled.div`
    width: 1.3rem;
    height: 1.3rem;
    border-radius: .8rem;
    background-color: #2B5EC2;
    display: flex;
    justify-content: center;
    align-items : center;
    color : white;
    padding: 0;
    margin: 0;
    span{
        font-size: .4rem;
        margin:0;
    }
`;
const False = styled(True)`
    background-color: #ED4E4E;
`;

const SignUpModal = (props) => {
    // 이메일 유효성 검사 useState
    const [inputEmail, setInputEmail] = useState('')
    const [emailMessage,  setEmailMessage] = useState('')
    const [isEmail, setIsEmail] =useState(false)
    // 패스워드 유효성 검사 useState
    const [inputPwd, setInputPwd] = useState('')
    const [pwdMessage,  setPwdMessage] = useState('')
    const [isPwd, setIsPwd] =useState(false)
    // 비밀번호 확인 useState
    const [inputConPw, setInputConPw] = useState("");
    const [conPwMessage, setConPwMessage] = useState("");
    const [isConPw, setIsConPw] = useState("");
    // 닉네임 확인 useState
    const [inputNick, setInputNick] = useState("");
    const [nickMessage, setNickMessage] = useState("");
    const [isNick, setIsNick] = useState("");
    // 연락처 확인 useState
    const [inputTel, setInputTel] = useState("");
    const [telMessage, setTelMessage] = useState("");
    const [isTel, setIsTel] = useState("");
    // 이름 확인 useState
    const [inputName, setInputName] = useState("");
    const [nameMessage, setNameMessage] = useState("");
    const [isName, setIsName] = useState("");
    // 인스타그램 useState
    const [inputIns, setInputIns] = useState("");
    const [insMessage, setInsMessage] = useState("");
    const [isIns, setIsIns] = useState("");




    // 이메일 유효성 검사 
    const onChangeEmail = (e) => {
        const emailCurrent = e.target.value ;
        setInputEmail(emailCurrent);
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailCheck = regexEmail.test(emailCurrent);
    
        if (!emailCheck) {
            setEmailMessage("이메일 형식으로 입력해주세요");
            setIsEmail(false);    
        } else {
            // 이메일 형식이 올바르면 중복 검사를 수행합니다.
            checkEmailDuplication(emailCurrent);
        }
    };

    const checkEmailDuplication = async (email) => {
        try {
            const response = await LoginApi.emaildup(email);
            if (response.status === 200) {
                // console.log('이메일 중복 체크 중');
                // console.log(response.data)
                if(!response.data) {
                    setEmailMessage("해당 이메일은 이미 사용 중입니다.");
                    setIsEmail(false);
                } else {
                    setEmailMessage("사용하실 수 있는 이메일 입니다.");
                    setIsEmail(true);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    // 닉네임 체크 
    const onChangeNick = (e) => {
        const nickCurrent = e.target.value;
        setInputNick(nickCurrent);
        nickDuplication(nickCurrent);
    }

    const nickDuplication = async (nickname) => {
        try {
            const response = await LoginApi.nicknamedup(nickname);
            if (response.status === 200) {
                console.log('닉네임 중복 체크 중');
                console.log(response.data)
                if(!response.data) {
                    setNickMessage("해당 닉네임은 이미 사용 중입니다.");
                    setIsNick(false);
                } else {
                    setNickMessage("사용가능한 닉네입입니다. ");
                    setIsNick(true);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    // 비밀번호 정규식 검사 
    const onChangePwd = (e) => {
        setInputPwd(e.target.value)
        const regexPwd = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        const pwdCheck = regexPwd.test(e.target.value);
        // console.log(inputPwd)
        // console.log(pwdCheck)
        if (!pwdCheck) {
            setPwdMessage("숫자+영문자+특수문자의 8자리 이상");
            setIsPwd(false);    
        } else {
            setPwdMessage("올바른 형식 입니다.");
            setIsPwd(true);
            console.log(`isPwd값 : ${isPwd} `)
        }
    }
    // 비밀번호 확인 체크 
    const onChangeConPw = (e) => {
        const passwordCurrent = e.target.value;
        setInputConPw(passwordCurrent);
        
        if (passwordCurrent === inputPwd) {
          setConPwMessage('비밀 번호가 일치합니다.');
      
          setIsConPw(true);
          // 1초의 타이머 설정
          setTimeout(() => {
            console.log(`isConPwd값: ${isConPw}`);
            console.log(passwordCurrent);
          }, 1000);
        } else {
          setConPwMessage('비밀 번호가 일치하지 않습니다.');
          setIsConPw(false);
        }
      };
      


    const onChangeTel = (e) => {
        const telCurrent = e.target.value;
        setInputTel(telCurrent);
        if (telCurrent.length === 11 && !isNaN(telCurrent)) {
            const formattedTel = telCurrent
              .replace(/ /g, '') // 공백이 들어있다면 지워주고
              .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3'); // 숫자 그룹을 나눠 사이에 하이픈(-) 추가
            setInputTel(formattedTel);
            setIsTel(true);
            setTelMessage('올바른 형식의 연락처입니다.')
            console.log(`isTel값 : ${isTel} `)
          }
        else{
            setIsTel(false)
            setTelMessage('11자리의 숫자를 입력해주세요')
        }
    }


    const onChangeName = (e) => {
        const nameCurrent = e.target.value;
        setInputName(nameCurrent);
      
        if (nameCurrent.length > 0 && isNaN(nameCurrent)) {
          setIsName(true);
          setNameMessage(`안녕하세요 ${nameCurrent}님`);
          console.log(`isName값 : ${isName} `)
        } else {
          setIsName(false);
          setNameMessage('이름을 입력해주세요');
        }
      };

    const onChangeIns = (e) => {
        const insCurrent = e.target.value;
        setInputIns(insCurrent);
        
        if (insCurrent.length > 0) {
            setInsMessage(`@${insCurrent}`);
          } else {
            setInsMessage('');
          }
    }
    // const btnActive = () => {
    //     if (isEmail && isPwd  && isName ) {
    //         console.log(isEmail + isPwd + isConPw + isName + isTel);
    //         console.log(btnActive);
    //       return true;
    //     }
    //     return false;
    // };

    
const onClickSignup = () => {
    const signupFetchDate = async () => {
        console.log('클릭됨');
        try {
          const response = await LoginApi.signup(
            inputEmail,
            inputPwd,
            inputNick,
            inputName,
            inputTel,
            inputIns
          );
          console.log('리스폰 데이터', response);
          if (response.status === 200) {
            console.log('회원가입이 되었습니다.');
            props.showPopup()
          }
        } catch (e) {
          console.log(e);
        }
      };
      
    signupFetchDate();
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

    return(
        <Container>
            <Modal>
                <p className="title">회원가입</p>
                <div className="wrap">
                    <LeftBox>
                        <div className="inputBlock">
                            <p>이메일</p>
                            <div className="textBox">
                                <input type="text" placeholder="Email@:DDD.com" value={inputEmail} onChange={onChangeEmail}/>
                                <div className="regCheckBox">{isEmail ? <True> <span>&#10003;</span>  </True> : <False> <span>X</span> </False>}</div> 
                            </div>
                            <div className="hint">{emailMessage}</div>
                            <p>패스워드</p>
                            <div className="textBox">
                                <input type="password" placeholder="Password" value={inputPwd} onChange={onChangePwd}/>
                                <div className="regCheckBox">{isPwd ? <True> <span>&#10003;</span>  </True> : <False> <span>X</span> </False>}</div> 
                            </div>
                            <div className="hint">{pwdMessage}</div>
                            <p>패스워드 확인</p>
                            <div className="textBox">
                                <input type="password" placeholder="Password" value={inputConPw} onChange={onChangeConPw}/>
                                <div className="regCheckBox">{isConPw ? <True> <span>&#10003;</span>  </True> : <False> <span>X</span> </False>}</div> 
                            </div>
                            <div className="hint">{conPwMessage}</div>
                            <p>닉네임</p>
                            <div className="textBox">
                                <input type="text" placeholder="닉네임을 입력해주세요" value={inputNick} onChange={onChangeNick}/>
                                <div className="regCheckBox">{isNick ? <True> <span>&#10003;</span>  </True> : <False> <span>X</span> </False>}</div> 
                            </div>
                            <div className="hint">{nickMessage}</div>
                        </div>

                    </LeftBox>
                    <RightBox>
                        <div className="inputBlock">
                            <p>이름</p>
                            <div className="textBox">
                                <input type="text" placeholder="이름을 입력해주세요" value={inputName} onChange={onChangeName}/>
                                <div className="regCheckBox">{isName ? <True> <span>&#10003;</span>  </True> : <False> <span>X</span> </False>}</div> 
                            </div>
                            <div className="hint">{nameMessage}</div>
                            <p>연락처</p>
                            <div className="textBox">
                                <input type="tel" placeholder="연락처를 입력해주세요" value={inputTel} onChange={onChangeTel}/>
                                <div className="regCheckBox">{isTel ? <True> <span>&#10003;</span>  </True> : <False> <span>X</span> </False>}</div> 
                            </div>
                            <div className="hint">{telMessage}</div>
                            <p>instagram <span style={{fontWeight:'400'}}>(선택사항)</span> </p>
                            <div className="textBox">
                                <input type="text" placeholder="instagram ID" value={inputIns} 
                                onChange={onChangeIns}
                                />
                                <div className="regCheckBox"></div> 
                            </div>
                            <div className="hint">{insMessage}</div>
                        </div>
                    </RightBox>
                </div>
                <div className="btnBlock">
                    <button 
                        style={isEmail && isPwd && isConPw && isName && isTel ?  null : { backgroundColor: '#ddd'}  }
                        disabled={!isEmail || !isPwd || !isConPw || !isName || !isTel}
                    onClick={onClickSignup}>회원가입</button>
                          <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={open}
                                onClick={handleClose}
                            ></Backdrop>
                    <button onClick={props.showLogin}>돌아가기</button>
                </div>
            </Modal>
        </Container> 
    )
}

export default SignUpModal;