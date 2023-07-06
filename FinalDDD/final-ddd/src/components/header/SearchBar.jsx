import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import styled from "styled-components";

const SearchBarContainer = styled.div`

  @media (max-width: 768px) {
    display: none;
  }
`;


const SearchBar = () => {
  return (
    <SearchBarContainer>
    <div style={{ float: 'right', display: 'flex', alignItems:'center', justifyContent:'center'}}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { width: "20ch" },
        }}
        noValidate
        autoComplete="on"
      >
        {" "}
        <TextField id="standard-search" type="search" variant="standard" />
        <IconButton type="submit" sx={{ size: "2rem"}} aria-label="search">
            <SearchIcon sx={{fontSize:"2rem", color: "black"}}/>
        </IconButton>
      </Box>
    </div>
    </SearchBarContainer>
  );
}

export default SearchBar;
