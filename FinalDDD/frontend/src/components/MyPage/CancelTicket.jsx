import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
    width: 20vw;
    height: 64vh;
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
        background-color: #ccc;
        /* color: white; */
        border-radius: 1rem;
        width: 2rem;
        height: 1.8rem;
        padding-bottom: .2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        /* left: 44%; */
        top: 2%;
        cursor: pointer;
    }
    table{
        width: 80%;
        .test{
            /* background-color: rebeccapurple; */
            height: 1rem;
            padding: 0;
        }

    }
    .firstTable{
        /* background-color: red; */
        margin-top: 5rem;
        
        td{
        vertical-align: top;

        }
        
        .tableTitle{
            font-size: 1.5rem;
            font-weight: bold;
        }

        .desc{
            font-size:.6rem;
            padding: 0;
        }
    }
    .secTable{
        /* background-color: blue; */
        margin-top: 2rem;
        font-size:.8rem;
        border-collapse: collapse;

        tr{
            height: 2.0rem;
        }

        tr:nth-child(even) {
        background-color: #ddd;
        }

    }
    .explain{
        width: 80%;
        font-size: .6rem;
        text-align: left;
        margin-top: 2rem;
        line-height: 1rem;
    }
    



   
    .btnBlock{
            height: 30%;
            width: 90%;
            display: flex;
            justify-content: center;

            button{
                width: 22%;
                height: 2.3rem;
                border-radius: 3rem;
                margin : 4rem .5rem;
                background-color: #5EADF7 ;
                border: 1px solid #F4F8FF;
                color: white;
                font-size: .8rem;
                cursor: pointer;
                display: flex;
                justify-content:center;
                align-items: center;
            }
        }
`;


const CancelTicket = ({ closeModal }) => {

    function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 +1 해줍니다.
        const day = currentDate.getDate() - 3;
        
        return { year, month, day };
      }
      const currentDate = getCurrentDate();
    const checkDate = () => {

        console.log(currentDate)

    }


    return (
        <>
            <Modal>
                <div className='closeBtn' onClick={closeModal}>&times;</div>

                <table className='firstTable'>
                    <tr style={{height:'4rem'}}>
                        <td className='tableTitle' colSpan={2}>예매 취소 안내 </td>
                    </tr>
                    <tr className='test'>
                        <td style={{width:'30%', fontWeight:'bold'}}>취소 마감 기한</td>
                        <td> <span style={{backgroundColor:'yellow'}}>{currentDate.year}년 {currentDate.month}월 {currentDate.day}일</span> <br/>
                            <span  className='desc'>취소 마감 시간 이후에는 취소가 불가능합니다. </span>
                        </td>
                    </tr>
                </table>

                <table className="secTable">
                    <tr>
                        <td style={{width:'30%', fontWeight:'bold'}} colSpan={2}>취소 수수료 </td>
                    </tr>

                    <tr>
                        <td>전시 0일 전</td>
                        <td>취소 수수료 없음</td>
                    </tr>
                    <tr>
                        <td>전시 0일 전</td>
                        <td>티켓 결제 금액의 0% 부과</td>
                    </tr>
                    <tr>
                        <td>전시 0일 전</td>
                        <td>티켓 결제 금액의 0% 부과</td>
                    </tr>
                    <tr>
                        <td>전시 0일 전</td>
                        <td>티켓 결제 금액의 0% 부과</td>
                    </tr>
                </table>
                <div className='explain'>
                    티켓 취소 시 기간에 따른 취소 수수료가 부과됩니다. <br/>
                    취소 수수료는 예매일자 기준이 아닌 관람일 기준으로 부과됩니다.
                </div>


                <div className='btnBlock'>
                    <button onClick={()=>{ }}>취소 신청</button>
                    <button onClick={closeModal}>돌아가기</button>
                </div>
            </Modal>
        
        </>


    );
};

export default CancelTicket;