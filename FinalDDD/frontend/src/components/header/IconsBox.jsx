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
    height: 6rem;
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

    // console.log(profileImg)
    // console.log(loginState)

    const navigate = useNavigate();

    const onClickToLogin = () => {
        loginState ?
        navigate(`/api/mypage/${getId}`) : navigate("/login");
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

                // 오늘 날짜와 일치하는 예약 건 수 계산
                const today = new Date().toISOString().split("T")[0];
                const todayBookings = reservationList.data.filter((booking) => {
                const bookingDate = new Date(booking.bookingDate).toISOString().split("T")[0]; // 예약 날짜를 YYYY-MM-DD 형식의 문자열로 변환
                return bookingDate === today;
                });

                setTodayBookingCnt(todayBookings.length);
              } catch (e) {
                console.log(e);
              }
            };

            reservations();
        }, []);


    const onClickToReservation = () => {
            setShowPage('예약관리')
        navigate(`/api/mypage/${getId}`);
    };

    const goToMypage = () => {

        setShowPage('마이페이지')
        navigate(`/api/mypage/${getId}`)
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
                    {loginState ?  (<img src={memberData.profileImg} alt="😫" />) : (<BsPersonCircle/>)}

            </div>

            {loginState ? ( <div className="loginToggle">
                <div className="toggleBlock">
                    <div className="login-icon" onClick={onClickToLogin} >
                        <img src={memberData.profileImg} alt="😫" />
                    </div>

                    <div className="infoBox">
                        <div className="nickname"  onClick={goToMypage}>{memberData.nickname}</div>
                        <div className="infoBoxBtn"   onClick={goToMypage}>마이 페이지</div>
                        <div className="infoBoxBtn">내 쪽지함</div>
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