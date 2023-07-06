import React from 'react';
import styled from 'styled-components';
import CancelTicket from './CancelTicket';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import TicketBarcode from '../reservation/Barcode';


const Modal = styled.div`
    width: 20vw;
    height: 80vh;
    min-width: 500px;
    min-height: 700px;
    /* height: 70vh; */
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    border-radius: 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;

    .closeBtn{
        /* color: white; */
        font-size: 1.4rem;
        /* border-radius: 1rem; */
        width: 2rem;
        height: 4rem;
        /* padding-bottom: .2rem; */
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        /* left: 44%; */
        top: 0;
        cursor: pointer;
    }

    .title{
        font-size: 2rem;
        /* background-color: red; */
        padding-bottom: 0.5rem;
    }
    .exhImg{
        width: 50%;
        height: 20rem;
        /* background-color: aqua; */
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
            border: 1px solid #ccc;
        }
    }
    .desc{
        text-align: center;
        padding: 0.5rem;
        span{
            line-height: 1.8rem;
        }
        p{  
            margin-top: 0;
            font-size: 0.5rem;
            color: red;
        }

    }
    .btnBlock{
            width: 90%;
            display: flex;
            justify-content: center;

            button{
                width: 22%;
                height: 2rem;
                border-radius: 3rem;
                margin : 0rem .5rem;
                background-color: #5EADF7 ;
                border: 1px solid #F4F8FF;
                color: white;
                font-size: .8rem;
                cursor: pointer;
                /* float : right; */
                display: flex;
                justify-content:center;
                align-items: center;
                .link{
                    text-decoration: none;
                    color: inherit;
                }
            }
        }
`;


const MobileTicket = ({ reservationData, closeModal, openCancel }) => {
    // 날짜를 가지고와서 yy년 mm월 dd일로 표시하기위해
    const formatSelectedDate = (date) => {
        if (date) {
        return dayjs(date).format('YYYY년 MM월 DD일');
        }
        return '';
    };

    return (
        <Modal>
            <div className='closeBtn' onClick={closeModal}>&times;</div>

            <div className='title'>TICKET</div>
            <div className='exhImg'>
                <img src={reservationData.imgUrl} alt='exhibition' />
            </div>
            <div className="desc">
                <span style={{ fontWeight: 'bold' }}> {reservationData.name}</span><br />
                <span> {reservationData.place}</span><br />
                <span>관람일 : </span>
                <span> {reservationData.visitDate && formatSelectedDate(reservationData.visitDate) }</span><br />
                {/* 바코드 출력 */}
                <span><TicketBarcode visitDate = {reservationData.barcodeNo} id ={reservationData.index}/></span>
                {/* 현장 발권일 때는 주의 문구 출력 */}
                {reservationData.deliveryMethod === "onSite" && <p>* 현장 발권일 경우, 관람 전 실물 티켓으로 교환 후 관람 가능합니다.</p>}<br />
            </div>
            <div className='btnBlock'>
                <button>
                    <Link to={`/exhibitInfo/${reservationData.index}`} className='link'>상세정보</Link></button>
                <button onClick={openCancel}>예매취소</button>
            </div>
        </Modal>

    );
};

export default MobileTicket;
