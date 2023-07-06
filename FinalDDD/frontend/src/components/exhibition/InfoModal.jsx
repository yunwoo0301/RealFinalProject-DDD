import React from "react";
import styled from 'styled-components';

const ModalStyle = styled.div`

    .modal {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 99;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .openModal {
        display: flex;
        align-items: center;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-bg-show 0.8s;
    }
    button {
        outline: none;
        cursor: pointer;
        margin-right: 10px;
        border: 0;
    }
    section {
        width: 800px;
        margin: 0 auto;
        border-radius: 0.2rem;
        background-color: #fff;
        /* 팝업이 열릴때 스르륵 열리는 효과 */
        animation: modal-show 0.3s;
        overflow: hidden;
    }
    section > header {
        position: relative;
        /* padding: 16px 64px 16px 16px; */
        font-weight: 700;
    }
    section > header button {
        position: absolute;
        top: 15px;
        right: 15px;
        width: 30px;
        font-size: 30px;
        font-weight: 900;
        text-align: center;
        color: #999;
        background-color: transparent;
    }
    @keyframes modal-show {
        from {
            opacity: 0;
            margin-top: -50px;
        }
        to {
            opacity: 1;
            margin-top: 0;
        }
    }
    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
  

`;

const InfoModal = (props) => {
    const { open,close,children} = props;

    return (
        <ModalStyle>
            <div className={open ? 'openModal modal' : 'modal'}>
            {open &&
                <section>
                    <header>
                        <button onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>{children}</main>
                </section>
            }
            </div>
        </ModalStyle>
    );
};

export default InfoModal;