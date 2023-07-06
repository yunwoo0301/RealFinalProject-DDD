import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from "styled-components";
import { useState, useEffect } from "react";
import { storage } from "../util/FireBase";
import { Link, useNavigate } from 'react-router-dom';
import DDDApi from '../api/DDDApi';


const Wrap = styled.div`
    width: 75em;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;

    .btn_area {
        text-align: right;
        margin-right: .9em;
 
        .savebtn { // 등록 버튼 속성
                /* display :inline-block; */
                cursor: pointer;
                margin-top: 1em;
                padding: 10px 1.6em;
                border-radius: 15px;
                border: none;
                color: white;
                background-color: #050E3D;
                transition: all .1s ease-in;
                font-weight: 600;
                font-size: 14px;
        
                
                &:hover {background-color: #5EADF7;
                    color: #F4F8FF;}
            }
            .cancelbtn { // 취소버튼 속성
                cursor: pointer;
                margin-top: 1em;
                padding: 10px 1.6em;
                border-radius: 15px;
                border: none;
                color: white;
                background-color: #050E3D;
                transition: all .1s ease-in;
                font-weight: 600;
                font-size: 14px;

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
                /* font-size: 14px;
                cursor: pointer;
                border-radius: 10px;
                border: none;
                color: white;
                background-color: #050E3D;
                transition: all .1s ease-in;
                font-weight: bold;
                float: left;
                padding: .5em 1.3em; */
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
    min-height: 500px;} // 텍스트 높이 조절
  .ck-editor__main {padding: 0px;}
`;

// const WriteWrap = styled.div`
//   width: 1200px;
//     height: 100%;
//     margin: 0 auto;
//     align-items: center;
//     justify-content: center;

// `;


const WriteBoard = () => {
    const isLogin = window.localStorage.getItem("isLogin");
    const getId = localStorage.getItem("memberId") 
    console.log("getId:", getId);
    console.log(isLogin);

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [region, setRegion] = useState(null);
    
     
    // 이미지 업로드 초기값 설정
    const [image, setImage] = useState({ // 이미지 추가부분
      image_file: null,
      image_url: null
    });
    const [previewUrl, setPreviewUrl] = useState(""); // 이미지 미리보기
    const [contents, setContents] = useState("");


      useEffect(() => {
        console.log("입력값:", {
          category: category,
          region: region,
          title: title,
          contents: contents  
        });
      }, [category, region, title, contents]);


  
    // 게시판 카테고리 선택
    const onChangerCtg = (e) => {
      setCategory(e.target.value);
    };
  
    // 지역 선택
    const onChangerRegion = (e) => {
      setRegion(e.target.value);
    };
  
    // 게시글 제목 변경
    const onChangeTitle = (e) => {
      setTitle(e.target.value);
    };
  
    // 이미지 미리보기
    const previewImage = (e) => {
      e.preventDefault();
  
      const fileReader = new FileReader();
      if (e.target.files[0]) {
        fileReader.readAsDataURL(e.target.files[0]);
      }
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
        setImage({
          image_file: e.target.files[0],
          previewUrl: fileReader.result,
        });
      };
    };

    /* 이미지 업로드 1차 작업 건 */
    // const handleUploadClick = () => {
      
    //     const storageRef = storage.ref();
    //     const fileRef = storageRef.child(image.image_file.name);
    //     fileRef.put(image.image_file).then(() => {
    //       console.log('File uploaded successfully!');
    //       fileRef.getDownloadURL().then((url) => {
    //         console.log("저장경로 확인 : " + url);
    //         setImage(prevState => ({ ...prevState, image_url: url }));
    //       });
    //     });
    //   };


    // 이미지 업로드 함수
  const onClickSave = async () => {
    if (title.length === 0 || category.length === 0 || contents === 0) {
      alert("제목, 카테고리, 내용을 모두 입력해 주세요.");
      return;
    }
    
    let imageUrl = ""; // 이미지 URL 초기값
    
    if (image && image.image_file) {
      // 이미지가 선택된 경우에만 업로드 로직 수행
      const storageRef = storage.ref();
      const fileRef = storageRef.child(image.image_file.name);
  
      try {
        // 이미지 업로드
        await fileRef.put(image.image_file);
        imageUrl = await fileRef.getDownloadURL();
      } catch (error) {
        console.log(error);
        alert("이미지 업로드 중 오류가 발생했습니다.");
        return;
      }
    }
  
    try {
      const resultNo = await DDDApi.boardWrite(
        getId,
        category,
        region,
        title,
        imageUrl,
        contents
      );
      
      const linkNo = resultNo.data;
      console.log("Result Number:", linkNo);
      
      if (linkNo) {
        alert("문의글 작성이 완료되었습니다.");
        navigate('/boardList');
      }
    } catch (error) {
      console.log(error);
      alert("문의글 작성 중 오류가 발생했습니다.");
    }
  };
  

    return (
      <Wrap>
        <Section className="section">
          <div className="board_header">
            <div className="boardtitle">
              <h2>자유 게시판</h2>
            </div>
              <table>
                <tbody>
                <tr>
                  <th colSpan={3}>게시물 작성</th>
                </tr>
                <tr>
                  <td>
                    <select name="category" onChange={onChangerCtg}>
                      <option value={category} selected>
                        카테고리
                      </option>
                      <option value="추천수다">추천수다</option>
                      <option value="질문하기">질문하기</option>
                      <option value="동행찾기">동행찾기</option>
                    </select>
                  </td>

                  <td>
                    <select name="category" onChange={onChangerRegion}>
                      <option value={region} selected>지역선택</option>
                      <option value="서울">서울</option>
                      <option value="경기">경기</option>
                      <option value="인천">인천</option>
                      <option value="충청">충청</option>
                      <option value="강원">강원</option>
                      <option value="경상도">경상도</option>
                      <option value="전라도">전라도</option>
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
                      <button>
                        <input
                          type="file"
                          id="file-upload"
                          onChange={previewImage}
                          style={{ display: "none" }}/>
                        <label htmlFor="file-upload">사진 업로드</label>
                      </button>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>

              {/* 이미지 미리보기 및 업로드 */}
              <div className="addBoard-wrapper">
                {previewUrl && <img src={previewUrl} alt="Preview" />}
                {image.image_url && <img src={image.image_url} alt="Uploaded" />} 
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
            <button className="savebtn" onClick={onClickSave}>등록하기</button>
            <Link to='/boardList'>
                <button className="cancelbtn">취소하기</button>
            </Link>
        </div>
      </Wrap>
  );
};

export default WriteBoard;