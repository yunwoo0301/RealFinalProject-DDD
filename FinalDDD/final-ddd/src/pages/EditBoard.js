import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DDDApi from '../api/DDDApi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import postimage from "../resources/게시판기본이미지.gif";
import { storage } from '../util/FireBase';


const EditWrap = styled.div`
    width: 75em;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;

    .btn_area {
        text-align: right;
        margin-right: .9em;
 
        .editbtn { // 수정 버튼 속성
                margin-top: 1em;
                padding: 10px 1.6em;
                border-radius: 15px;
                border: none;
                color: white;
                background-color: #050E3D;
                transition: all .1s ease-in;
                font-weight: 600;
                font-size: 14px;
                cursor: pointer;
        
                &:hover {background-color: #5EADF7;
                    color: #F4F8FF;}
            }
            .backbtn { // 취소 버튼 속성
                margin-top: 1em;
                padding: 10px 1.6em;
                border-radius: 15px;
                border: none;
                color: white;
                background-color: #050E3D;
                transition: all .1s ease-in;
                font-weight: 600;
                font-size: 14px;
                cursor: pointer;
                margin-right: 16px;

                &:hover {background-color: #FA6060;
                    color: #F4F8FF;}

            }
            button:nth-child(1) {
                margin-right: 16px;
            }
                
    }
`;

const Section = styled.div`
    width: 1140px;
    float: center;
    position: relative;
    display: flex;
    flex-direction: column;

    div { // 헤더 및 카테고리 박스
        width: 100%;
        padding: 10px 30px;
    }
    .board_header { // 게시물 작성 영역    
        h2 {
            font-size: 1.8em;
            margin-top: 30px;
            font-weight: 900;
        }
    }

    table {
        border-collapse: collapse; 
        width: 100%;
        background-color: #4555AE;
        border-bottom: solid 1px #4555AE;
        text-align: center;
        tr:nth-child(2n) td {background-color: #f9f9f9;}
        th {padding: 10px; color: white;}
        td {padding: 10px; background-color: white; border-left: solid 1px #bbb; border-top: solid 1px #ddd;}
        td:first-child {border-left: none; width: 115px;
            
            select { // 게시판 카테고리 셀렉박스
                text-align:center;
                background: none;
                border: none;
                outline: none;
                font-size: 16px;
                font-weight: 600;
            }
        }
        td:nth-child(2) {width: 100px; text-align: left; padding-left: 20px;
        
            select{ // 지역선택 카테고리 셀렉박스
                text-align:center; 
                background: none;
                border: none;
                outline: none;
                font-size: 16px;
                font-weight: 600;
            }
        }  
        
        td:nth-child(3) {width: 41em; text-align: left; padding-left: 20px;
        
        }

    }
    .input_title {
        font-size: 20px;
        width: 100%;
        height: 30px;
        outline: none;
        display: block;
        margin-bottom: 30px;
        padding-left: 15px;
        margin: 0 auto;
        border: none;
        background: none;
        &:focus {border: none; background:none;}
    }

    .addBoard-wrapper{
            margin-top: 1rem;
            display: flex;
            flex-direction: column-reverse; // 업로드된 이미지 아래로 향하게 설정
            align-items: center;
            justify-content: center;
            width: 100%;
        }
        .imgcontainer {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 12px;
        }

        img {
            width: 50%; /* 이미지의 최대 가로 너비를 설정 */
            height: 50%; /* 이미지의 최대 세로 높이를 설정 */
            /* object-fit: cover; */
            /* align-self: flex-start; */
        }

        .imguploaderBtn {

            button {
                font-size: 14px;
                cursor: pointer;
                border-radius: 10px;
                border: none;
                color: white;
                background-color: #050E3D;
                transition: all .1s ease-in;
                font-weight: bold;
                float: left;
                padding: .5em 1.3em;
                margin-bottom: .5em;

                &:hover {background-color: #5EADF7; color: #F4F8FF;}
                }
        }
    


`;

const TextWrap = styled.div`
    width: 95%;
    margin: 0 auto;
    margin-bottom:20px;

  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 500px; // 텍스트 높이 조절
  }

  .ck-editor__main {padding: 0;}
`;



