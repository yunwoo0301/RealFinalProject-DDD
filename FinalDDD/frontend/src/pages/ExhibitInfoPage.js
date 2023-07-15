import React, {useCallback, useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Categroy from "../components/exhibition/Category";
import DetailBox from "../components/exhibitionInfo/DetailBox";
import Section from "../components/exhibitionInfo/Section";
import DDDApi from "../api/DDDApi";
import Header from "../components/header/Header";


const Container = styled.div`
    .header {
        width: 100%;
        height: 170px;
    }
    .InfoBox {
        width: 70%;
        height: 20rem;
        margin: 0 auto;

    }
    .category{
        margin: 10px;
    }
    .coment{
      //background-color: #050E3D;
      width: 70%;
      margin : 0 auto;
    }
    .section{
        width: 60%;
        margin : 0 auto;
        margin-bottom: 20px;

    }
    @media (max-width: 768px) {
      .infoBox{
        width: 100%;
      }
      .section{
        width: 100%;
      }
    }
  `;



const ExhibitInfoPage = () => {

   //클릭한 정보id가져오기 (전시번호 가지고오기)
    const { id } = useParams();
    //데이터 상태관리
    const [exData, setExData] = useState({});
     //메뉴 바 상태 관리
    const [category,setCategory] = useState('menu1');
    const categories = [
      {name :'menu1',text : '상세정보'},
      {name :'menu2',text : '전시장소'},
      {name :'menu3',text : '관람후기'}]
    const onSelect = useCallback(category => {
            setCategory(category);
        },[]);

    useEffect(() => {
      const exhibitionDetail = async () => {
        try {
          const exhibitionView = await DDDApi.exhibitDetail(id);
          setExData(exhibitionView.data);
        } catch (e) {
          console.log(e);
        }
      }
      exhibitionDetail();
    }, [id]);

    return(
      <>
      <Header/>
      <Container>
       <div className="InfoBox"><DetailBox data ={exData[0]}/></div>
       {/* <div className="coment"><ComentBox/></div> */}
        <div className="category">
            <Categroy category={category} onSelect={onSelect} categories={categories}/>
        </div>
        <div className="section"><Section category={category} data ={exData[0]}/></div>
      </Container>
      </>
    );
  };


export default ExhibitInfoPage;