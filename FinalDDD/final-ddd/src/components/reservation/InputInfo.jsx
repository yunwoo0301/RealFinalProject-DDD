import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../util/Button";
import {ImHome} from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { Container } from "./SelectDate";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import PayTicket from "./PayTicket";
import dayjs from 'dayjs';
import DDDApi from "../../api/DDDApi";

const PriceQuantityWrapper = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  width: 20rem;
  margin-bottom: 1rem;
  div{float: left;}
  button {
    background-color: #fff;
    border: none;
    margin: 1rem;
  }
  .wrapperHeader{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0.3rem;
  }
  h4{
    margin: 0;
  }
  .container{
    display: ${props => (props.isExpanded ? 'flex' : 'none')}; /* 수정: container의 표시 상태를 조건부로 설정 */
    flex-direction: column;
    margin: 1rem 0;
  }
`;

const BuyerInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  margin-bottom: 1rem;
  span{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  input {
    width: calc(80% - 0.8rem);
    height: 30px;
    background-color: #F4F8FF;
    border: 1px solid #5EADF7;
    margin: 0 0 0 2rem;
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
p{
  width: 20%;
}
.wrapperHeader{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0.3rem;
  }
  h4{
    margin: 0;
  }
  .container{
    display: ${props => (props.isExpanded ? 'flex' : 'none')}; /* 수정: container의 표시 상태를 조건부로 설정 */
    flex-direction: column;
    margin: 1rem 0;
  }
`;

const DeliveryMethodWrapper = styled.div`
width: 100%;
  flex-direction: column;
  display: flex;
  gap: 0.2rem;
  margin-bottom: 1rem;
  .wrapperHeader{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0.3rem;
  }
  h4{
    margin: 0;
  }
  .container{
    display: ${props => (props.isExpanded ? 'flex' : 'none')}; /* 수정: container의 표시 상태를 조건부로 설정 */
    flex-direction: row;
    align-items: center;
    margin: 1rem 0;
  }
`;

const PaymentMethodWrapper = styled.div`
  
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 0.2rem;
  margin-bottom: 1rem;
  .wrapperHeader{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0.3rem;
  }
  h4{
    margin: 0;
  }
  .container{
    display: ${props => (props.isExpanded ? 'flex' : 'none')}; /* 수정: container의 표시 상태를 조건부로 설정 */
    flex-direction: row;
    align-items: center;
    margin: 1rem 0;
  }
`;

const ReservationButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  height: 2rem;
  margin-top: 2rem;
`;
const RightContainer =styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const DeliveryMethodRadio = styled.input`
  margin: 1rem;
  
