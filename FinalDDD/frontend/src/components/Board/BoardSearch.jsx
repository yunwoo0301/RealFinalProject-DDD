import { useState } from "react";
import styled from "styled-components";
import { IoSearch} from "react-icons/io5";
import DDDApi from "../../api/DDDApi";

const SearchWrap = styled.div` // 검색창 활성화 안된 부분 일부 위치 수정

    display: flex;
    width: 12em;
    padding: 0 5px;
    border: solid 2px #ddd;
    background-color: white;
    margin: .7em 1em;
    margin-left: auto;
    border-radius: 5px;
    cursor: pointer;
    transition: border-color 0.3s ease; // 테두리 색상 변화에 부드러운 전환 효과

    :hover {
            border-color: black; // 호버 했을 때의 테두리 색상
        }

    @media (max-width: 768px) {
    }

    input {
        width: 160px;
        height: 26px;
        border: 0px;
        outline: none;
        margin-right: 10px;
    }

    .icon_container {


        .searchicon {
            color: #8c8787;
            margin-top: 6px;
        }
    }

`;



const BoardSearch = ({ onSearch, category }) => {

     // 검색
     const [keyword, setKeyword] = useState("");

     const onChangeSearchKeyword = (e) => {
         setKeyword(e.target.value);
     };

     const onClickSearch = async () => {
         try {
            const response = await DDDApi.searchListLoad(keyword);
            const filteredList = response.data.filter(boardList => boardList.category === category); // 수정사항
            onSearch(filteredList); // 검색 결과를 부모 컴포넌트로 전달 ** 수정사항
            } catch (e) {
            console.log(e);
            }
     };

     // 엔터를 눌렀을 때도 검색 되게
     const onKeyEnterSearch = (e) => {
         if (e.key === "Enter") {
           onClickSearch();
           setKeyword(""); // 검색 후 검색창 빈칸으로 만들기
         }
       };



     return(
         <SearchWrap>
            <input
                name="searchkeyword"
                title="검색"
                placeholder="검색어를 입력하세요"
                onChange={onChangeSearchKeyword}
                onKeyDown={onKeyEnterSearch}
                value={keyword}/>
            <div className="icon_container">
                <IoSearch className="searchicon" onClick={onClickSearch}/>
             </div>
         </SearchWrap>
     )
 };

 export default BoardSearch;