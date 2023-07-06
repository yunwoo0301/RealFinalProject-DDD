import styled from 'styled-components';
import Card from '../components/Board/Card';
import {useState, useCallback} from 'react';
import Categories from '../components/Board/Category';
import { useNavigate } from 'react-router-dom';
import Recommend from '../components/Board/Recommend';
import Question from '../components/Board/Question';
const Wrap = styled.div`
    width: 100%;
    height: 100vh;
    margin: 0 auto;

    .boardtitle {
        margin-left: 6em;
        margin-bottom: 1em;
        display: flex;
        align-items: center;
        font-size: 30px;
        font-weight: 600;
        color: #1a5d98;
        
        h2 { 
            font-size: 1em;
            margin-top: 35px;  
            color:black; 
        }

    }  
    
    button {
            float: right;
            margin: -1.5em 16em ;
            /* font-size: 1em; */
            font-size: 14px;
            /* padding: 8px 30px; */
            padding: .5em 2em;
            border-radius: 20px;
            background-color: #050E3D;
            color: white;
            border: none;
            transition: all .1s ease-in;
            cursor: pointer;
            font-weight: bold;
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
        <Wrap>
            <div className="boardtitle">
                <h2>자유 게시판</h2>
            </div>
            <div className="category">
                <Categories category={category} onSelect={handleSelect}/>
                {category === 'menu1' && <Recommend />}
                {category === 'menu2' && <Question />}
                {category === 'menu3' && <Card />}
            </div>
        </Wrap>
    )
};

export default BoardList;

