import React from "react";
import styled from "styled-components";
import {BsEnvelopePaperHeart} from "react-icons/bs";
import Button from "../../util/Button";


const Modal = styled.div`
    position: fixed;
    width: 20rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3rem;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
          background-color: #F4F8FF;
          border: 1px solid #5EADF7;
          border-radius: .3rem;
          padding-left: .8rem;
          margin-bottom: 1rem;
          }
        input:focus{
            background-color: #5EADF7;
            outline: none;
            color: white;
            ::placeholder{
            color: white;
            }
        }
        textarea{
          width: 20rem;
          height: 20rem;
          background-color: #F4F8FF;
          border: 1px solid #5EADF7;
          border-radius: .3rem;
          padding-left: .8rem;
          resize: none;
        }
        textarea:focus{
            background-color: #5EADF7;
            outline: none;
            color: white;
            ::placeholder{
            color: white;
            }
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





const MessageForm = () => {



    return(
        <>
        <Modal>
        <Container>
            <div className="reservationBox">
                <div className="root">
                <h3>메세지 보내기</h3>
                </div>
                <div className="bodyContainer">
                <div className="receiver">
                  <BsEnvelopePaperHeart color="#FF69B4"/> 
                  <p>받는사람</p>
                </div>
                <div className="textBox">
                  <input type="text" placeholder="제목을 입력해주세요."></input>
                  <textarea name="contentes" id="contents" placeholder="내용을 입력해주세요."/>
                </div>
          </div>
          <div className="btnContainer">
                  <Button className="message">취소</Button>
                  <Button className="message">보내기</Button>
          </div>
          </div>
        </Container>
        </Modal>
        </>
    )
}

export default MessageForm;