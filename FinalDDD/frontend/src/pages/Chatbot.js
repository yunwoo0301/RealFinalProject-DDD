import React from 'react';
import ChatBot from 'react-simple-chatbot';
import styled, { ThemeProvider } from 'styled-components';

const ChatContainer = styled.div`
    width: 100%;
    z-index: 99;
    margin-left: 2rem;
`;

const theme = {
    background: '#F4F8FF',
    headerBgColor: '#050E3D',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#050E3D',
    botFontColor: '#fff',
    userBubbleColor: '#5EADF7',
    userFontColor: '#fff',

}

const Chatbot = () => {
    const steps = [
        {
            id: '0',
            message: `안녕하세요. :Diverse Different Display에 오신걸 환영합니다.`,
            trigger: '1',
        },
        {
            id: '1',
            message: `문의가 있으시다면 시작버튼을 눌러주세요.`,
            trigger: '2',
        },
        {
            id:'2',
            options: [
                {value: 1, label: '시작하기', trigger: '3'},
            ],
        },
        {
            id: '3',
            message:`문의할 내용을 선택해주세요.`
        }
    ];

    return (
        <ChatContainer>
        <ThemeProvider theme={theme}>
            <ChatBot
                steps={steps}
                placeholder={"채팅이 불가능한 채널입니다."}
            />
        </ThemeProvider>
        </ChatContainer>
    )

}

export default Chatbot;