import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../util/Button";
import ConfirmModal from "../../util/ConfirmModal";
import {FcCancel} from "react-icons/fc";
import MobileTicket from "../MyPage/MobileTicket";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Modal = styled.div`
    position: fixed;
    width: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3rem;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* margin-bottom: 20px; */
    .reservationBox{
        background-color: #F4F8FF;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 20px;
        gap: 1rem;
        border-radius: 10px;
    }
    .bodyContainer{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .root{
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content:  space-between;
        text-align: left;
        width: 100%;
        p{
            font-size: 1.5rem;
            cursor: pointer;
        }
    }
    .infoBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 2rem;

    .imgBox{
        margin-top: 1rem;
        overflow: hidden;
        width: 13rem;
        height: 20rem;
        position: relative;
        background-image: url(${props => props.imgUrl});
        background-repeat: no-repeat;
        background-size: contain;
        cursor: pointer;

    }
    .textBox{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        .title{
            margin-top: 1rem;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
        }
        &>*{
            margin-bottom: 10px;
        }
        .ticket{
            color: #5EADF7;
            text-decoration: underline;
        }
    }

}
.rightBox{
    width: 20rem;
    display: flex;
    flex-direction: column;
    .label {
    display: inline-block;
    width: 10rem;

    }
    .bookingItem,
        .payItem {
        margin-bottom: 10px;
        font-size: 0.8rem;
        }
    .payItem:nth-child(4){
    font-weight: bold;
    }
    .bookingItem:nth-child(2){
    font-weight: bold;
    color: red;
    }
    }

    .btnContainer{
        margin-top: 3rem;
        display: flex;
        flex-direction: row;
        width: 15rem;
        height: 2rem;
        gap: 1rem;
    }

`;
const Table = styled.table`
    text-align: center;
    th{
        width: 50%;
        background-color: #5EADF7;
        color: white;
        font-size: 0.8rem;
    }
    td{
        font-size: 0.8rem;
    }
`
const ModalBodyStyle = styled.div`
.warn{
    font-size: 0.8rem;
    color: red;
    line-height: 1.2;
}

`



