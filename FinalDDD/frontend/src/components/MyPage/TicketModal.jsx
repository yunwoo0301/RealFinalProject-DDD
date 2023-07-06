import React from 'react';
import styled from 'styled-components';
import CancelTicket from './CancelTicket';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MobileTicket from './MobileTicket';


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
        left: 44%;
        top: 2%;
        cursor: pointer;
    }

    .title{
        font-size: 3rem;
        /* background-color: red; */
        padding: 1.5rem 0 ;
    }
    .exhImg{
        width: 56%;
        height: 20rem;
        /* background-color: aqua; */
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
            border: 1px solid #ccc;
        }
    }
    .desc{
        text-align: center;
        padding: 1rem;
        span{
            /* background-color: red; */
            line-height: 2rem;
        }

    }
    .btnBlock{
            height: 30%;
            width: 90%;
            display: flex;
            justify-content: center;
            /* background-color: red; */

            button{
                width: 22%;
                height: 2.3rem;
                border-radius: 3rem;
                margin : 0rem .5rem;
                background-color: #5EADF7 ;
                border: 1px solid #F4F8FF;
                color: white;
                font-size: .8rem;
                cursor: pointer;
                /* float : right; */
                display: flex;
                justify-content:center;
                align-items: center;
                .link{
                    text-decoration: none;
                    color: inherit;
                }
            }
        }
`;

const BlackBG = styled.div`
    background-color: black;
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.6;
    top: 0%;
    left: 0%;
    
`;

const TicketModal = ({ resevationData, closeModal }) => {
    const [cancelPage, setCancelPage] = useState(true);

    const openCancel = () => {
        setCancelPage(!openCancel);
        console.log('캔슬페이지' + cancelPage);
        
    }

    useEffect(() => {
    }, [cancelPage]);


    return (
        <>
            <BlackBG />
            <Modal>
                {cancelPage ? 
                (
                    <MobileTicket openCancel={openCancel} closeModal={closeModal} resevationData={resevationData}/>
                ) 
                : 
                (
                    <CancelTicket closeModal={closeModal}/>
                )
                }
            </Modal>
        </>
    );
};

export default TicketModal;