const EditBoard = () => {
    const getId = localStorage.getItem("memberId");
    const navigate = useNavigate();
    const params = useParams();  // url에서 boardNo를 가져오기 위해 uesParams() 사용
    const boardNo = params.no;

    // const getId = window.localStorage.getItem("memberId"); // 로그인한 아이디로 가져오기

    const [boardEdit, setBoardEdit] = useState(null); 
    
    // 수정할 데이터들
    const [category, setCategory] = useState("");
    const [region, setRegion] = useState("");
    const [title, setTitle] = useState("");
    // const [image, setImage] = useState("");
    // const [previewUrl, setPreviewUrl] =useState("");
    const [contents, setContents] = useState("");

    // ** 수정 부분 ** 
    // 이미지 업로드 초기값 설정
    const [image, setImage] = useState({ // 이미지 추가부분
        image_file: null,
        image_url: null
      });
      const [previewUrl, setPreviewUrl] = useState(""); // 이미지 미리보기
      

    // 게시글 상세페이지 본문 불러오기
    useEffect(() => {
    const boardView = async () => {
        try {
            const response = await DDDApi.getBoard(boardNo);
            const data = response.data;
            setBoardEdit(data);
            setCategory(data.category);
            setRegion(data.region);
            setTitle(data.title);
            
            if (data.image && data.image.image_url) {
                setPreviewUrl(data.image.image_url); // 미리보기 추가
            }
            // setPreviewUrl(data.image.image_url); // 미리보기 추가
            
            setContents(data.contents);
            
            // 데이터 잘 연동되는지 보기
            console.log(data);
        } catch (e) {
            console.log(e);
        } 
    };

    boardView();
}, [boardNo]);

    
    const onClickUpdate = async() => {
        try {
            const updateBoard = {
                category,
                region,
                title,
                contents
                
            };

            // 이미지 파일이 null이 아닌 경우에만 업로드 로직 수행
            if (image.image_file !== null) {
                const storageRef = storage.ref();
                const fileRef = storageRef.child(image.image_file.name);


                
                 // 이미지 업로드
                await fileRef.put(image.image_file);
                const imageUrl = await fileRef.getDownloadURL();



            //      // 업로드된 이미지의 URL을 updateBoard에 추가
            //     updateBoard.image = {
            //         image_file: image.image_file.name,
            //         image_url: imageUrl
            //     };
            // }

            // 이미지가 선택된 경우 updateBoard.image를 객체로 생성
            updateBoard.image = imageUrl ? { image_file: image.image_file.name, image_url: imageUrl } : null;
            }

            


            const response = await DDDApi.editBoards(boardNo, updateBoard);

            if (response.status === 200) {
                // 성공적인 응답 처리
                if (response.data === '게시글 수정에 성공했습니다:)') {
                    navigate(`/boardList/boardView/${boardNo}`);
                } else {
                    navigate(`/boardList/boardView/${boardNo}`);
                    console.log('게시글 수정에 실패했습니다.ㅠㅠ');
                    }
                } else {
                    console.log('게시글 수정 중 오류가 발생했습니다.', response.statusText);
                    }
                } catch (error) {
                console.log("게시글 수정 중 오류가 발생했습니다." + error);
                console.log(typeof category);
                console.log(typeof region);
                console.log(typeof title);
                console.log(typeof contents);
                console.log(image);
                console.log(error.response);
                }
            };
    

    // 게시판 카테고리 선택 
    const onChangerCtg = (e) => {
        setCategory(e.target.value)
    }

    // 지역 선택 
    const onChangeregion = (e) => {
        setRegion(e.target.value)
    }

    // 게시글 제목 변경
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    // 이미지 미리보기
    const previewImage = (e) => {
        e.preventDefault();

    const fileReader = new FileReader();
    

    //   fileReader.onload = () => {
    //     setPreviewUrl(fileReader.result);
    //     setImage({
    //       image_file: e.target.files[0],
    //       previewUrl: fileReader.result,
    //     });
    //   };
    // };

    fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
        setImage(prevState => ({
          ...prevState,
          image_file: e.target.files[0],
          image_url: fileReader.result,
        }));
    };

      if (e.target.files[0]) {
        fileReader.readAsDataURL(e.target.files[0]);
      }
    };


    useEffect(() => { // 추가사항
        if (boardEdit && boardEdit.image && boardEdit.image.image_url) {
            setPreviewUrl(boardEdit.image.image_url);
        }
        }, [boardEdit]);
    



    return(
        <EditWrap>
            <Section className="section">
            <div className="board_header">
                    <div className="boardtitle">
                        <h2>자유 게시판</h2>  
                    </div>
                    <table>
                        <tbody>
                        <tr>
                            <th colSpan={4}>게시물 수정</th>
                        </tr>
                        <tr>
                            <td>
                                <select name="category" value={category} onChange={onChangerCtg}>
                                    <option value="">카테고리</option>
                                    <option value="추천수다">추천수다</option>
                                    <option value="질문하기">질문하기</option>
                                    <option value="동행찾기">동행찾기</option>
                                </select>
                            </td>

                            <td>
                                <select name="category" value={region} onChange={onChangeregion}>
                                    <option value="">지역선택</option>
                                    <option value="서울">서울</option>
                                    <option value="경기/인천">경기/인천</option>
                                    <option value="충청">충청</option>
                                    <option value="강원">강원</option>
                                    <option value="경상도">경상도</option>
                                    <option value="전라/제주">전라/제주</option>
                                </select>
                            </td>

                            <td>
                                <input className="input_title" 
                                type='text' 
                                placeholder='제목을 입력해주세요 :)' 
                                value={title}
                                onChange={onChangeTitle} 
                                name="title" 
                                maxLength={40}/>
                            </td>
                            <td>
                                <div className="imguploaderBtn">
                                    <button>
                                    <input type="file" 
                                    id="file-upload" 
                                    onChange={previewImage} 
                                    style={{display: "none"}}/>
                                    <label htmlFor="file-upload">사진 업로드</label>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table> 

                {/* 이미지 미리보기 및 업로드 */}
                <div className="addBoard-wrapper">
                    {/* {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl &&  boardEdit && boardEdit.image && (
                        <img src ={boardEdit.image.image_url} alt="Upload" />
                    )} */}


                    {boardEdit && boardEdit.image && boardEdit.image.image_url ? (
                        <img src={boardEdit.image.image_url} alt="업로드 이미지" />
                    ) : (
                        boardEdit && (
                        <img src={postimage} alt="기본 이미지" />
                        )
                    )}
                </div>

          </div>
            </Section>        
            <TextWrap>
            <CKEditor 
            editor={ClassicEditor} 
            data={contents} 
            onChange={(event, editor) => {
                const data = editor.getData();
                setContents(data);
            }}
            config={{
            placeholder: '자유롭게 작성 가능합니다.'
            }}
            />
            </TextWrap>

            <div className="btn_area">
                <button className="editbtn" onClick={onClickUpdate}>수정하기</button>
                <Link to={`/boardList`}><button className="backbtn">취소하기</button></Link>
                </div>
        </EditWrap>
    );
}
export default EditBoard;