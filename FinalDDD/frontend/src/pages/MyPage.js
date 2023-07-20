import React from "react";
import MyPageBG from "../components/MyPage/MyPageBG";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate()

    const removeLocalstorage = () =>{
        localStorage.removeItem("isLogin");
        localStorage.removeItem("storageEmail");
        localStorage.removeItem("memberId");
        localStorage.removeItem("accessToken");
        navigate('/')
    }

    return(
        <>
        {/* <button onClick={removeLocalstorage}>로그아웃</button>
        <button onClick={()=>navigate('/ratediary')}>다이어리 평가 </button> */}
        {/* <button onClick={()=>{navigate('/SearchExhibition')}}>SearchExhibition</button> */}
            <MyPageBG/>
            
        </>
    );
}

export default MyPage;