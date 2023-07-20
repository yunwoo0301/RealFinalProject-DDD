import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MessageForm from "./MessageForm";

const Modal = styled.div`
    position: fixed;
    width: 20rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3rem;
    box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.3), 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.3);
    z-index: 90;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 99;
    .reservationBox{
        background-color: #F4F8FF;
        width: 30rem;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 20px;
        gap: 1rem;
        border-radius: 10px;
    }
    .receiver{
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      font-weight: bold;
      .iconBox{
        color: #5EADF7;
        font-weight: bold;
        font-size: 2rem;
      }
    }
    .root{
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content:  space-between;
        text-align: left;
    }
    .textBox{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1rem;
        input{
          width: 20rem;
          height: 3rem;
          font-weight: bold;
          background-color: #5EADF7;
          border: 1px solid #5EADF7;
          color: #fff;
          border-radius: .3rem;
          padding-left: .8rem;
          margin-bottom: 1rem;
          }

        textarea{
          width: 20rem;
          height: 20rem;
          font-weight: bold;
          background-color: #5EADF7;
          border: 1px solid #5EADF7;
          color: #fff;
          border-radius: .3rem;
          padding-left: .8rem;
          resize: none;
        }
      }

    .btnContainer{
        margin-top: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 15rem;
        height: 2rem;
        gap: 1rem;
    }
    @media (max-width: 768px) {
        .infoBox{
            flex-direction: row;
            margin: 0;
        }
        .reservationBox{
            width: 100vw;
        }
        .bodyContainer{
            flex-direction: column;
        }
        .rightBox{
            margin: 0;
        }
    }
`;





const ShowMsg = ({props, openReply, setOpenReply}) => {
  const getId = window.localStorage.getItem("memberId");


  const closeReply = () => {
    setOpenReply(false);
  }

    return(
        <>
        {openReply && <MessageForm senderId={getId} receiverId={props.id} receiverName={props.name} close={closeReply}/>}
        <Modal>
        <Container>
            <div className="reservationBox">
                <div className="root">
                <h3>{props.msg}</h3>
                </div>
                <div className="bodyContainer">
                <div className="receiver">
                  <div className="iconBox">{props.icon}</div>
                  <p>{props.name}</p>
                </div>
                <div className="textBox">
                  <input
                    type="text"
                    value={props.title}
                    readOnly/>
                  <textarea
                    name="contentes"
                    id="contents"
                    value={props.contents}
                    readOnly/>
                </div>
          </div>
          <div className="btnContainer">
                  {props.button}
          </div>
          </div>
        </Container>
        </Modal>
        </>
    )
}

export default ShowMsg;