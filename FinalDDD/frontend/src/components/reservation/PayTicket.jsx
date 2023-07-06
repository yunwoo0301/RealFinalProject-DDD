import React,{useState} from "react";
import styled from "styled-components";
import { ImHome } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import Button from "../../util/Button";
import InputInfo from "./InputInfo";
import {RiKakaoTalkFill} from "react-icons/ri";
import { Payment, ProvideAgreement } from "./Agreement";
import ModalBankingPayment from "./BankingModal";
import FinalReservation from './FinalReservation';
import dayjs from "dayjs";
import DDDApi from "../../api/DDDApi";

const PayContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    .header { 
        width: 100%;
        height: 170px;
        
    }
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
    .body-container{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .root{
        display: flex;
        align-items: center;
        gap: 0.2rem;
        flex-direction: row;
        text-align: left;
        width: 100%;
        p{
            cursor: pointer;
        }
    }
    .infoBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    margin: 20px;
   
    .imgBox{
        margin-top: 1rem;
        overflow: hidden;
        width: 13rem;
        height: 20rem;
        position: relative;
        background-image: url(${props => props.imgUrl});
        background-repeat: no-repeat;
        background-size:cover;
       
    }
    .textBox{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title{
            margin-top: 10px;
            font-size: 1rem;
            font-weight: bold;
        }
        &>*{
            margin-bottom: 10px;
        }
    }
}
.rightBox{
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
        .btnContainer{
            width: 15rem;
            height: 2rem;
            display: flex;
            flex-direction: row;
            margin-top: 1rem;
            gap: 1rem;
        }
        .calendar-container{
            width: 20rem;
        }
    }
    .visitDate{
      font-weight: bold;
      margin-bottom: 1rem;
      color: red;
    }
    

`

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
    margin: 1rem;
    p{
        font-weight: bold;
    }
    div{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }
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
    background-color: #5EADF7;
    border: 1px solid #5EADF7;
    color: white;
    margin: 0 0 0 2rem;
    border-radius: .3rem;
    padding-left: .8rem;
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
    margin: 1rem;

  }
`;

const RightContainer =styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;

