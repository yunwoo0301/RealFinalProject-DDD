import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DDDApi from '../api/DDDApi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { storage } from '../util/FireBase';
import ConfirmModal from "../util/ConfirmModal";
import { FcEditImage } from "react-icons/fc";
import { Backdrop } from "@mui/material";
import Header from "../components/header/Header";


const EditWrap = styled.div`
    width: 82vw;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;

    .btn_area {
        text-align: center;
        margin-bottom: 1em;

        .editbtn { // 수정 버튼 속성
            margin-top: 1em;
            padding: 10px 1.6em;
            border-radius: 15px;
            border: none;
            color: white;
            background-color: #050E3D;
            transition: all .1s ease-in;
            font-weight: 600;
            font-size: .9em;
            cursor: pointer;

            &:hover {background-color: #5EADF7;
                color: #F4F8FF;}
        }
            .backbtn { // 취소버튼 속성
                margin-top: 1em;
                padding: 10px 1.6em;
                border-radius: 15px;
                border: none;
                color: white;
                background-color: #050E3D;
                transition: all .1s ease-in;
                font-weight: 600;
                font-size: .9em;
                cursor: pointer;

                &:hover {background-color: #FA6060;
                    color: #F4F8FF;}

            }
            button:nth-child(1) {
                margin-right: 16px;
            }
    }

    @media (max-width: 768px) {
      width: 100vw;
    }
`;

const Section = styled.div`
    justify-content: center;
    position: relative;
    display: flex;
    flex-direction: column;

    .boardtitle {
            font-size: 2em;
            margin-bottom: 1em;
            font-weight: bold;
            text-align: center;
        }

    table {
        width: 75vw;
        margin: 0 auto;
        border-collapse: collapse;
        background-color: #4555AE;
        border-bottom: solid 1px #4555AE;
        text-align: center;

        @media (max-width: 768px) {
         width: 100vw;
      }

        tr:nth-child(2n) td {background-color: #f9f9f9;}
        th {padding: 10px; color: white;}
        td {padding: 10px; background-color: white; border-left: solid 1px #bbb; border-top: solid 1px #ddd;}

        td:first-child {border-left: none; width: 10%;

            select { // 게시판 카테고리 셀렉박스
                text-align:center;
                background: none;
                border: none;
                outline: none;
                font-size: 1rem;
                font-weight: 600;
            }
        }

        td:nth-child(2) {width: 10%; text-align: center;

            select{ // 지역선택 카테고리 셀렉박스
                text-align:center;
                background: none;
                border: none;
                outline: none;
                font-size: 1rem;
                font-weight: 600;
            }
        }

        td:nth-child(3) {width: 70%; text-align: left; padding-left: 20px;}

        td:nth-child(4) {text-align: center;}

    }

    .input_title {
        font-size: 1.1rem;
        width: 100%;
        outline: none;
        display: block;
        margin-bottom: 30px;
        margin: 0 auto;
        border: none;
        background: none;

        &:focus {border: none; background:none;}
    }

    .imguploaderBtn { // 업로드 버튼

        button {
            font-size: .9rem;
            cursor: pointer;
            border-radius: 1em;
            border: none;
            color: white;
            background-color: #050E3D;
            transition: all .1s ease-in;
            font-weight: bold;
            padding: .5em .8em;

            &:hover {background-color: #5EADF7; color: #F4F8FF;}

            @media (max-width: 768px) {
                background-color: transparent;
                color: #050E3D;
                width: 2rem;
                margin: 0;
                padding: 0;
        }

            }
        }


    // 업로드 이미지 영역
    .addBoard-wrapper{
            margin-top: 1rem;
            display: flex;
            flex-direction: column-reverse; // 업로드된 이미지 아래로 향하게 설정
            align-items: center;
            justify-content: flex-start;
            width: 100%;
    }

    .imgcontainer {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 40%;
        height: 40%;
    }

    @media (max-width: 768px) {
        width: 100vw;
    }

`;


const TextWrap = styled.div`
    width: 75vw;
    margin: 0 auto;
    margin-bottom:20px;
    justify-content: center;
    align-items: center;
    margin-top: 1em;

  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 500px;} // 텍스트 높이 조절

  .ck-editor__main {padding: 0;}

  @media (max-width: 768px) {
    width: 100%;
  }

`;

const ModalBodyStyle = styled.div`
    .success{
        font-size: 0.8rem;
        font-weight: bold;
        color: #2B5EC2;
        line-height: 1.2;
    }
`;





