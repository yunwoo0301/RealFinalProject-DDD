import React, { useState } from "react";
import styled from "styled-components";
import {BsEnvelopePaperHeart} from "react-icons/bs";
import Button from "../../util/Button";
import DDDApi from "../../api/DDDApi";
import {BsEnvelopeHeart} from "react-icons/bs";
import ConfirmModal from "../../util/ConfirmModal";

const Modal = styled.div`
    position: fixed;
    width: 20rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3rem;
    z-index: 90;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 93;
    .reservationBox{
        box-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.3), 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.3);
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
        flex-direction: column;
        justify-content:  space-between;
        text-align: left;
        p{
          font-size: 0.8rem;
          font-weight: bold;
          color: red;
        }
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
          background-color: #fff;
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
          background-color: #fff;
          border: 1px solid #5EADF7;
          border-radius: .3rem;
          padding-top: .8rem;
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








const SendEmail = ({msg, onClose, selectedMember, selectedMembers}) => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const sendEmail = async () => {
    if (selectedMember) {
      // 개별 메일 보내기
      await DDDApi.sendEmail(selectedMember.id, selectedMember.email, title, contents);
    } else if (selectedMembers.length > 0) {
      // 전체 메일 보내기
      for (const member of selectedMembers) {
        await DDDApi.sendEmail(member.id, member.email, title, contents);
      }
    }
    setOpenConfirm(true);
    onClose();
  };



  const [openConfirm, setOpenConfirm] = useState(false);
  const closeConfirm = () => {
    setOpenConfirm(false);
    onClose();
  }

  const props = {
    icon: <BsEnvelopeHeart color="#FF69B4"/>,
    body: (
      <h4> 광고메일이 성공적으로 보내졌습니다🥰</h4>
    ),
    button:(
      <button onClick={closeConfirm}>확인</button>
    )
  }

  const handleTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleContents = (e) => {
    setContents(e.target.value);
  }



    return(
        <>
        {openConfirm && <ConfirmModal props={props}/>}
        <Modal>
        <Container>
            <div className="reservationBox">
                <div className="root">
                <h3>💌광고 메일💌</h3>
                <p>{selectedMember ? '*개별 메일입니다' : '*전체 메일입니다'}</p>
                </div>
                <div className="bodyContainer">
                <div className="textBox">
                  <input
                    type="text"
                    placeholder="제목을 입력해주세요."
                    value={title}
                    onChange={handleTitle}/>
                  <textarea
                    name="contentes"
                    id="contents"
                    placeholder="내용을 입력해주세요."
                    value={contents}
                    onChange={handleContents}/>
                </div>
          </div>
          <div className="btnContainer">
                  <Button className="message" onClick={onClose}>취소</Button>
                  <Button className="message" onClick={sendEmail}>보내기</Button>
          </div>
          </div>
        </Container>
        </Modal>
        </>
    )
}

export default SendEmail;