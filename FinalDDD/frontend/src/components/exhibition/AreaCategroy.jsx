import React from "react";
import styled,{css} from "styled-components";

const Container = styled.div`
    width: 30em;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    


`
const Category = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
        color:#050E3D;
    }
    ${props => 
        props.active && css`
        color:#050E3D;
        font-weight: bold;
    `}
    
`;
const categories = ['서울','경기','인천','충청','강원','전북', '전남', '광주', '경북','경남','부산','제주']
const AreaCategroy = ({onSelect,category})=> {

    const handleClick = categoryName => {
        onSelect(categoryName);
      };
    


    return(
        <Container>
         {categories.map(c=>(
            <Category key={c} active={category===c} onClick={()=>handleClick(c)}>
            {c}                
            </Category>
        ))}
        </Container>
    );
}

export default AreaCategroy;