import React from "react";
import styled from "styled-components";


const SelectBox = styled.select`

    width: 100px;
    height: 30px;
    option{
        font-size: 20px;
    }
  
`

const SelectBtn = ({selectedOption,setSelectedOption,options}) => {

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    }


    return(

        <SelectBox value={selectedOption} onChange={handleChange}>
        {options.map(e=>(
            <option key={e} value ={e} >{e}</option>
        ))}
        </SelectBox>
    );
}

export default SelectBtn;