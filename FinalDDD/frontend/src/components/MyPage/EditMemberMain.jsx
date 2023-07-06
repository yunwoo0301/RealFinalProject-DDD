import React, { useState } from 'react';
import styled from 'styled-components';
import Thumnail from './Thumnail';
import EditInfo from './EditInfo';
import MyPost from './MyPost';
import { member_info } from './Data';
import MyReservation from './MyReservation';
import DeleteAccount from './DeleteAccount';
import useStore from '../../store';
import ChangePwd from './ChangePwd';

const Container = styled.div`
  /* background-color  : beige; */
  width: 100%;
  height: 100%;
`;

const MenuSpace = styled.div`
    position: relative;
    top: 0%;
    width: 100%;
    height: 62%;
    /* background-color: aqua; */
    display: flex;
    flex-direction: row;
`;
const MenuBlock =  styled.div`
    width: 24%;
    min-width: 200px;
    height: 94%;
    /* background-color: red; */
    padding: 5% 3% 0 3%;
`;

const Menu =styled.div`
    width: 90%;
    height: auto;
    /* background-color: aqua; */
    text-align: center;

    div{
        width: 90%;
        padding: 7% 5%;
        background-color: #F4F8FF;
        font-size: .8rem;
        cursor: pointer;
        :hover{
            background-color: #5EADF7;
            color: white;
        }
    }
    .FocusedMenuBtn{
        width: 90%;
        padding: 7% 5%;
        background-color: #5EADF7;
        color: white;
        font-size: .8rem;
        cursor: pointer;
    }
`;


const EditMemberMain = () => {
    const [pageOnEdit, setPageOnEdit] = useState(0)
    const { setShowPage } = useStore();

    return (
        <>   
        {/* <Thumnail/> */}
        <Container>
            <MenuSpace>
                <MenuBlock>
                    <Menu>
                        {
                            pageOnEdit === 0 ? 
                            (<div className='FocusedMenuBtn'>내 정보 수정</div>) : 
                            (<div onClick={()=> setPageOnEdit(0)}>내 정보 수정</div>)

                        }
                        <div onClick={() => (setShowPage('마이페이지'))}>마이페이지</div>

                        {
                            pageOnEdit === 2 ? 
                            (<div className='FocusedMenuBtn'>비밀번호 변경</div>) : 
                            (<div onClick={()=> setPageOnEdit(2)}>비밀번호 변경</div>)
                        }
                        {
                            pageOnEdit === 1 ? 
                            (<div className='FocusedMenuBtn'>회원탈퇴</div>) : 
                            (<div onClick={()=> setPageOnEdit(1)}>회원탈퇴</div>)
                        }
                    </Menu>
                </MenuBlock>
                {/* state에 따라서 컴퍼넌트 출력 */}
                        {pageOnEdit === 0  && <EditInfo />}
                        {
                            pageOnEdit === 1 && <DeleteAccount/>
                        } 
                        {
                            pageOnEdit === 2 && <ChangePwd/>
                        } 
            </MenuSpace>
        </Container>
        </>
       

    );
};

export default EditMemberMain;