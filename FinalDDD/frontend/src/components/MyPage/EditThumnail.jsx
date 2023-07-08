import {React, useState }from 'react';
import { thumbnail, profileImage } from './Data';
import styled from 'styled-components';
import { Tooltip } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { storage } from '../../util/FireBase';

const Container = styled.div`
    background-color: aqua;
    box-sizing: border-box;
    position: relative;
    top: 0%;
    width: 100%;
    height: 30%;
    min-height: 270px;
    max-height: 300px;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    label{
        position: absolute;
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 2rem;
        /* background-color: #d1d1d1; */
        background-color: transparent;
        border: none;
        color: #f4f2f2;
        font-size: 0.8rem;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    label:hover{
        background-color: #e5e5e5;
        color: #727272;

    }
    .Thumnail{
        background-size : 100% ;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center;
        border-top-right-radius: inherit;
        border-top-left-radius: inherit;
        justify-content: center;
        align-items: center;
        display: flex;
        img{
          width: 100%;
          height: auto;
        }


    }
    .profileIcon{
        width: 6rem;
        height: 6rem;
        border-radius: 3rem;
        /* background-color: aqua; */
        position: relative;
        top: -15%;
        left: 1.5rem;
        background-size:cover;
        background-repeat: no-repeat;
        justify-content: center;
        align-items: center;
        display: flex;
        overflow : hidden;
        img{
            width: 100%;
            height: 100%;

        }
    }

`;

const BlackBG = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: .3;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
`;


const EditThumnail = () => {

    const [image, setImage] = useState({ // 이미지 추가부분
        image_file: null,
        image_url: null
      });
      
      const [previewUrl, setPreviewUrl] = useState(""); // 이미지 미리보기
  
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
      const uploadProfileImage = async () => {
        let imageUrl = ""; // 이미지 URL 초기값
        
        if (image && image.image_file) {
          // 이미지가 선택된 경우에만 업로드 로직 수행
          const storageRef = storage.ref();
          const fileRef = storageRef.child(`profile_images/${image.image_file.name}`);
      
          try {
            // 이미지 업로드
            await fileRef.put(image.image_file);
            imageUrl = await fileRef.getDownloadURL();
            setImage({ ...image, image_url: imageUrl }); // 업로드한 이미지의 URL을 상태에 저장
          } catch (error) {
            console.log(error);
            alert("이미지 업로드 중 오류가 발생했습니다.");
            return;
          }
        }
      };
  

    return (
        <Container>
            <div className='Thumnail' >
                <BlackBG/>

                <img src={previewUrl} alt="" />
                <Tooltip title="배경이미지" arrow placement="right">
                    <label>
                        <AddPhotoAlternateIcon/>
                        <input type="file" onChange={previewImage} name="file" class="inputfile" style={{ display: 'none' }} />
                    </label>
                </Tooltip>
            </div>

            <div className='profileIcon'>
                <BlackBG/>
                <img src={profileImage[0]} alt="" />
                <Tooltip title="프로필" arrow placement="top-end">
                    <label>
                        <AddPhotoAlternateIcon/>
                        <input type="file" name="file" class="inputfile" style={{ display: 'none' }} />
                    </label>
                </Tooltip>

            </div>

        </Container>
    );
};

export default EditThumnail;