import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {HiOutlineTicket} from 'react-icons/hi';
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import useStore from "../../store";
import SwipeableTemporaryDrawer from "../header/newNavi";
import Badge from '@mui/material/Badge';
import DDDApi from "../../api/DDDApi";
import MyPageBG from "../MyPage/MyPageBG";
import Functions from "../../util/Functions";
import {showToast} from "./ToastContainer";

const IconBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;


    .ticket-icon,  .login-icon {
        margin: 0.3rem 0.8rem 0.3rem;
        font-size: 1.5rem;
        border-radius: 2rem;
        /* background-color: red; */
        height: 2.4rem;
        width: 2.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        cursor: pointer;
        transition: all 0.1s ease-in;
    }

    .login-icon,  .logout {
        display: flex;
        flex-direction: column;
        margin: 0;

        img{
            width: 100%;
            height: 100%;
            border-radius: inherit;
            border: 1px solid #c2c2c2;
        }
    }

    @media (max-width: 768px) {
        .ticket-icon,
        .login-icon {
            height: 40px;
            width: 40px;
            font-size: 1.4rem;
            img{
                width: 100%;
                height: 100%;
                border-radius: inherit;
            }
        }
    }
`;
const LoginIconBox = styled.div`
  justify-content: center;
  margin: 0.3rem 0.8rem 0 0.3rem;
  /* background-color: red; */
  width: 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;


  .loginToggle {
	// layout
    position: relative;
    top: -50%;
    right: 200%;
    width: 9.0rem;
    height: 8rem;
    margin-top: 1rem;
    display: none;

	// looks
	background-color: #fff;
	padding: 1rem;
    padding-right: 0rem;
	font-size: 0.55rem;
	border-radius: 0.3rem;
    box-shadow:	0 0.125rem 0.5rem rgba(0, 0, 0, .3), 0 0.0625rem 0.125rem rgba(0, 0, 0, .2);
}

