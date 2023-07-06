import React, { useState } from "react";
import styled from "styled-components";
import { DisplayData } from "./DisplayData";
import WeekRanking from "./WeekRanking";
import LocRanking from "./LocRanking";
import TodayRec from "./TodayRec";
import { useTranslation } from "react-i18next";
import MuseumInfo from "./Museum";
import BG from "../../resources/BGimg1.jpg"

const BodyContainer = styled.div`
    width: 1200px;
    margin: 0 auto;

    .open-display {
        margin-top: 4rem;
        height: 30rem;
        .open-container {
            margin: 2rem;
            height: 80%;
            >img {
            width: 16rem;
            height: 20rem;
        }
        }

    }
    .popular-display {
        margin-top: 4rem;
        height: 30rem;
        display: flex;
        flex-direction: column;
        .title-container {
            display: flex;
        }

        .popular-container {
            margin: 2rem;
            height: 80%;
        }
        
    }

    @media (max-width: 768px) {
        h2{
            font-size: 1.3rem;
        }
        .open-display {
        margin: 2rem;
        height: 30rem;
            .open-container {
            height: 80%;
                >img {
                width: 13rem;
                height: 16rem;
                }
            }
        }
        .popular-display {
        margin: 0 2rem 2rem 2rem;
        height: 30rem;
        display: flex;
        flex-direction: column;
        .title-container {
            display: flex;
        }
        }
    }
    
`;

const FirstBodyLayer = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(${BG});
    background-size: cover;
`

const StyledH2 = styled.h2`
    margin: 0 2rem 0 0;
    cursor: pointer;
    text-decoration: ${({ selected }) => selected ? 'underline' : 'none'};
    color: ${({ selected }) => selected ? '#050E3D' : '#5EADF7'};
`;


const MainBody = () => {
    // 오픈이미지
    const img2 = DisplayData[2];

    // 금주의랭킹, 지역별랭킹
    const [displayType, setDisplayType] = useState('week');

    const handleWeekRanking = () => {
        setDisplayType('week');
    };

    const handleLocRanking = () => {
        setDisplayType('loc');
    }
    
    // 다국어
    const {t} = useTranslation();



    return(
        <>
        <FirstBodyLayer>
        </FirstBodyLayer>
        <BodyContainer>
        <div className="open-display">
            <h2>{t('opened-display')}</h2>
            <div className="open-container">
                <img src={img2.imgUrl} alt="오픈 전시 이미지" />
            </div>
        </div>
        <div className="popular-display">
            <div className="title-container">
                <StyledH2 selected={displayType === 'week'} onClick={handleWeekRanking}>{t('Raking of Thisweek')}</StyledH2>
                <StyledH2 selected={displayType === 'loc'} onClick={handleLocRanking}>{t('Ranking by Region')}</StyledH2>
            </div>
            <div className="popular-container">
                {displayType === 'week' ? <WeekRanking/> : <LocRanking/>}
            </div>
        </div>
        </BodyContainer>
        <TodayRec/>
        <BodyContainer>
            <MuseumInfo/>
        </BodyContainer>

        </>

    );
}

export default MainBody;