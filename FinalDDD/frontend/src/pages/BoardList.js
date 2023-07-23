import styled from 'styled-components';
import Card from '../components/Board/Card';
import {useState, useCallback} from 'react';
import Categories from '../components/Board/Category';
import Recommend from '../components/Board/Recommend';
import Question from '../components/Board/Question';
import Header from "../components/header/Header";

const Wrap = styled.div`
    width: 100%;
    height: 100vh;
    margin: 0 auto;


    .boardtitle {
        margin-bottom: 1.3em;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2em;
        font-weight: bold;
    }

    button {
            float: right;
            margin: -1.5em 16em ;
            font-size: 14px;
            padding: .5em 2em;
            border-radius: 20px;
            background-color: #050E3D;
            color: white;
            border: none;
            transition: all .1s ease-in;
            cursor: pointer;
            font-weight: bold;
        }

        @media (max-width: 768px) {
    }

`;


const BoardList = () => {
    const [category, setCategory] = useState('menu1');
    const onSelect = useCallback(category => setCategory(category), []);

    const handleSelect = (categoryName) => {
        setCategory(categoryName);
        onSelect(categoryName);
      };


    return(
    <>
    <Header/>
        <Wrap>
            <div className="boardtitle">자유 게시판</div>
            <div className="category">
                <Categories category={category} onSelect={handleSelect}/>
                {category === 'menu1' && <Recommend />}
                {category === 'menu2' && <Question />}
                {category === 'menu3' && <Card />}
            </div>
        </Wrap>
    </>
    )
};

export default BoardList;

