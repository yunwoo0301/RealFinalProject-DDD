import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import Button from "./Button";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/md"
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  img{
      overflow: hidden;
        width: 12rem;
        height: 100%;
        position: absolute;
        top: 0;
        left: 120px;
        transform: translateX(-50%);
        background-image: url(${props => props.imgUrl});
        background-repeat: no-repeat;
        background-size:cover;
    }
 .name {
        color : black;
        font-weight: bolder;
        font-size: 2rem;
        width: 100%;
        text-align: center;
        position: absolute;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);

    }
    .date {
        font-size: 1.3rem;
        position: absolute;
        top: calc(80px + 5rem);
        left: 50%;
        transform: translateX(-50%);
    }
    .location{
        font-size: 1rem;
        position: absolute;
        top: calc(80px + 8rem);
        left: 50%;
        transform: translateX(-50%);
    }
    .btn{
      width: 150px;
      height: 40px;
      position: absolute;
      top: calc(80px + 7rem);
      right: 40px;
    }

    @media (max-width: 768px) {
    .name{
      font-size: 1.5rem;
    }
    .date{
      font-size : 1rem;
    }

  }
`;
const ImgBox = styled.div`
    width: 100%;
    height: 250px;
    position: relative;
    background-image: url(${props => props.imgUrl});
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.3;
   


`;
const PrevArrow = styled.div`
  color: #050e3d;
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: -40px;
  transform: translateY(-50%);
  cursor: pointer;

`;
const NextArrow = styled.div`
color: #050e3d;
font-size: 30px;
position: absolute;
top: 50%;
right: -40px;
transform: translateY(-50%);
cursor: pointer;

`;

const SliderContainer = styled.div`
  background-image: url(${props => props.imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.3;
`

const Carousel = ({data}) => {
    const navigate = useNavigate();

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <PrevArrow><MdKeyboardArrowLeft/></PrevArrow>,
        nextArrow: <NextArrow><MdKeyboardArrowRight/></NextArrow>
      };

      const handleDetailClick = (exhibitNo) => {
        navigate(`/exhibitInfo/${exhibitNo}`);
      };
      
      return (
        <div>
          <Slider {...settings}>
            {data.map((e) => (
                <Container key={e.exhibitNo} >
                <ImgBox imgUrl ={e.imgUrl}/>
                <img src={e.imgUrl}></img>
                <div className="name">{e.exhibitName}</div>
                <div className="date">{e.startDate} ~ {e.endDate}</div>
                <div className="location">{e.exhibitLocation}</div>
                <div className="btn">
                <Button onClick={()=>handleDetailClick(e.exhibitNo)}>상세보기</Button>
                  </div>
                </Container>
            ))}
          </Slider>
        </div>
      );
  
  
};

export default Carousel;
