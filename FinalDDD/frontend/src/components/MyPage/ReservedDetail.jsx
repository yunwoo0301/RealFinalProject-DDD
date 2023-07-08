import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import CheckBooking from '../reservation/CheckBooking';


const Container = styled.div`
    width: calc(100% - 2.5rem);
    /* height: 10rem; */
    height: 10rem;
    /* min-height: 220px; */
    background-color: white;
    border: 1px solid #eee;
    border-radius: .4rem;
    align-items: center;
    display: flex;
    margin-bottom: .8rem;
    box-shadow: 0 3px 3px rgba(0,0,0,0.2);
    cursor: pointer;


    .showImage{
        display: flex;
        height: 80%;
        width: 10%;
        /* background-color: blue; */
        padding: auto;
        margin-left: 1.3rem;

    }
    .showImage img{
        width: 8rem;
        min-width: calc(60px * 1.4);
        min-height: calc(40px * 1.4);
        object-fit: cover;
        overflow-x: hidden;
        object-position: top;
        border-radius: 0.3rem;
        border: 1px solid #ddd;
    }
    .justfyTop{
        align-items: bottom;
        display: flex;
        /* background-color: aqua; */
        width: 100%;
        height: 76%;
        align-items: stretch;

        .leftBox{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /* background-color: blue; */
        margin: 0 .2rem;
        width: 100%;
        font-size: .8rem;
        }
        span{
            font-weight: bold;
            margin: 0 2.5rem;
            width: 3rem;
            font-size: .8rem;
            float: left;
            /* background-color: red; */

        }

        .flexRow{
            flex-direction: row;
            width: 100%;
            /* background-color: red; */

            .row2{
                width: 50%;
                /* background-color: aqua; */
                float: right;
            }
        }
    }
`;



const ReservedDetail = ({exhibitionData, currentPageData}) => {

    // 예약 총 개수
    const totalRecords = exhibitionData.length;

    // 예매 확인페이지 모달
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {

      setShowModal(false);
      console.log(showModal)
    };
    const [selectedData, setSelectedData] = useState(null);
    const openMobileTicket = (bookingId) => {
        setSelectedData(bookingId);
        setShowModal(true);
      };


    // 결제일시 날짜형식변경
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    return (
        <>
            <div className='count'>총 {totalRecords} 건</div>

                {currentPageData.map((e) => (
                        <Container
                            key={e.bookingId}
                            onClick={() => openMobileTicket(e.bookingId)}>
                            <div className="showImage"><img src={e.imgUrl} alt='exhibition' /></div>
                            <div className='justfyTop'>
                                <div className='leftBox'>
                                    <div><span>전시명</span> {e.exhibitName}</div>
                                    <div><span>전시관</span>{e.exhibitLocation}</div>
                                    <div className='flexRow'>
                                        <div className='row2'><span>관람인원</span>{e.paymentDTO.paymentCnt}</div>
                                        <div className='row2'><span>관람일시</span>{e.visitDate}</div>
                                    </div>
                                    <div className='flexRow'>
                                        <div className='row2'><span>금액</span>{e.paymentDTO.paidPrice}</div>
                                        <div className='row2'><span>결제일시</span>{formatDate(e.paymentDTO.paymentDate)}</div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    ))
                }
                {showModal && selectedData && (
                    <CheckBooking
                        reservationDatas={currentPageData.find(e =>  e.bookingId === selectedData)}
                        closeModal={closeModal}
                    />
                    )}
        </>
    );
};


export default ReservedDetail;