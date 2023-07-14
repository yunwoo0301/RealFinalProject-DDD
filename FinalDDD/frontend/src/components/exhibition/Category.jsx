import React from "react";
import styled,{css} from "styled-components";

const Container = styled.div`
    width: 40%;
    height: 3rem;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: bold;


    @media (max-width: 768px){
        width: 100vw;
    }


`
const Category = styled.div`

    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
        color: #050E3D;
        font-weight: 900;
    }
    ${props =>
        props.active && css`
        font-weight: 900;
        color:#5EADF7;
        text-decoration: underline;
    `}
    @media (max-width: 768px){
        font-size: 0.8rem;
        width: 100vw;
        text-align: center;

    }
    
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