import React, { useState } from "react";
import styled from "styled-components";
import  Button from "../../util/Button";
import { ImHome } from "react-icons/im";
// import { Container } from "./SelectDate";
import MobileTicket from "../MyPage/MobileTicket";
import dayjs from "dayjs";

const FinalContainer = styled.div`
  .body{
    display: flex;
    flex-direction: column;
  }

`;


const FinalReservation = ({props}) => {
    //결제 후에는 예약하기, 예약정보, 결제정보확인을 못가게하기위한 alert창띄우기
    const showAlert = (message) => {
        alert(message);
      };

    // 모바일티켓 및 현장발권용 티켓출력
    const [showTicket, setShowTicket] = useState(false);

    const clickToTicket =() =>{
        setShowTicket(true);
    }

    const closeTicket = () => {
        setShowTicket(false);
    }

    // YYMMDD 형태로 전달
    const visitDateDigits = dayjs(props.reservationData).format('YYMMDD');

    // Ticket에 예매정보전달
    const rData = {
        imgUrl: props.imgUrl,
        name: props.exhibitName,
        place: props.exhibitLocation,
        visitDate: props.reservationDate,
        index: props.id,
        deliveryMethod: props.deliveryMethod,
        barcodeNo: visitDateDigits
    }
    


    return(
        <>
        <FinalContainer imgUrl ={props.imgUrl}>
            <div className="reservationBox">
                <div className="root">
                <ImHome/><p onClick={props.handleGoToHome}>전시 상세정보 페이지</p>
                <p onClick={() => showAlert('예매완료 후 에는 해당페이지로 이동이 불가합니다.')}>{props.rootData[0]}</p>
                <p onClick={() => showAlert('예매완료 후 에는 해당페이지로 이동이 불가합니다.')}>{props.rootData[1]}</p>
                <p onClick={() => showAlert('예매완료 후 에는 해당페이지로 이동이 불가합니다.')}>{props.rootData[2]}</p>
                <p>{props.rootData[3]}</p>
                </div>
                <div className="body">
              <div className="infoBox">
              <div className="imgBox"/>
                <div className="textBox">
                    <div className="title">{props.exhibitName}</div>
                    <div>{props.exhibitLocation}</div>
                </div>
              </div>
            <div className="rightBox">
              <div className="btnContainer">
              {props.deliveryMethod === "mobileTicket" && <Button className="btn" onClick={clickToTicket}>모바일티켓</Button>}
              {props.deliveryMethod === "onSite" && <Button className="btn" onClick={clickToTicket}>현장발권용티켓</Button>}
              <Button className="btn" >예매확인</Button>
              </div>
              </div>
              </div>
            </div>
        </FinalContainer>
        {showTicket && (
        <MobileTicket
          reservationData={rData}
          closeModal={closeTicket}
        //   openCancel={() => {} }
        />
        )}
        </>
    )
   
}

export default FinalReservation;