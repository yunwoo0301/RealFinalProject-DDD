import React from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import {SlArrowLeft, SlArrowRight} from 'react-icons/sl'

const PageNationBlock = styled(ReactPaginate)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  list-style: none;
  font-size: .8rem;
  padding: 0;



    .page-item{
    color :black;
    margin: 0rem .6rem;
    border-radius: 1rem;
    border : 1px solid #aaa;
    display: flex;
    width: 1.8rem;
    height: 1.8rem;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .active{
    background-color: #5EADF7;
    color :white;
    }
 

`;


const PageNation = ({pageCount,onPageChange}) => {
  
    return(
        <PageNationBlock
        previousLabel={<SlArrowLeft style={{margin:'0 .5rem', paddingTop:'3px', cursor:'pointer'}}/>}
        nextLabel={<SlArrowRight style={{margin:'0 .5rem',paddingTop:'3px', cursor:'pointer' }}/>}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        pageLinkClassName={'page-item'}
        activeLinkClassName={'active'}
        />
    );
}


export default PageNation;