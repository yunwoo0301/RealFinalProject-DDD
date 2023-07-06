import React from "react";
import Button from "../../util/Button";
import styled from "styled-components";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    &>*{
        margin: 10px;
    }
    .ratingBox{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .btn {
        width: 100px;
        height: 30px;
    }

`;
const ComentBox = () => {


    return(

        <Container>
        <div className="ratingBox">
        <Stack spacing={1}>
          <Rating name="half-rating" defaultValue={0} precision={0.5} size="large" />
        </Stack>
        </div>
        <div className="okText">평가가 완료되었습니다 </div>
        <div className="btn">
        <Button onClick={()=>console.log("마이페이지로이동")}>코멘트달기</Button>
        </div>
        </Container>
    );
}

export default ComentBox;