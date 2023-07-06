import React, { useState } from "react";
import styled from "styled-components";
import AdminNav from "./AdminNav";
import Header from "../header/Header";
import DashBoard from "./Dashboard";
import Members from "./Members";
import ReservationManage from "./Reservation";
import BoardsManage from "./BoardsManage";
import ExhibitManage from "./Exhibition";
import AdsManage from "./AdManage";

const AdminmainContainer = styled.div`
    display: flex;
    flex-direction: row;
    


`


const AdminMain = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState("dashboard");






    return(
        <>
        <Header/>
        <AdminmainContainer>
        <AdminNav activeMenuItem={currentMenuItem} setCurrentMenuItem={setCurrentMenuItem}/>
        {currentMenuItem === "dashboard" && <DashBoard/>}
        {currentMenuItem === "members" && <Members/>}
        {currentMenuItem === "reservation" && <ReservationManage/>}
        {currentMenuItem === "boards" && <BoardsManage/>}
        {currentMenuItem === "exhibitions" && <ExhibitManage/>}
        {currentMenuItem === "ads" && <AdsManage/>}
        </AdminmainContainer>
        </>
    );
}

export default AdminMain;