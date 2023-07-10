import {React, useState }from 'react';
import styled from 'styled-components';
import { Tooltip } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UploadIcon from '@mui/icons-material/Upload';
import { storage } from '../../util/FireBase';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Functions from '../../util/Functions';
import { MyPageApi } from '../../api/MyPageApi';
import AlertModal from "../../util/Alert";


const Container = styled.div`
    /* background-color: aqua; */
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
        width: 2.0rem;
        height: 2.0rem;
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
    .btnBox{
        /* background-color: red; */
        position: absolute;
        width: 3rem;
        height: 2rem;
        top:  6%;
        right: 0%;
    }


    }
    .profileBlock{
        position: relative;
        top: -15%;
        left: 2.5rem;
        width: 12rem;
        height: 6rem;
        /* background-color: aqua; */
        .profileIcon{
            width: 6rem;
            height: 6rem;
            border-radius: 3rem;
            /* background-color: aqua; */
            position: relative;
            top: 0%;
            left: 0%;
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
        .btnBox2{
            /* background-color: red; */
            position: absolute;
            width: 8rem;
            bottom:  0%;
            right: 0%;
            display: flex;
            flex-direction: row;
            }
        .btnBox2 label {
        background-color: #727272;
        color: #e5e5e5;
        margin-right: 0.5rem;
        }

        .btnBox2 label:hover {
            background-color: #e5e5e5;
            color: #727272;
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


const EditThumnail = ({memberData}) => {
  const memberId = Functions.getMemberId();

    // 버튼 조작
    const [btnOpen, setBtnOpen] = useState(false);
    const handleMoreBtn = () => {
        setBtnOpen(!btnOpen)}
    const [btnOpen2, setBtnOpen2] = useState(false);
    const handleMoreBtn2 = () => {
        setBtnOpen2(!btnOpen2)}

    // 상태값을 분리
    const [profileImage, setProfileImage] = useState({
        image_file: null,
        previewUrl: null,
    });
  
    const [backgroundImage, setBackgroundImage] = useState({
        image_file: null,
        previewUrl: null,
    });
  
// 프로필 이미지 미리보기
const previewProfileImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setProfileImage({
        image_file: e.target.files[0],
        previewUrl: fileReader.result,
      });
    };
  };
  
  // 배경 이미지 미리보기
  const previewBackgroundImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      setBackgroundImage({
        image_file: e.target.files[0],
        previewUrl: fileReader.result,
      });
    };
  };
  
  // 프로필 이미지 업로드
  const uploadProfileImage = async () => {
    let imageUrl = "";
    if (profileImage && profileImage.image_file) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`profile_images/${profileImage.image_file.name}`);
      try {
        await fileRef.put(profileImage.image_file);
        imageUrl = await fileRef.getDownloadURL();
        setProfileImage({ ...profileImage, image_url: imageUrl });
        
        // 백엔드에 넘겨줌
        const response = await MyPageApi.profileImage(memberId, imageUrl);
      
        if (response.status === 200) {
          console.log('프로필 이미지 업데이트 성공');
          setOpen(true);
          setTimeout(handleClose, 1000);
        } else {
          console.log('프로필 이미지 업데이트 실패');
        }

      } catch (error) {
        console.log(error);
        alert("이미지 업로드 중 오류가 발생했습니다.");
        return;
      }
    }
  };
  
  // 배경 이미지 업로드
  const uploadBackgroundImage = async () => {
    let imageUrl = "";
    if (backgroundImage && backgroundImage.image_file) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`profile_images/${backgroundImage.image_file.name}`);
      try {
        await fileRef.put(backgroundImage.image_file);
        imageUrl = await fileRef.getDownloadURL();
        setBackgroundImage({ ...backgroundImage, image_url: imageUrl });
        
        // 백엔드에 넘겨줌
        const response = await MyPageApi.backgroundImage(memberId, imageUrl);
      
        if (response.status === 200) {
          console.log('프로필 이미지 업데이트 성공');
          setOpen(true);
          setTimeout(handleClose, 1000);
        } else {
          console.log('프로필 이미지 업데이트 실패');
        }
      } catch (error) {
        console.log(error);
        alert("이미지 업로드 중 오류가 발생했습니다.");
        return;
      }
    }
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

    return (
        <>
          { memberData &&
            <Container>
              <div className='Thumnail' >
                <BlackBG/>
                <img src={ backgroundImage.previewUrl ? backgroundImage.previewUrl : memberData.backgroundImg } alt="Background" />

                <div className='btnBox'>
                  <label style={{backgroundColor:'#e5e5e5', color:'#727272'}}>
                    <MoreVertIcon onClick={handleMoreBtn}/> 
                  </label>
                  { btnOpen && (
                    <>
                    <Tooltip title="배경이미지" arrow placement="right">
                      <label style={{ marginTop: '0.5rem'}}>
                        <AddPhotoAlternateIcon/>
                        <input type="file" onChange={previewBackgroundImage} name="file" class="inputfile" style={{ display: 'none' }} />
                      </label>
                    </Tooltip>
                    <Tooltip title="저장" arrow placement="right">
                      <label style={{ marginTop: '0.5rem'}}>
                        <UploadIcon onClick={uploadBackgroundImage}/>
                      </label>
                    </Tooltip>
                    </>
                  )}
                </div>
              </div>
              <div className="profileBlock">
                <div className='profileIcon'>
                  <BlackBG/>
                <img src={ profileImage.previewUrl ? profileImage.previewUrl : memberData.profileImg } alt="Profile" />

                </div>
                <div className='btnBox2'>
                  <label>
                    <MoreHorizIcon onClick={handleMoreBtn2}/> 
                  </label>
                  { btnOpen2 && (
                    <>
                    <Tooltip title="프로필사진" arrow placement="top">
                      <label >
                        <AddPhotoAlternateIcon/>
                        <input type="file" onChange={previewProfileImage} name="file" class="inputfile" style={{ display: 'none' }} />
                      </label>
                    </Tooltip>
                    <Tooltip title="저장" arrow placement="top">
                      <label>
                        <UploadIcon onClick={uploadProfileImage}/>
                      </label>
                    </Tooltip>
                    {open && <AlertModal />}
                    </>
                  )}
                </div>
              </div>
            </Container>
          }
        </>
      );
    };

export default EditThumnail;