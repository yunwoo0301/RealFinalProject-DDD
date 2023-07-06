import React from "react";
import styled,{css} from "styled-components";

const Container = styled.div`
    width: 300px;
    height: 30px;
    border: 1px solid black;
    border-radius: 30px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    


`
const Category = styled.div`
   
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        background-color:#5EADF7;
        border-radius : 30px;
    }
    ${props => 
        props.active && css`
        border-radius : 30px;
        font-weight: bold;
        background-color:#5EADF7;
    `}
    
`;

const Categroy = ({onSelect,category,categories})=> {

    const handleClick = categoryName => {
        onSelect(categoryName);
      };
    
    return(
        <Container>
         {categories.map((c)=>(
            <Category key={c.name} active={category===c.name} onClick={()=>handleClick(c.name)}>
            {c.text}                
            </Category>
        ))}
        </Container>
    );
}

export default Categroy;