const EditBoard = () => {
    const navigate = useNavigate();
    const params = useParams();  // url에서 boardNo를 가져오기 위해 uesParams() 사용
    const boardNo = params.no;

    // 수정할 데이터들
    const [boardEdit, setBoardEdit] = useState("");
    const [category, setCategory] = useState("");
    const [region, setRegion] = useState("");
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [previewUrl, setPreviewUrl] = useState(""); // 이미지 미리보기
    const [originImg, setOriginImg] = useState(null);


    // DB상 카테고리 값이 영어 이므로 한글로 반환하기 위한 매핑 작업
    const categoryMapping = {
        "Recommend": "추천수다",
        "Question": "질문하기",
        "DDDmate": "동행찾기"
    };

    // 게시글 상세페이지 본문 불러오기(조회)
    useEffect(() => {
        const boardView = async () => {
            try {
                const response = await DDDApi.getBoard(boardNo);
                setBoardEdit(response.data);
                setCategory(response.data.category);
                setRegion(response.data.region);
                setTitle(response.data.title);
                // setPreviewUrl(response.data.imageUrl);
                setContents(response.data.contents);
            if (response.data.imageUrl) {
                setOriginImg(response.data.imageUrl); // 이미지 변경 안할 시 기존 연동된 이미지 유지 **
                if(response.data.imageUrl.includes(",")) {
                    setPreviewUrl(response.data.imageUrl.split(","));
                } else {
                setPreviewUrl(response.data.imageUrl);
            }
        }

        } catch (e) {
            console.log(e);
        }
    };

    boardView();
}, [boardNo]);



    // 이미지 미리보기 용 상태 변수
    const [image, setImage] = useState(null);

    const previewImage = (e) => {
        e.preventDefault();
        const fileReader = new FileReader();
        if (e.target.files && e.target.files.length > 0) { // 이미지를 선택하지 않았을 때
                fileReader.readAsDataURL(e.target.files[0]);
                fileReader.onload = () => {
                    setPreviewUrl(fileReader.result);
                    setImage({
                      image_file: e.target.files[0],
                      previewUrl: fileReader.result
                    });
                };
            }
        };

    // 조회된 상태에서 수정 후 값 저장
    const onClickUpdate = async () => {
        if (title === boardEdit.title && contents === boardEdit.contents) { //제목 or 내용 무조건 수정하도록 조건식 적용
          alert("제목 또는 내용을 수정해 주세요.");
        } else {
          let imageUrl = previewUrl;
          if (image && image.image_file) {
            const storageRef = storage.ref();
            const fileRef = storageRef.child(image.image_file.name);
            try {
              await fileRef.put(image.image_file);
              let url = await fileRef.getDownloadURL();
              if (!url) {
                url = previewUrl;
              }
              imageUrl = url;
            } catch (error) {
            }
          }

          try {
            const response = await DDDApi.editBoards(boardNo, category, region, title, contents, imageUrl);

            if (response.status === 200) {
              if (response.data) {
                setShowModal(true);
              } else {
                alert("게시글 수정에 실패했습니다.ㅠㅠ");
              }
            }
          } catch (error) {
            console.log("게시글 수정 중 오류가 발생했습니다." + error);
          }
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

    // 수정 취소하기(뒤로가기)
    const onClickBack = () => {
        navigate(-1);
    }

    const editConfirmClick = () => {
        setShowModal(false);
        navigate(`/boardList/boardView/${boardNo}`)
    }

    // 게시글 수정용 모달 & 함수
    const [showModal, setShowModal] = useState(false);

    const editProps  ={
        title: "게시글 수정",
        body: (
        <ModalBodyStyle>
            작성하신 게시글로 수정하시겠습니까?  <br />
            <div className="success">
                최종 작성하신 내용으로 등록됩니다. <br/>
            </div>
        </ModalBodyStyle>
        ),
        button: [
        <button style = {{ backgroundColor : '#2B5EC2' }} onClick={editConfirmClick}>확인</button>,
        <button style = {{ backgroundColor : '#2B5EC2' }} onClick={()=> setShowModal(false)}>취소</button>
        ],
        icon: <FcEditImage/>
        }



    return (
        <>
        <Header/>
        <EditWrap>
            <Section className="section">
            <div className="board_header">
                <div className="boardtitle">자유 게시판</div>
                <table>
                    <tbody>
                    <tr>
                        <th colSpan={4}>게시물 수정</th>
                    </tr>
                    <tr>
                        <td>
                            <select name="category" value={categoryMapping[category] || category} onChange={onChangerCtg}>
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
                                <option value="경기">경기</option>
                                <option value="인천">인천</option>
                                <option value="충청">충청</option>
                                <option value="강원">강원</option>
                                <option value="전북">전북</option>
                                <option value="전남">전남</option>
                                <option value="광주">광주</option>
                                <option value="경북">경북</option>
                                <option value="경남">경남</option>
                                <option value="부산">부산</option>
                                <option value="제주">제주</option>
                            </select>
                        </td>

                        <td>
                            <input
                            className="input_title"
                            type="text"
                            placeholder="제목을 입력해주세요 :)"
                            value={title}
                            onChange={onChangeTitle}
                            name="title"
                            maxLength={40}/>
                        </td>

                        <td>
                            <div className="imguploaderBtn">
                                {window.innerWidth > 768 ? (<button>
                                <input type="file" id="file-upload" onChange={previewImage} style={{ display: "none" }}/>
                                <label htmlFor="file-upload">사진 업로드</label>
                                </button>) : (<button>
                                    <input type="file" id="file-upload" onChange={previewImage} style={{ display: "none" }}/>
                                    <label htmlFor="file-upload">사진</label>
                                </button>)}
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>

                {/* 이미지 미리보기 및 업로드 */}
                <div className="addBoard-wrapper">
                    {previewUrl && !image?.previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && boardEdit && boardEdit.image && (
                    <img src={boardEdit.image} alt="Upload" />
                )}
                    {image?.previewUrl && <img src={image.previewUrl} alt="Uploaded" />}
                </div>
            </div>
            </Section>
            <TextWrap>
                <CKEditor
                    editor={ClassicEditor}
                    data={contents}
                    onChange={(event, editor) => {
                    const data = editor.getData();
                    setContents(data);}}
                    config={{placeholder: '자유롭게 작성 가능합니다.'}}/>
            </TextWrap>

            <div className="btn_area">
                <button className="editbtn" onClick={onClickUpdate}>수정하기</button>
                <button className="backbtn" onClick={onClickBack}>취소하기</button>
            </div>
        </EditWrap>

        <Backdrop
            sx={{
                backgroundColor: 'rgb(0,0,0,0.5)', // 배경색을 투명
                opacity:'0.5',
                color: 'black',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                top: 0, // 팝업을 상단에 위치
            }}
            open={showModal}
            onClick={()=>{setShowModal(false) }}
            >
            {showModal && <ConfirmModal props={editProps}/>}
        </Backdrop>
        </>
    )
};

export default EditBoard;
