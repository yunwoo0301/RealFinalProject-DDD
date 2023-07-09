import React from 'react';
import ChatBot from 'react-simple-chatbot';
import styled, { ThemeProvider } from 'styled-components';


const ChatContainer = styled.div`
    width: 100%;
    z-index: 99;
    margin-left: 2rem;
    .answer{
        font-size: 0.8rem;
    }
`;

const inputStyle = {
    display: 'none', // 입력 창을 숨김 처리
  };

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
            message: `안녕하세요.
            :Diverse Different Display에 오신걸 환영합니다.`,
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
            message: `문의하실 내용을 선택하세요.`,
            trigger: '4',
        },
        {
            id: '4',
            options: [
                {value:1, label: '예매문의', trigger: '5'},
                {value:2, label: '취소문의', trigger: '6'},
                {value:3, label: '회원정보문의', trigger: '7'},
            ],
        },
        {
            id: '5',
            message: `예매문의를 선택하셨습니다.
            원하시는 상세문의를 선택해주세요.`,
            trigger: '15'
        },
        {
            id: '6',
            message: `취소문의를 선택하셨습니다.
            원하시는 상세문의를 선택해주세요.`,
            trigger: '16'
        },
        {
            id: '7',
            message: `회원정보문의를 선택하셨습니다.
            원하시는 상세문의를 선택해주세요.`,
            trigger: '17'
        },
        {
            id: '8',
            message: `문의를 계속진행하시겠습니까?`,
            trigger: '10'
        },
        {
            id: '9',
            message: `문의주셔서 감사합니다. 궁금한 점이 있으면 언제든지 문의주세요!🥰`
        },
        {
            id: '10',
            options: [
                {value:1, label: '예', trigger:'4'},
                {value:2, label: '아니오', trigger:'9'}
            ]
        },
        {
            id: '15',
            options: [
                {value:1, label: '전시관람', trigger: '151'},
                {value:2, label: '티켓가격', trigger: '152'},
                {value:3, label: '할인정책', trigger: '153'},
                {value:4, label: '예매방법', trigger: '154'},
                {value:5, label: '결제수단', trigger: '155'},
                {value:6, label: '이전문의', trigger: '3'},
                {value:7, label: '나가기', trigger: '8' }
            ],
        },
        {
            id: '151',
            component: (
                <div className='answer'>
                    <h4>전시관람시간 및 전시관위치</h4>
                    <p>전시의 운영 시간은 전시에 따라 다를 수 있으며, 일반적으로 주말과 평일 간에 운영 시간이 차이가 있을 수 있습니다. <br/>
                    전시의 공식 웹사이트나 전시 상세 정보에서 운영 시간을 확인하실 수 있습니다.</p>
                </div>
            ),
            trigger: '15',
        },
        {
            id: '152',
            component: (
                <div className='answer'>
                    <h4>티켓가격</h4>
                    <p>전시마다 티켓 가격은 상이하며, 일반적으로 전시의 공식 웹사이트나 해당 전시 상세페이지에서 해당 정보를 확인하실 수 있습니다. </p>
                </div>
            ),
            trigger: '15',
        },
        {
            id: '153',
            component: (
                <div className='answer'>
                    <h4>할인정책</h4>
                    <p>본 사이트에서 따로 이벤트가 없을 시, 전시마다 할인정책이 상이하기 때문에 전시 상세페이지나 해당 전시 홈페이지를 참고하여주시길 바랍니다.</p>
                </div>
            ),
            trigger: '15',
        },
        {
            id: '154',
            component: (
                <div className='answer'>
                    <h4>예매방법</h4>
                    <p>전시 예매는 본 사이트의 예매 플랫폼을 통해 온라인으로 진행됩니다. 예매 페이지에서 원하는 일자와 인원을 선택한 후 결제 단계로 진행하면 됩니다.</p>
                </div>
            ),
            trigger: '15',
        },
        {
            id: '155',
            component: (
                <div className='answer'>
                    <h4>결제방법</h4>
                    <p>결제수단으로는 무통장입금 또는 카카오페이결제로 가능합니다.</p>
                </div>
            ),
            trigger: '15',
        },
        {
            id: '16',
            options: [
                {value:1, label: '예매취소기한', trigger: '161'},
                {value:2, label: '예매취소수수료', trigger: '162'},
                {value:3, label: '무통장입금', trigger: '163'},
                {value:4, label: '카카오페이', trigger: '164'},
                {value:6, label: '이전문의', trigger: '3'},
                {value:7, label: '나가기', trigger: '8' }
            ],
        },
        {
            id: '161',
            component: (
                <div className='answer'>
                    <h4>예매취소기한</h4>
                    <p>예매취소는 관람당일을 제외하고 언제든지 취소가능합니다. <br/> 단, 취소수수료가 부과될 수 있으니 확인 후 취소하시길 바랍니다.</p>
                </div>
            ),
            trigger: '16',
        },
        {
            id: '162',
            component: (
                <div className='answer'>
                    <h4>예매취소수수료</h4>
                    <p>수수료는 관람일 기준 7일 전 까지는 부과되지않으며 <br/>
                    관람 전 7일 후부터 관람 하루 전까지는 티켓금액의 10%로가 수수료로 부과됩니다. <br />
                    관람당일은 취소가 불가하니 참고부탁드립니다.</p>
                </div>
            ),
            trigger: '16',
        },
        {
            id: '163',
            component: (
                <div className='answer'>
                    <h4>무통장입금 및 취소</h4>
                    <p>무통장을 원하시는 은행을 선택 후 결제일 당일 24시 전까지 입금해주셔야 예매가 확정됩니다. <br />
                    무통장입금건의 취소는 취소버튼을 누르시면 2~3일 후 회원님계좌로 다시 입금됩니다.
                    </p>
                </div>
            ),
            trigger: '16',
        },
        {
            id: '164',
            component: (
                <div className='answer'>
                    <h4>카카오페이 및 취소</h4>
                    <p>카카오페이결제 후 카카오페이를 통한 결제방법(카카오머니, 신용카드)에 따라 환불됩니다. <br />
                    최대 3일의 기한이 소요되니 참고 부탁드립니다.</p>
                </div>
            ),
            trigger: '16',
        },
        {
            id: '17',
            options: [
                {value:1, label: '회원가입', trigger: '171'},
                {value:2, label: '개인정보수정', trigger: '172'},
                {value:3, label: '회원탈퇴', trigger: '173'},
                {value:6, label: '이전문의', trigger: '3'},
                {value:7, label: '나가기', trigger: '8' }
            ],
        },
        {
            id: '171',
            component: (
                <div className='answer'>
                    <h4>회원가입</h4>
                    <p>회원가입은 홈페이지 우측상단의 로그인 아이콘을 클릭하시고, <br />
                    회원가입 버튼을 누르신 후 요구되는 정보를 입력하면 가입가능합니다.</p>
                </div>
            ),
            trigger: '17',
        },
        {
            id: '172',
            component: (
                <div className='answer'>
                    <h4>개인정보수정</h4>
                    <p>이메일(회원아이디), 이름을 제외한 모든 정보는 회원수정페이지에서 수정가능합니다.  <br />
                    이메일 또는 이름변경을 원하실 경우 1:1문의를 이용해주세요.</p>
                </div>
            ),
            trigger: '17',
        },
        {
            id: '173',
            component: (
                <div className='answer'>
                    <h4>회원탈퇴</h4>
                    <p>회원탈퇴는 마이페이지 내 회원정보수정페이지에서 가능합니다.<br />
                    회원탈퇴시 모든 회원정보도 같이 삭제되오니 예매한 전시가 남아있는지 확인하시고 진행해주세요. <br />
                    ❗️회원탈퇴시 복구는 불가하오니 참고부탁드립니다.❗️</p>
                </div>
            ),
            trigger: '17',
        },


    ];

    return (
        <ChatContainer>
        <ThemeProvider theme={theme}>
            <ChatBot
                headerTitle="❣️문의하기❣️ 문의하실 내용을 선택해주세요"
                steps={steps}
                hideUserAvatar={true}
                hideBotAvatar={true}
                inputStyle={inputStyle}
                hideSubmitButton={true}
            />
        </ThemeProvider>
        </ChatContainer>
    )

}

export default Chatbot;