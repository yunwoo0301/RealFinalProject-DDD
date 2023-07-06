import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import { useState, useEffect } from 'react';


const TextWrap = styled.div`
  width: 95%;
  margin: 0 auto;

  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
    min-height: 500px; // 텍스트 높이 조절
  }

  .ck-editor__main {padding: 0;}

`;


const TextField = () => {

  const [contents, setContents] = useState("");

  useEffect(() => {
    console.log("내용:", contents);
  }, [contents]);


  return (
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
  );
};

export default TextField;