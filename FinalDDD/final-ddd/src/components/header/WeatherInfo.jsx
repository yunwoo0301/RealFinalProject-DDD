import React, {useEffect, useState} from "react";
import axios from "axios";
import { IoMdSunny, IoIosPartlySunny, IoMdCloudy, IoIosThunderstorm } from "react-icons/io";
import { BsCloudRainFill, BsCloudSnowFill } from "react-icons/bs";
import { FaCloudSunRain, FaSmog } from "react-icons/fa";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const WeatherStyle = styled.div`
    .weather-container {
        display: flex;
        margin-top: 0.8rem;
        margin-right: 1rem;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;
        .icons{
            margin-right: 0.5rem;
            font-size: 1rem;
        }
        .degree {
            font-weight: bold;
            margin-right: 0.5rem;
            font-size: 0.8rem;
        }
        .location {
            font-weight: bold;
            font-size: 0.8rem;
            width: 2rem;
        }
    }
`;

const weatherIcon = {
    '01' : <IoMdSunny/>,
    '02' : <IoIosPartlySunny/>,
    '03' : <IoMdCloudy/>,
    '04' : <IoMdCloudy/>,
    '09' : <FaCloudSunRain/>,
    '10' : <BsCloudRainFill/>,
    '11' : <IoIosThunderstorm/>,
    '13' : <BsCloudSnowFill/>,
    '50' : <FaSmog/>
};


// 날씨 보여줄 지역들
const locations = ['Seoul', 'Gyeonggi-do', 'Busan', 'Gwangju', 'Gangwon-do', 'Daegu', 'Jeju'];
// 한글로 출력 
const locationsKorean = ['서울', '경기', '부산', '광주', '강원', '대구', '제주'];

const WeatherInfo = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseArray = await Promise.all(locations.map(location =>
                axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=41209c337a94d9dbc18526bf71a3f002`)
            ));
            const data = responseArray.map(response => response.data);
            setWeatherData(data);
            } catch (error) {
                console.log(error);
            }
        };
            fetchData();
    }, []);

  // 3초마다 지역을 바꿔가며 표시

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % locations.length);
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [currentIndex]);

    // 다국어설정
    const {t} = useTranslation();

    return (
        <WeatherStyle>
            {weatherData.length > 0 && (
            <div className="weather-container">
                <div className="icons">{weatherIcon[weatherData[currentIndex].weather[0].icon.substr(0, 2)]}</div>
                    <div className="degree">{Math.floor(weatherData[currentIndex].main.temp - 273.15)}º</div>
                    <div className="location">{t(locationsKorean[currentIndex])}</div>
            </div>
            )}
        </WeatherStyle>
    );
};

export default WeatherInfo;
