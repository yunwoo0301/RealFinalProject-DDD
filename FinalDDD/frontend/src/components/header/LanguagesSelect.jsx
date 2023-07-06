import React, {useState} from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { US, KR } from 'country-flag-icons/react/3x2';

const SelectStyle = styled.div`
    margin-top: 0.8rem;
    color: #050E3D;
    .input-label{
        color: #050E3D;
        display: flex;
        font-size: 0.8rem;
        font-weight: bold;
        margin-bottom: 0.2rem;
        align-items: center;
        justify-content: center;
    }
    .select-container{
        color: #050E3D;
        font-size: 0.5rem;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        .input-label {
            font-size: 0.6rem;
        }
        .select-container {
            font-size: 0.4rem;
        }
    }

`;

const LanguagesSelect = () => {
    const { t, i18n } = useTranslation();
    const [languages, setLanguages] = useState('');

    const handleChange = (e) => {
      const selectedLanguage = e.target.value;
      setLanguages(selectedLanguage);
      i18n.changeLanguage(selectedLanguage);
    };



    return(
        <SelectStyle>
        <FormControl sx={{m: 0, minWidth: 100 }} variant="standard" >
      {/* <InputLabel className="input-label" id="demo-select-small-label">언어</InputLabel> */}
      <Select
        className="select-container"
        id="demo-simple-select-standard"
        value={languages}
        onChange={handleChange}

        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value="" sx={{fontSize: 10}}>
            <em>언어/Languages</em>
          </MenuItem>
        <MenuItem value="ko-KR" sx={{fontSize: 10}}><KR title="South Korea" height="0.5rem"/>{t('korean')}</MenuItem>
        <MenuItem value="en-US" sx={{fontSize: 10}}><US title="United States" height="0.5rem"/>{t('english')}</MenuItem>
      </Select>
    </FormControl>
        </SelectStyle>


    );
}

export default LanguagesSelect;