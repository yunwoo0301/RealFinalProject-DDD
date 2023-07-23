import React from "react";
import MyPageBG from "../components/MyPage/MyPageBG";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";

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
        <Header/>

            <MyPageBG/>
            
        </>
    );
}

export default MyPage;