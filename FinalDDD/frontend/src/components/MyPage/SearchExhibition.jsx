import {React, useEffect} from 'react';
import styled from 'styled-components';
import useStore from '../../store';

const Container = styled.div`
  width: 100%;
  height: 50vh; // 이 부분을 수정
  overflow: hidden;
  position: relative; // 이 부분을 추가
  .videoBox {
    width: 100vw;
    height: 50vh;
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .searchBlock{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    flex-direction: column;
    /* background-color: red; */
    .title{
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      text-align: left;
      padding: 0.5rem;
      line-height: 2.5rem;
    }

    .searchBar {
    width: 18rem;
    height: 3rem;
    border-radius: 10rem;
    padding: 0 2rem;
    outline: none;
    border: 1px solid #c2c2c2;
  }

  }

`;

const BlackBG = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.6;
  position: absolute;
  top: 0;
`;


const SearchExhibition = () => {
  const { search, setSearch, stealExhibition, setFilterExhibition } = useStore();

  // const videoUrl = "https://s3.eu-west-1.amazonaws.com/eu-west-1.vimeo.com/videos/638/229/638229488.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZRUUNWVAWWO32QM7%2F20230719%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230719T155004Z&X-Amz-Expires=172800&X-Amz-SignedHeaders=host&X-Amz-Signature=98cc865d21dc0c048d3517c804c87b7c86d63c4f01238b765a067da71e7d1d7f";
  const imgUrl ="https://images.unsplash.com/photo-1501270067467-8298cce1babb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
  const handleFind = (e) => {
    const currentWord = e.target.value;
    setSearch(currentWord);
  };

  useEffect(() => {
    const filterSearch = stealExhibition.filter((item) =>
      item.exhibitName.toString().includes(search.toString())
    );
    setFilterExhibition(filterSearch);
  }, [search, stealExhibition]);


    return (
        <Container>
          <div className='videoBox'>
            <div className='searchBlock'>
              <div className="title">
                <span style={{fontSize:'1.0rem', fontWeight:'400'}}>Get Your Diary</span>  <br/>
                당신만의 다이어리를 완성해보세요 !
                </div>
              <input type="text" className='searchBar' placeholder='전시회를 검색하세요' value={search} onChange={handleFind}/>
            </div>

            <BlackBG/>
            {/* <video autoPlay loop muted >
              <source src={videoUrl} type="video/mp4" />
            </video> */}
            <img src={imgUrl} alt="" />
          </div>
        </Container>
    );
};

export default SearchExhibition;