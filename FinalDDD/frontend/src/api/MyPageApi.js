import axios from "axios";
import Functions from "../util/Functions";
//const HEADER = { "Content-type": "application/json" };



//const updateProfileField = async (memberId, fieldName, fieldValue) => {
//    try {
//      Functions.setAuthorizationHeader(); // 헤더에 토큰을 넣는 함수
//      return await axios.post(`/api/mypage/${memberId}/${fieldName}`, {
//        id: memberId,
//        ...fieldValue
//      });
//    } catch (error) {
//        console.log("Error: ", error);
//        throw error;
//    }
//  };

  const updateProfileField = async (memberId, fieldName, fieldValue) => {
      try {
        Functions.setAuthorizationHeader(); // 헤더에 토큰을 넣는 함수
        return await axios.post(`/api/mypage/${memberId}/${fieldName}`, {
          id: memberId,
          ...fieldValue
        });
      } catch (error) {
        await Functions.handleApiError(error);  // api 에러 401을 받으면 로컬에 저장된 리프레쉬 토큰을 보내 액세스 토큰을 재발급 받는 axios 요청을 보내는 함수(await 필수)

        if (error.response && error.response.status === 401) {
          // 다시 시도하기 전에 헤더를 설정합니다.
          Functions.setAuthorizationHeader();
          return await axios.post(`/api/mypage/${memberId}/${fieldName}`, {
            id: memberId,
            ...fieldValue
          });
        }
      }
  };


const MyPageApi = {

    // 회원 정보 가져오기 
    info: async (memberId) => {
        try {
        Functions.setAuthorizationHeader(); // 헤더에 토큰을 넣는 함수
        return await axios.get(`/api/mypage/${memberId}`); // 요청 리턴
        } catch (error) {
        console.log("error입니다. ");
        }
    },

    // 정보 변경 닉네임 중복 체크
    nicknamedup: async (memberId, inputNick) => {
        const nicknamedupCheck = {
        nickname: inputNick,
        }
        return await axios.post( `/mypage/${memberId}/nicknamedup`, nicknamedupCheck);
    },

    // 닉네임 변경
    nickname: (memberId, inputNick) => updateProfileField(memberId, 'nickname', {nickname : inputNick}),

    // 이름 변경
    name: (memberId, inputName) => updateProfileField(memberId, 'name', {name : inputName}),

    // 연락처 변경
    tel: (memberId, inputTel) => updateProfileField(memberId, 'tel', { tel : inputTel}),

    // 인스타그램 변경
    instagram: (memberId, inputInst) => updateProfileField(memberId, 'instagram', { instagram : inputInst}),

    // 소개글 변경
    introduce: (memberId, inputIntro) => updateProfileField(memberId, 'introduce', {introduce : inputIntro}),

    // 회원 탈퇴
    delete: (memberId, inputEmail, inputPwd) => updateProfileField(memberId, 'delete', {email: inputEmail, password: inputPwd} ),

    // 비밀번호 변경
    password : (memberId, inputCurrentPwd, inputNewPwd ) => updateProfileField(
        memberId, 'password', {password: inputCurrentPwd, newPassword: inputNewPwd}), 

    // 프로필 이미지 변경
    profileImage : (memberId, imageUrl) => updateProfileField(
        memberId, 'profileImg', {profileImg: imageUrl}), 

    // 배경화면 이미지 변경
    backgroundImage : (memberId, imageUrl) => updateProfileField(
        memberId, 'backgroundImg', {backgroundImg: imageUrl}), 

};

const DiaryApi = {

    info: async (memberId) => {
        try {
        Functions.setAuthorizationHeader(); // 헤더에 토큰을 넣는 함수
        return await axios.get(`/api/mypage/${memberId}/diary`); // 요청 리턴
        } catch (error) {
        console.log("error입니다. ");
        }
    },


    save : async(memberId, exhibitNo, ratingStarValue, inputComment) => {
        ratingStarValue = parseFloat(ratingStarValue);

        try{
            console.log('api 호출 시작')
            const diaryCheck = {
                memberId : memberId,
                exhibitionNo : exhibitNo,
                comment : inputComment,
                rateStar : ratingStarValue
            }
            console.log('API 통신 부분 멤버아이디 ' + exhibitNo)
            console.log('API 통신 부분 전시아이디 ' + exhibitNo)
            console.log('API 통신 부분 커멘트 ' + inputComment)
            console.log('API 통신 부분 별 ' + ratingStarValue)
            return await axios.post(`/api/mypage/${memberId}/diary/${exhibitNo}`, diaryCheck)

        } catch (error) {
            console.log("error입니다. ");
            
        }
    }, 

    delete : async(memberId, exhibitNo) => {
        try{
            const deleteCheck = {
                memberId : memberId,
                exhibitionNo : exhibitNo,
            }
            return await axios.post(`/api/mypage/${memberId}/diary/${exhibitNo}/delete`, deleteCheck)

        } catch (error) {
            console.log("error입니다. ");
            
        }
    },
}

export {MyPageApi, DiaryApi};