const PolicyWrapper = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  width: 20rem;
  margin-bottom: 1rem;
    .agreePersonal{
        float: left;
    }
    .agreeAll{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .agreeCancle{
        float: left;
    }
    .agreeProvideInfo{
        float: left;
    }
.container{
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .titleContainer{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .agreement{
        width: 100%;
        height: 20rem;
        font-size: 0.6rem;
    }


    
`;

const ReservationButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  height: 2rem;
  margin-top: 2rem;
  .kakaoBtn{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

`;

const Table = styled.table`
    margin: 0 auto;
    text-align: center;
    th{
        width: 50%;
        background-color: #5EADF7;
        color: white;
        font-size: 1rem;
    }
    td{
        font-size: 0.8rem;
    }
`


// 이용약관동의
const PolicyCheckbox = ({ label, checked, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </label>
    );
  };
  

const PayTicket = ({data}) => {
    const navigate = useNavigate();
    const getId = window.localStorage.getItem("memberId");
    const bookingId = window.localStorage.getItem("bookedNo");

    // InputInfo로 돌아가기위해 
    const [showInputInfo, setShowInputInfo] = useState(false);
    const goToInputInfo = () => {
        setShowInputInfo(true);
    }

    const goToSelectDate = () => {
        navigate(0);
    }

    const handleGoToHome = () => {
        navigate(-1);
    }


    // 날짜를 가지고와서 yy년 mm월 dd일로 표시하기위해
    const formatSelectedDate = (date) => {
      if (date) {
        return dayjs(date).format('YYYY년 MM월 DD일');
      }
      return '';
    };

      // 전체 Wrapper 열리고 닫히게 
    const [isExpandedInputInfo, setIsExpandedInputInfo] = useState(false);
    const [isExpandedPrice, setIsExpandedPrice] = useState(false);
    


    const handleHeaderClickInput = () => {
        setIsExpandedInputInfo(!isExpandedInputInfo);
    };
    const handleHeaderClickPrice = () => {
        setIsExpandedPrice(!isExpandedPrice);
    };

    // 약관동의
    const [agreeAll, setAgreeAll] = useState(false);
    const [agreeCancel, setAgreeCancel] = useState(false);
    const [agreePersonal, setAgreePersonal] = useState(false);
    const [agreeProvideInfo, setAgreeProvideInfo] = useState(false);
    
    const handleAgreeAllChange = (e) => {
        const checked = e.target.checked;
        setAgreeAll(checked);
        setAgreeCancel(checked);
        setAgreePersonal(checked);
        setAgreeProvideInfo(checked);
      };
    
      const handleAgreeCancelChange = (e) => {
        setAgreeCancel(e.target.checked);
      };
    
      const handleAgreePersonalChange = (e) => {
        setAgreePersonal(e.target.checked);
      };
    
      const handleAgreeProvideInfoChange = (e) => {
        setAgreeProvideInfo(e.target.checked);
      };

      // 약관동의 열리고 닫히게
      const [isOpenCancle, setIsOpenCancle] = useState(false);
      const [isOpenPersonal, setIsOpenPersonal] = useState(false);
      const [isOpenProvide, setIsOpenProvide] = useState(false);

        const handleOpenCancle = () => {
            setIsOpenCancle(!isOpenCancle);
        };
        const handleOpenPersonal= () => {
            setIsOpenPersonal(!isOpenPersonal);
        };
        const handleOpenProvide= () => {
            setIsOpenProvide(!isOpenProvide);
        };
      
      // 약관동의 불러오기
      const paymentAgreementContent = Payment.contents;
      const provideAgreementContent = ProvideAgreement.contents;

      // 결제 모달창
      const [modalOpen,setModalOpen] = useState(false);
      const closeModal =() => {
        setModalOpen(false);
      }
      const handleOpenModal = () => {
        setModalOpen(true);
      }

      // 확인버튼을 누르면 예매페이지로이동
      const [openBooked, setOpenBooked] = useState(false);
      const handleToComplete = async () => {
        const totalPrice = data.price;
        const ticketCnt = data.quantity;
        const result = await DDDApi.bankingPayment(getId, bookingId, totalPrice, ticketCnt);
        const isOk = result.data;
        if(isOk){
        setModalOpen(false);
        setShowInputInfo(false);
        setOpenBooked(true);
        }
      }



      // 결제 모달창과 예매완료페이지에 값 전달
      const dataForPayReserv = {
        imgUrl: data.reservationData.imgUrl,
        exhibitName: data.reservationData.exhibitName,
        exhibitLocation: data.reservationData.exhibitLocation,
        totalPrice: data.totalPrice,
        deliveryMethod: data.deliveryMethod,
        reservationDate: data.selectedDate,
        rootData: data.rootData,
        id: data.id,
        open: modalOpen,
        close: closeModal,
        handleToComplete: handleToComplete,
        handleGoToHome: handleGoToHome,
      }

      const openToKakaoPay = async() => {
        const exhibitNo = data.reservationData.exhibitNo;
        const ticketCnt = data.quantity;
        const totalPrice = data.totalPrice;
        const result = await DDDApi.kakaopayReady(getId, exhibitNo, ticketCnt, totalPrice, bookingId);
        const payUrl = result.data.next_redirect_pc_url;
        console.log("결제요청 url" + payUrl);
        // 새로운 창에서 페이지 열기
        window.open(payUrl, "_blank");
        setOpenBooked(true);
      }




    return(
        <>
       {showInputInfo && !openBooked ? (
        <InputInfo
          reservationData={data.reservationData}
          rootData={data.rootData}
          id={data.id}
          price={data.price}
          totalPrice={data.totalPrice}
          quantity={data.quantity}
          buyerInfo={data.buyerInfo}
          deliveryMethod={data.deliveryMethod}
          paymentMethod={data.paymentMethod}
        />
      ) : (
        <>
        {openBooked ? (<FinalReservation props = {dataForPayReserv}/>) : (
    <PayContainer imgUrl={data.reservationData.imgUrl}>
    <div className="reservationBox">
    <div className="root">
        <ImHome/><p onClick={handleGoToHome}>전시 상세정보 페이지</p>
        <p onClick={goToSelectDate}>{data.rootData[0]}</p>
        <p onClick={goToInputInfo}>{data.rootData[1]}</p>
        <p>{data.rootData[2]}</p>
    </div>
    <div className="body-container">
    <div className="infoBox">
               <div className="imgBox"/>
                <div className="textBox">
                    <div className="title">{data.reservationData.exhibitName}</div>
                    <div>{data.reservationData.startDate} ~ {data.reservationData.endDate}</div>
                    <div>{data.reservationData.exhibitLocation}</div>
                    <div className="visitDate">선택한 관람일{data.selectedDate && formatSelectedDate(data.selectedDate)}</div>
                </div>       
        </div>
        <div className="rightBox">
        <RightContainer>
         
      <BuyerInfoWrapper isExpanded={isExpandedInputInfo}>
        <div className="wrapperHeader" onClick={handleHeaderClickInput}>
        <h4>예매정보확인</h4>
        <MdOutlineKeyboardArrowDown style={{ transform: isExpandedInputInfo ? 'rotate(180deg)' : 'rotate(0deg)' }}/>
        </div>
        <div className="container">
        <span><p>예매자</p>
        <input
            type="text"
            name="name"
            defaultValue={data.buyerInfo.name}
            disabled
        /></span>
        <span><p>연락처</p>
        <input 
            type="text"
            name="contact"
            defaultValue={data.buyerInfo.contact}
            disabled
            /></span>
        <span><p>이메일</p><input 
            type="text"
            name="email"
            defaultValue={data.buyerInfo.email}
            disabled
            /></span>
            </div>
      </BuyerInfoWrapper>
      <PriceQuantityWrapper isExpanded={isExpandedPrice}>
      <div className="wrapperHeader" onClick={handleHeaderClickPrice}>
        <h4>가격정보 및 수령방법 확인</h4>
        <MdOutlineKeyboardArrowDown style={{ transform: isExpandedPrice? 'rotate(180deg)' : 'rotate(0deg)' }}/>
        </div>
      <div className="container">
        <div>
            <p>티켓수령방법 :</p> 
            {data.deliveryMethod === 'onSite' && <span>현장수령</span>}
            {data.deliveryMethod === 'mobileTicket' && <span>모바일티켓</span>}
        </div>
        <div>
            <p>티켓 가격 :</p> {data.price}원
        </div>
        <div>
            <p>수량 :</p>
        {data.quantity}
        </div>
        <div>
            <p>총 가격  : </p>
        {data.totalPrice}원
        </div>
      </div>
      </PriceQuantityWrapper> 
      <PolicyWrapper>
        <div className="agreeAll">
            <PolicyCheckbox
            checked={agreeAll}
            onChange={handleAgreeAllChange}
            />
            <p>전체 동의</p>
        </div>
        <div className="agreeCancle">
            <div className="titleContainer">
            <div className="container" >
            <PolicyCheckbox
            checked={agreeCancel}
            onChange={handleAgreeCancelChange}
            />
            <p>취소기한 확인 및 동의(필수)</p>
            </div>
            <MdOutlineKeyboardArrowDown onClick={handleOpenCancle} style={{ transform: isOpenCancle ? 'rotate(180deg)' : 'rotate(0deg)' }}/>
            </div>
            {isOpenCancle &&  
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
            }
        </div>
        <div className="agreePersonal">
        <div className="titleContainer">
        <div className="container">
            <PolicyCheckbox
            checked={agreePersonal}
            onChange={handleAgreePersonalChange}
            /> 
            <p>개인정보 수집 및 이용동의(필수)</p>
            </div>
            <MdOutlineKeyboardArrowDown onClick={handleOpenPersonal} style={{ transform: isOpenPersonal? 'rotate(180deg)' : 'rotate(0deg)' }}/>
            </div>
            {isOpenPersonal && <div className="agreement">
            {paymentAgreementContent}
            </div>}
        </div>
        <div className="agreeProvideInfo">
        <div className="titleContainer">
        <div className="container" >
            <PolicyCheckbox
            checked={agreeProvideInfo}
            onChange={handleAgreeProvideInfoChange}
            />
            <p>제 3자 정보 제공동의(선택)</p>
            </div>
            <MdOutlineKeyboardArrowDown onClick={handleOpenProvide} style={{ transform: isOpenProvide? 'rotate(180deg)' : 'rotate(0deg)' }}/>
            </div>
            {isOpenProvide && <div className="agreement">
            {provideAgreementContent}
            </div>}
        </div>
      </PolicyWrapper>
      <ReservationButtonWrapper>
        <Button onClick={goToInputInfo}>이전 단계</Button>
        {(data.paymentMethod === 'kakaoPay' || data.paymentMethod === 'banking') && data.totalPrice === 0 && <Button className="bankinBtn" disabled={!agreeCancel || !agreePersonal} onClick={handleToComplete}>예매완료</Button>}
        {data.paymentMethod === 'kakaoPay' && data.totalPrice !== 0 && <Button className="kakaoBtn" disabled={!agreeCancel || !agreePersonal} onClick={openToKakaoPay}><RiKakaoTalkFill/><p>카카오페이</p></Button>}
        {data.paymentMethod === 'banking'  && data.totalPrice !== 0  && <Button className="bankingBtn" onClick={handleOpenModal} disabled={!agreeCancel || !agreePersonal}>무통장입금</Button>}
      </ReservationButtonWrapper>
      </RightContainer>
      </div>   
      </div>
      </div>
      <ModalBankingPayment props = {dataForPayReserv}/>
    </PayContainer>)}
    </>
    )}
    </>
    );
}

export default PayTicket;