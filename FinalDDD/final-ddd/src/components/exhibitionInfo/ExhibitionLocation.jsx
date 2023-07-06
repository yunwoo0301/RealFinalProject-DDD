import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    .textBox{
        width: 90%;
        text-align: center;
        &>*{
            margin-top: 1rem;
            }
    }
    .title {
        font-size: 2em;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    .map{
        width: 80%;
        height: 300px;
        background-color:#F4F8FF ;
        border: 2px solid #050E3D;
        text-align: center;
    }

`;

// 스크립트로 kakao maps api를 가지고오면 window전역 객체에 들어가게 되는데
// 함수형 컴포넌트에서는 이를 바로 인식하지 못해 코드상단에 카카오객체를 뽑아서 사용
const {kakao} = window;

const ExhibitionLocation = ({data}) => {
    useEffect(() => {
    // 지도를 담을 영역의 DOM 레퍼런스
    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(data.locationY, data.locationX), // 지도 중심좌표
        // 지도의 레벨(확대, 축소 정도 ->  숫자가 커질수록 해당중심부에서 넓게 보여짐)
        level: 5
    };
    // 지도 생성 및 객체 리턴
    const map = new kakao.maps.Map(container, options);
    
    // 지도 마커 생성
    const markerPosition = new kakao.maps.LatLng(data.locationY, data.locationX);
    const marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);
    }, [])
    
    return(

        <>
        {data &&
        <Container>
        <div className="textBox">
        <div className="title">전시 장소 위치</div>
        </div>
        <div className="map" id="map">
        </div>
        <div className="textBox">
        <div>{data.exhibitAddr}</div>
        <div>{data.phoneNo}</div>
        <div><a href={data.placeUrl} target="_blank" rel="noopener noreferrer">{data.placeUrl}</a></div>
        </div>
        </Container>
        }
        </>
    );
}

export default ExhibitionLocation;