`;


const InputInfo = ({rootData, reservationData, id, selectedDate}) => {
  const getId = window.localStorage.getItem("memberId");
  
  const [bookedNo, setBookedNo] = useState('');
  window.localStorage.setItem("bookedNo", bookedNo);
  
  // 예매 관련 상태 및 함수
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  let price = 0;
  // 넘어오는 가격의 값이 문자열일경우와 그냥 숫자일 경우 다르게 처리
  if (typeof reservationData.exhibitPrice === 'string') {
    const priceString = reservationData.exhibitPrice.replace(/[^0-9]/g, '');
    // 문자부분제거 후 앞 4자리숫자만 사용하여 티켓값 추출
    const trimmedPriceString = priceString.substring(0, 4);
    // 무료일경우 0값출력
    if (trimmedPriceString !== '') {
      price = parseFloat(trimmedPriceString);
    }
  } else if (typeof reservationData.exhibitPrice === 'number') {
    price = reservationData.exhibitPrice;
  }
  const [totalPrice, setTotalPrice] = useState(price * quantity);
  
  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    contact: "",
    email: "",
  });
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // 수량에 따른 가격변화
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setTotalPrice(price * (quantity-1));
    }
  };

  const handleIncrease = () => {
    if(quantity <4) {
    setQuantity(quantity + 1);
    setTotalPrice(price * (quantity+1));
    }
  };
  // 수령방법
  const handleDeliveryMethodChange = (e) => {
    setDeliveryMethod(e.target.value);
  };
  // 결제방법
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // 예매자 정보
  const handleBuyerInfoChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prevBuyerInfo) => ({
      ...prevBuyerInfo,
      [name]: value,
    }));
  };

  // 날짜를 가지고와서 yy년 mm월 dd일로 표시하기위해
  const formatSelectedDate = (date) => {
    if (date) {
      return dayjs(date).format('YYYY년 MM월 DD일');
    }
    return '';
  };

  // 전체 Wrapper 열리고 닫히게 
  const [isExpandedDeliever, setIsExpandedDeliever] = useState(false);
  const [isExpandedPayment, setIsExpandedPayment] = useState(false);
  const [isExpandedInputInfo, setIsExpandedInputInfo] = useState(true);
  const [isExpandedPrice, setIsExpandedPrice] = useState(false);
  
  


  const handleHeaderClick = () => {
    setIsExpandedPayment(false);
    setIsExpandedDeliever(!isExpandedDeliever);
  };
  const handleHeaderClickPay = () => {
    setIsExpandedPrice(false);
    setIsExpandedPayment(!isExpandedPayment);
  };
  const handleHeaderClickInput = () => {
    setIsExpandedInputInfo(!isExpandedInputInfo);
  };
  const handleHeaderClickPrice = () => {
    setIsExpandedInputInfo(false);
    setIsExpandedPrice(!isExpandedPrice);
  };
  
  // 모든입력이 완료되어야만 결제하기 버튼활성화
  const isPaymentButtonDisabled =
  !buyerInfo.name ||
  !buyerInfo.contact ||
  !buyerInfo.email ||
  !deliveryMethod ||
  !paymentMethod;


  // 전시상세정보페이지로 다시 이동
  const handleGoToHome = () => {
    navigate(-1)
  }
  //이전단계이동
  const handleGoBack = () => {
    navigate(0);
  }

  // 결제정보에 데이터 넘겨줌
  const data = 
  {reservationData: reservationData, 
    rootData: rootData, 
    id: id, 
    price: price, 
    totalPrice: totalPrice, 
    quantity: quantity,
    buyerInfo: buyerInfo,
    deliveryMethod: deliveryMethod,
    paymentMethod: paymentMethod,
    selectedDate: selectedDate 
}

    // 컴포넌트 이동을 위한 변수설정
    const [toPayment, setToPayment] = useState(false);
    const handleReservation = async () => {
      const exhibitNo = reservationData.exhibitNo;
      const bookedName = buyerInfo.name;
      const bookedEmail = buyerInfo.email;
      const bookedContact = buyerInfo.contact;
      const result = await DDDApi.bookTicket(
        getId, exhibitNo, selectedDate, bookedName, 
        bookedEmail, bookedContact, deliveryMethod);
      const resultNo = result.data;
      setBookedNo(resultNo);
      setToPayment(true);
    } 


  return (
    <>
    {toPayment ? (<PayTicket data={data}/>) : (
    <Container imgUrl ={reservationData.imgUrl}>
    <div className="reservationBox">
    <div className="root">
        <ImHome/><p onClick={handleGoToHome}>전시 상세정보 페이지</p>
        <p onClick={handleGoBack}>{rootData[0]}</p>
        <p>{rootData[1]}</p>
    </div>
    <div className="bodyContainer">
    <div className="infoBox">
               
               <div className="imgBox"/>
                <div className="textBox">
                    <div className="title">{reservationData.exhibitName}</div>
                    <div>{reservationData.startDate} ~ {reservationData.endDate}</div>
                    <div>{reservationData.exhibitLocation}</div>
                    <div className="visitDate">선택한 관람일 : {selectedDate && formatSelectedDate(selectedDate)}</div>
                </div>       
        </div>
        <div className="rightBox">
        <RightContainer>
      <BuyerInfoWrapper isExpanded={isExpandedInputInfo} >
        <div className="wrapperHeader" onClick={handleHeaderClickInput}>
        <h4>예매정보입력</h4>
        <MdOutlineKeyboardArrowDown style={{ transform: isExpandedInputInfo ? 'rotate(180deg)' : 'rotate(0deg)' }}/>
        </div>
        <div className="container">
        <span><p>예매자</p><input 
              type="text"
              name="name"
              value={buyerInfo.name}
              onChange={handleBuyerInfoChange}/></span>
        <span><p>연락처</p><input 
              type="text"
              name="contact"
              value={buyerInfo.contact}
              onChange={handleBuyerInfoChange} /></span>
        <span><p>이메일</p><input 
              type="text"
              name="email"
              value={buyerInfo.email}
              onChange={handleBuyerInfoChange} /></span>
              </div>
      </BuyerInfoWrapper>
      <PriceQuantityWrapper isExpanded={isExpandedPrice} >
      <div className="wrapperHeader" onClick={handleHeaderClickPrice}>
        <h4>수량 및 가격</h4>
        <MdOutlineKeyboardArrowDown style={{ transform: isExpandedPrice? 'rotate(180deg)' : 'rotate(0deg)' }}/>
        </div>
      <div className="container">
        <div>
        가격 : {reservationData.exhibitPrice}
        </div>
        <div>
            수량 :
            <button onClick={handleDecrease}>-</button>
            {quantity}
            <button onClick={handleIncrease}>+</button>
        </div>
        <div >
            총 가격 : {totalPrice}원
        </div>
        </div>
        </PriceQuantityWrapper>  
      <DeliveryMethodWrapper isExpanded={isExpandedPayment} >
        <div className="wrapperHeader" onClick={handleHeaderClickPay}>
        <h4>수령 방법</h4>
        <MdOutlineKeyboardArrowDown style={{ transform: isExpandedPayment ? 'rotate(180deg)' : 'rotate(0deg)' }}/>
        </div>
        <div className="container">
        <DeliveryMethodRadio
          type="radio"
          id="onSite"
          name="deliveryMethod"
          value="onSite"
          checked={deliveryMethod === 'onSite'}
          onChange={handleDeliveryMethodChange}
        />
      <label htmlFor="onSite">현장수령</label>
      <DeliveryMethodRadio
        type="radio"      
        id="mobileTicket"
        name="deliveryMethod"
        value="mobileTicket"
        checked={deliveryMethod === 'mobileTicket'}
        onChange={handleDeliveryMethodChange}
      />
      <label htmlFor="mobileTicket">모바일티켓</label>
      </div>
      </DeliveryMethodWrapper>
      <PaymentMethodWrapper isExpanded={isExpandedDeliever} >
      <div className="wrapperHeader" onClick={handleHeaderClick}>
        <h4>결제수단</h4>
          <MdOutlineKeyboardArrowDown style={{ transform: isExpandedDeliever ? 'rotate(180deg)' : 'rotate(0deg)' }}/>
        </div>
        <div className="container">
          <DeliveryMethodRadio
            type="radio"
            id="banking"
            name="payMethod"
            value="banking"
            checked={paymentMethod === 'banking'}
            onChange={handlePaymentMethodChange}
          />
        <label htmlFor="banking">무통장입금</label>
          <DeliveryMethodRadio
            type="radio"
            id="kakaoPay"
            name="payMethod"
            value="kakaoPay"
            checked={paymentMethod === 'kakaoPay'}
            onChange={handlePaymentMethodChange}
          />
        <label htmlFor="kakaoPay">카카오페이</label>
      </div>
      </PaymentMethodWrapper>
        <ReservationButtonWrapper>
          <Button onClick={handleGoBack}>이전 단계</Button>
          <Button onClick={handleReservation} disabled={isPaymentButtonDisabled}>결제 하기</Button>
        </ReservationButtonWrapper>
      </RightContainer>
      </div>   
      </div>
      </div>
    </Container>)}
    </>
  );
};

export default InputInfo;