const CheckBooking = ({reservationDatas, closeModal, cancelBooking, openModal, close, clickToCancel}) => {
    const navigate = useNavigate();

    // 날짜형식변경
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

    // 시간까지표시되는 날짜형식
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }



      // 취소예매 모달 체크박스
      const [isChecked, setIsChecked] = useState(false);
      const handleCheckChange = (e) => {
        setIsChecked(e.target.checked);
      }


      const props ={
        title: "예매취소",
        body: (
        <ModalBodyStyle>
            정말 예매를 취소하시겠습니까? <br />
            <div className="warn">예매취소수수료가 있을 수 있으니 확인 후 진행해주세요.<br/>
            (취소된 예매는 다시 되돌릴 수 없습니다.)
            </div>
            <div className="checkBox">
            <label>
                <input type="checkbox" onChange={handleCheckChange} />
                취소정책 및 수수료를 확인했고, 취소에 동의합니다.
            </label>
            </div>
        </ModalBodyStyle>
        ),
        button: [
        <button onClick={close}>닫기</button>,
        <button onClick={cancelBooking} disabled={!isChecked} style={isChecked ? {} : {backgroundColor: "#b0abab", color: "#050E3D"}}>확인</button>
        ],
        icon: <FcCancel/>
      }

      // 티켓확인모달
      const [openTicket, setOpenTicket] = useState(false);
      const clickToTicket = () =>{
        setOpenTicket(true);
      }

      const closeTicket = () =>{
        setOpenTicket(false);
      }
      // YYMMDD 형태로 전달
    const visitDateDigits = dayjs(reservationDatas.visitDate).format('YYMMDD');
      // 티켓이미지로 props전달
      const reservationData = {
        imgUrl: reservationDatas.imgUrl,
        name: reservationDatas.exhibitName,
        place: reservationDatas.exhibitLocation,
        visitDate: reservationDatas.visitDate,
        deliveryMethod: reservationDatas.getTicket,
        barcodeNo: visitDateDigits,
        index: reservationDatas.exhibitNo
      }

      // 해당 전시로 이동
      const moveToExhibition = () =>{
        navigate(`/exhibitInfo/${reservationDatas.exhibitNo}`);
      }

    return(
        <Modal>
        {reservationDatas &&
        <Container  imgUrl ={reservationDatas.imgUrl}>
            <div className="reservationBox">
                <div className="root">
                <h3>예매 확인</h3>
                <p onClick={closeModal}>&times;</p>
                </div>
                <div className="bodyContainer">
               <div className="infoBox">
               <div className="imgBox" onClick={moveToExhibition}/>
                <div className="textBox">
                    <div><p className="ticket" onClick={clickToTicket}>티켓확인</p></div>
                    <div className="title" onClick={moveToExhibition}>{reservationDatas.exhibitName}</div>
                    <div>{reservationDatas.startDate} ~ {reservationDatas.endDate}</div>
                    <div>{reservationDatas.exhibitLocation}</div>
                </div>
               </div>
               <div className="rightBox">
               <div className="bookingContainer">
                <h4>예매 정보</h4>
                <div className="bookingItem">
                    <span className="label">방문일</span>
                    <span className="value">{formatDate(reservationDatas.visitDate)}</span>
                </div>
                <div className="bookingItem">
                    <span className="label">예매일</span>
                    <span className="value">{formatDate(reservationDatas.bookingDate)}</span>
                </div>
                <div className="bookingItem">
                    <span className="label">예매자</span>
                    <span className="value">{reservationDatas.bookedName}</span>
                </div>
                <div className="bookingItem">
                    <span className="label">예매자 전화번호</span>
                    <span className="value">{reservationDatas.bookedTel}</span>
                </div>
                <div className="bookingItem">
                    <span className="label">예매자 이메일</span>
                    <span className="value">{reservationDatas.bookedEmail}</span>
                </div>
                <div className="bookingItem">
                    <span className="label">예매수량</span>
                    <span className="value">{reservationDatas.paymentDTO.paymentCnt}매</span>
                </div>
                <div className="bookingItem">
                    <span className="label">수령방법</span>
                    {reservationDatas.getTicket === "onSite" ? (
                    <span className="value">현장발권</span>
                    ) : reservationDatas.getTicket === "mobileTicket" ? (
                    <span className="value">모바일티켓</span>
                    ) : null}
                </div>
                </div>
                <div className="payContainer">
                <h4>결제정보</h4>
                <div className="payItem">
                    <span className="label">결제일</span>
                    <span className="value">{formatDateTime(reservationDatas.paymentDTO.paymentDate)}</span>
                </div>
                <div className="payItem">
                    <span className="label">결제수단</span>
                    <span className="value">{reservationDatas.paymentDTO.paymentType}</span>
                </div>
                <div className="payItem">
                    <span className="label">총 결제금액</span>
                    <span className="value">{reservationDatas.paymentDTO.paidPrice}원</span>
                </div>
                </div>
                <div className="cancelContainer">
                    <h4>취소유의사항</h4>
                <Table>
                <thead>
                    <tr>
                    <th>취소일</th>
                    <th>취소수수료</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>관람 7일 전</td>
                    <td>없음</td>
                    </tr>
                    <tr>
                    <td>관람 7일 후 ~ 관람 하루 전</td>
                    <td>티켓금액의 10%</td>
                    </tr>
                    <tr>
                    <td>관람 당일</td>
                    <td>취소불가</td>
                    </tr>
                </tbody>
            </Table>
                </div>
               </div>
               </div>
               <div className="btnContainer">
                <Button onClick={closeModal}>확인</Button>
                <Button onClick={clickToCancel}>예매취소</Button>
               </div>
            </div>
        </Container>
        }
        {openModal && <ConfirmModal props={props}/>}
        {openTicket && <MobileTicket reservationData={reservationData} closeModal={closeTicket}/>}
        </Modal>
    );
}

export default CheckBooking;