.loginToggle::before {
	// layout
	content: '';
	position: absolute;
	width: 0;
	height: 0;
	bottom: 100%;
	right: 3.8rem; // offset should move with padding of parent
	border: .3rem solid transparent;
	border-top: none;

	// looks
	border-bottom-color: #fff;
	filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, .1));
}
  &:hover .loginToggle{
    display: block;
  }
    .toggleBlock{
        /* background-color: blue; */
        width: 100%;
        height: 2.4rem;
        display: flex;
        flex-direction: row;
        cursor: pointer;

    }
    .infoBox{
        /* background-color: aqua; */
        width: 5rem;
        height: auto;
        padding-left: 0.8rem;
        .nickname{
            font-size: 0.8rem;
            font-weight: bold;
        }
        .editInfo{
            width: 3.5rem;
            height: 1rem;
            background-color: black;
            margin-top: 0.3rem;
            border-radius: 2rem;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .infoBoxBtn{
    margin-top: 0.5rem;
    cursor: pointer;
    padding: 0.2rem;
    padding-right: 0;
}

.infoBoxBtn:hover {
    background-color: #050E3D;
    color: white;
}
    }

`;



const Icons = () => {
    const { setShowPage, memberData } = useStore();
    const loginState = window.localStorage.getItem("isLogin");
    const getId = window.localStorage.getItem("memberId");
    // 오늘 예약 건수 계산
    const [todayBookingCnt, setTodayBookingCnt] = useState(0);
    // 오늘 받은 메세지
    const [todayMsg, setTodayMsg] = useState(0);

    // 오늘 날짜를 사용자의 컴퓨터 타임존으로 변경
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date().toLocaleString("en-US", { timeZone: userTimezone, dateStyle: "short" }).replace(/\//g, "-"); // 사용자의 타임존에 맞춰 날짜 표시

    // console.log(profileImg)
    // console.log(loginState)

    const navigate = useNavigate();

    const onClickToLogin = () => {
        loginState ?
        navigate(`/mypage/${getId}`) : navigate("/login");
    }


    const removeLocalstorage = () =>{
        localStorage.removeItem("isLogin");
        localStorage.removeItem("storageEmail");
        localStorage.removeItem("memberId");
        localStorage.removeItem("accessToken");
        navigate('/')
    }

     useEffect(() => {
                const reservations = async () => {
                  try {
                    const reservationList = await DDDApi.myBookedList(getId);

                    const todayBookings = reservationList.data.filter((booking) => {
                    const bookingDate = new Date(booking.bookingDate).toLocaleString("en-US", { timeZone: userTimezone, dateStyle: "short" }).replace(/\//g, "-"); // 사용자의 타임존에 맞춰 예약 날짜 표시
                    return bookingDate === today;
                    });
                    setTodayBookingCnt(todayBookings.length);
                    if (todayBookings.length > 0 ) {
                        showToast(`🎫 예약된 오늘의 전시가 ${todayBookings.length}건 있습니다`);
                      }
                  } catch (e) {
                    console.log(e);
                  }
                };

                reservations();
            }, []);

        // 오늘날짜로 받은 메세지 뱃지
                useEffect(() => {
                    const message = async() => {
                        try {
                            const msgList = await DDDApi.receivedMsg(getId);

                            const todayMsgs = msgList.data.filter((msg) => {
                                const msgDate = new Date(msg.messageDate).toLocaleString("en-US", { timeZone: userTimezone, dateStyle: "short" }).replace(/\//g, "-");
                                const isOpened = msg.isOpened === 0;
                                const isToday = msgDate === today;
                                return isToday && isOpened;
                              });
                              setTodayMsg(todayMsgs.length);
                              if (todayMsgs.length > 0 && todayMsgs[0].isOpened === 0) {
                                showToast(`💌 새로운 메세지가 도착했습니다.`);
                              }
                        }catch(e) {
                            console.log(e);
                        }
                    }
                    message();
                }, []);


    const onClickToReservation = () => {
        setShowPage('예약관리')
        navigate(`/mypage/${getId}`);
    };

    const goToMypage = () => {
        setShowPage('마이페이지')
        navigate(`/mypage/${getId}`)
    }
    const goToMyMessage = () => {
        setShowPage('내쪽지함')
        navigate(`/mypage/${getId}`)
    }



    return (
        <IconBox>
           {loginState ? (
           <div className="ticket-icon" onClick={onClickToReservation}>
                <Badge badgeContent={todayBookingCnt} color="primary" showZero>
                    <HiOutlineTicket/>
                </Badge>
            </div>) : (
            <div className="ticket-icon" onClick={onClickToLogin}>
            <HiOutlineTicket/>
            </div>) }

<LoginIconBox>
            <div className="login-icon" onClick={onClickToLogin}>
                {loginState ?  (
                    <Badge className="login-icon" badgeContent={todayMsg} color="primary" overlap="circular" variant="dot">
                        <img src={memberData.profileImg} alt="😫" />
                    </Badge>)
                    : (<BsPersonCircle/>)}
            </div>

            {loginState ? ( <div className="loginToggle">
                <div className="toggleBlock">
                    <div className="login-icon" onClick={onClickToLogin} >
                        <img src={memberData.profileImg} alt="😫" />
                    </div>

                    <div className="infoBox">
                        <div className="nickname"  onClick={goToMypage}>{memberData.nickname}</div>
                        <div className="infoBoxBtn"   onClick={goToMypage}>마이 페이지</div>
                        <div className="infoBoxBtn"   onClick={()=>{navigate(`/ratediary`)}}>평가하기</div>
                        <div className="infoBoxBtn" onClick={goToMyMessage}>
                            <Badge badgeContent={todayMsg} color="primary"variant="dot">
                            내 쪽지함
                            </Badge>
                        </div>
                        <div className="infoBoxBtn" onClick={removeLocalstorage}>로그아웃</div>
                    </div>
                </div>
            </div>) : null}
        </LoginIconBox>

            <div className="navi">
{/*                 <NavigateBar/> */}
                <SwipeableTemporaryDrawer/>
            </div>
        </IconBox>


    );
}

export default Icons;