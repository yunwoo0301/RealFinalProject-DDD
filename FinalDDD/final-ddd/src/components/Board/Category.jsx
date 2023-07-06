import styled, {css} from 'styled-components';

const categories = [

    {
        name: 'menu1',
        text: '추천수다'
    },
    {
        name: 'menu2',
        text: '질문하기'
    },
    {
        name: 'menu3',
        text: '동행찾기'
    },
]

const CategoriesBlock = styled.div`
    /* width: 300px; */
    height: 1em;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

`;

const Category = styled.div`
    margin-bottom: 2rem;
    font-size: 1.2rem;
    white-space: pre; // 공백이나 줄바꿈이 있는 경우 그대로 표시
    text-decoration: none;
    color: inherit; // 부모의 컬러값을 그대로 가져옴
    padding-bottom: .25rem; // 밑줄 효과
    cursor: pointer;

    &:hover {
        color: #495057;
    }
    ${props => 
        props.active && css`
        font-weight: 600;
        border-bottom: 2px solid #22bbcf;
        color: #22b8cf;
        &:hover {
            color: #3bc9db;
        }
    `}

    & + & {
        margin-left: .9rem; // 카테고리 사이 간격
    }
`;

const Categories = ({onSelect, category}) => {
    
    return (
        <CategoriesBlock>
            {categories.map(c=>(
                <Category 
                    key={c.name}
                    active={category===c.name}
                    onClick={()=>onSelect(c.name)}
                >{c.text}</Category>
            ))}
        </CategoriesBlock>
        
    );
};
export default Categories;