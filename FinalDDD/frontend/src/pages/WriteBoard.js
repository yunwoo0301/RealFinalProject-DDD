import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from "styled-components";
import { useState, useEffect } from "react";
import { storage } from "../util/FireBase";
import { useNavigate } from 'react-router-dom';
import DDDApi from '../api/DDDApi';
import ConfirmModal from "../util/ConfirmModal";
import { Backdrop } from "@mui/material";
import { FcCloseUpMode } from 'react-icons/fc';

const Wrap = styled.div`
    width: 82vw;
    height: 100%;
    margin: 0 auto;
    align-items: center;
    justify-content: center;

    .btn_area {
        text-align: center;

        .savebtn { // 등록 버튼 속성
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
            .cancelbtn { // 취소버튼 속성
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


    /* div { // 헤더 및 카테고리 박스
        width: 100%;
        border: 1px solid red;
    } */

    .board_header { // 게시물 작성 영역
        h2 {
            font-size: 1.8em;
            margin-top: 30px;
            font-weight: 900;
            text-align: center;
        }
    }

    table {
      width: 80vw;
      margin: 0 auto;
      border-collapse: collapse;
      background-color: #4555AE;
      border-bottom: solid 1px #4555AE;
      text-align: center;


      @media (max-width: 768px) {
        width: 100vw;
      }


        tr:nth-child(2n) td {background-color: #f9f9f9;} // 타이틀 박스 배경색 설정
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

        td:nth-child(3) {width: 70%; text-align: left; padding-left: 20px;} // 제목 카테고리


        td:nth-child(4) {text-align: center;}

  }


    .input_title {
        font-size: 1.3rem;
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
        transition: all .1s ease-in;  // 마우스 호버시 효과 전환 속도
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
        width: 40%; /* 이미지의 최대 가로 너비를 설정 */
        height: 40%; /* 이미지의 최대 세로 높이를 설정 */
    }

    @media (max-width: 768px) {
      width: 100vw;
    }
`;

const TextWrap = styled.div`
  width: 80vw;
  margin: 0 auto;
  margin-bottom:20px;
  justify-content: center;
  align-items: center;
  margin-top: 1em;


    .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
      min-height: 500px;} // 텍스트 높이 조절
    .ck-editor__main {padding: 0px;}

    @media (max-width: 768px) {
      width: 100%;
    }


`;

const ModalBodyStyle = styled.div`
  .success{
    font-size: 1rem;
    line-height: 1;
  }
`;



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

      // 이미지 업로드 함수
    const onClickSave = async () => {
      if (title.length === 0 || category.length === 0 || contents === 0) {
        alert("제목, 카테고리, 내용을 모두 입력해 주세요.");
        return;
      }

      let imageUrl = "/default-profile.png"; // 이미지 URL 초기값

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

      if (linkNo === true) {
        // alert("문의글 작성이 완료되었습니다.");
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
      alert("문의글 작성 중 오류가 발생했습니다.");
    }

  };

    // 확인 버튼 클릭 시 게시판 메인으로 이동
    const handleConfirmClick = () => {
      setShowModal(false);
      navigate('/boardList');
    }

    // 작성 취소하기(뒤로가기)
    const onClickBack = () => {
      navigate(-1);
    }


    const buttonStlye = {
      backgroundColor:'#2B5EC2',
      marginTop:'1rem',
    }


    // 작성하기 모달 변수
    const [showModal, setShowModal] = useState(false);

    const writeProps  ={
        title: "게시글 작성완료",
        body: (
        <ModalBodyStyle>
          <div className='success'>
            등록이 완료되었습니다.
          </div>
        </ModalBodyStyle>
        ),
        button: [
        <button style = {buttonStlye} onClick={handleConfirmClick}>확인</button>
        ],
        icon: <FcCloseUpMode/>
      }


    return (
      <>
      <Wrap>
        <Section className="section">
          <div className="board_header">
            <div className="boardtitle">
              <h2>자유 게시판</h2>
            </div>
              <table>
                <tbody>
                <tr>
                  <th colSpan={4}>게시물 작성</th>
                </tr>
                <tr>
                  <td>
                    <select name="category" onChange={onChangerCtg}>
                      <option value={category} selected>카테고리</option>
                      <option value="Recommend">추천수다</option>
                      <option value="Question">질문하기</option>
                      <option value="DDDmate">동행찾기</option>
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
                      {window.innerWidth > 768 ? (<button>
                        <input type="file" id="file-upload" onChange={previewImage} style={{ display: "none" }}/>
                        <label htmlFor="file-upload">사진 업로드</label>
                      </button>) : (<button>
                        <input type="file" id="file-upload" onChange={previewImage} style={{ display: "none" }}/>
                        <label htmlFor="file-upload">사진</label>
                      </button>)}
                      {/* <button>
                        <input type="file" id="file-upload" onChange={previewImage} style={{ display: "none" }}/>
                        <label htmlFor="file-upload">사진 업로드</label>
                      </button> */}
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
            setContents(data);}}
            config={{placeholder: '자유롭게 작성 가능합니다.'}}/>
        </TextWrap>
        <div className="btn_area">
            <button className="savebtn" onClick={onClickSave}>등록하기</button>
            <button className="cancelbtn" onClick={onClickBack}>취소하기</button>
        </div>
      </Wrap>

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
        {showModal && <ConfirmModal props={writeProps} minWidth='300px' minHeight="250px"/>}
      </Backdrop>
      </>
  )
};

export default WriteBoard;