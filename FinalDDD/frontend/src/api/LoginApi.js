import axios from "axios";
import { getToken } from "../store"; // token값 받아오기
//const HEADER = {"Content-type" : "application/json"}


const LoginApi = {
    login : async(email, password) => {



        const loginCheck = {
            email : email,
            password : password
        };
        return await axios.post( "/login", loginCheck); // config 부분 같이 날리기
    },

    // login : async(email, password) => {

    //     const loginCheck = {
    //         email : email,
    //         password : password
    //     };
    //     return await axios.post(DDD_DOMAIN + "/login", loginCheck, HEADER);
    // },
    
    signup : async(inputEmail, inputPwd, inputNick, inputName, inputTel, inputIns) => {
        const signupCheck = {
            email: inputEmail,
            password: inputPwd, 
            nickname: inputNick, 
            name: inputName, 
            tel: inputTel, 
            instagram: inputIns
        }
        
        return await axios.post( "/login/signup", signupCheck);
    },
    
    emaildup :async(inputEmail) => {
        const emaildupCheck = {
            email: inputEmail
        }
        return await axios.post("/login/emaildup", emaildupCheck);
    },

    nicknamedup :async(inputNick) => {
        const nicknamedupCheck = {
            nickname: inputNick, 
        }
        return await axios.post( "/login/nicknamedup", nicknamedupCheck);
    },

    // 멤버 전체조회
    getAllMembers: async() => {
        return await axios.get("/login/allMembers");
    }



    


};

export default LoginApi;

    