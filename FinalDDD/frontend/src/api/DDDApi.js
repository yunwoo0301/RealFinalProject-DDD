import axios from "axios";
import Functions from "../util/Functions";

const DDDApi = {
    // 자유게시판 카테고리별 리스트 조회 
    getFreeBoardsByCategory : async (category) => {
        try{
            Functions.setAuthorizationHeader(); // 헤더에 토큰을 넣는 함수
        return await axios.get(`/api/boardList/${category}`);

         } catch(error){
        console.error(error)
        await Functions.handleApiError(error);  // api 에러 401을 받으면 로컬에 저장된 리프레쉬 토큰을 보내 액세스 토큰을 재발급 받는 axios 요청을 보내는 함수(await 필수)
        return await axios.get(`/api/boardList/${category}`);
    }},

    // 특정 게시판 번호의 게시물 상세 조회(+댓글 포함)
    getBoard: async(boardNo) => {
        try{
            Functions.setAuthorizationHeader();
            return await axios.get(`/api/boardList/boardView/${boardNo}`);
        }catch(error){
            console.error(error)
            await Functions.handleApiError(error);  
            return await axios.get(`/api/boardList/boardView/${boardNo}`);
        }

        
    },

    // 조회수 증가 API 추가 **
    increaseViewCount : async (boardNo) => {
        try{
            Functions.setAuthorizationHeader();
            return await axios.put(`/api/boardList/boardView/${boardNo}/views`);

        }catch(error){
            console.error(error)
            await Functions.handleApiError(error);  
            return await axios.put(`/api/boardList/boardView/${boardNo}/views`);
        }
    },


    // 게시글 작성
    boardWrite: async (getId, category, region, title, imageUrl, contents ) => {
        // console.log("getId : "+ getId, "category : " + category, "region: " + region, "title: " + title, "image: " + imageUrl, "contents: " + contents )
        try{
            const postObj = {
                id: getId,
                category: category,
                region: region,
                title: title,
                image: imageUrl,
                contents: contents
            };
            Functions.setAuthorizationHeader();
            return await axios.post( "/api/boardList/write", postObj);

        }catch(error){
            const postObj = {
                id: getId,
                category: category,
                region: region,
                title: title,
                image: imageUrl,
                contents: contents
            };
            console.error(error)
            await Functions.handleApiError(error);  
            return await axios.post( "/api/boardList/write", postObj);
        }
    },

    // 이전글 & 다음 게시글 조회 (최종)
    getPrevAndNextBoard: async (currentBoardNo) => {
        try {
            Functions.setAuthorizationHeader();
            const response = await axios.get(`/api/boardList/${currentBoardNo}/navigate`);
            console.log(response.data);
            return response;
        } catch (error) {
            console.error(error);
            await Functions.handleApiError(error);
            return await axios.get(`/api/boardList/${currentBoardNo}/navigate`);
        }
    },

// 게시글 수정 **
editBoards: async (boardNo, category, region, title, contents, imageUrl) => {
    try {
        Functions.setAuthorizationHeader();
        const editObj = {
            boardNo: boardNo,
            category: category,
            region: region,
            title: title,
            contents: contents,
            image: imageUrl
        };
        return await axios.post(`/api/boardList/boardView/${boardNo}`, editObj);
    } catch(error) {
        console.error(error);
        const editObj = {
            boardNo: boardNo,
            category: category,
            region: region,
            title: title,
            contents: contents,
            image: imageUrl
        };
        await Functions.handleApiError(error);
        return await axios.post(`/api/boardList/boardView/${boardNo}`, editObj);
    }
},

// 게시글 삭제
delBoards: async (boardNo) => {
    try {
        Functions.setAuthorizationHeader();
        return await axios.delete(`/api/boardList/boardView/${boardNo}`);
    } catch(error) {
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.delete(`/api/boardList/boardView/${boardNo}`);
    }
},

// 마이페이지 내 게시글 조회
getBoardsByMember: async (memberId) => {
    try {
        Functions.setAuthorizationHeader();
        return await axios.get(`/api/boardList/members/${memberId}/boards`);
    } catch(error) {
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.get(`/api/boardList/members/${memberId}/boards`);
    }
},

// 마이페이지 내 댓글 조회
commentLoad: async (memberId) => {
    try {
        Functions.setAuthorizationHeader();
        return await axios.get(`/api/comments/members/${memberId}/comments`);
    } catch(error) {
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.get(`/api/comments/members/${memberId}/comments`);
    }
},

// 자유게시판 검색 목록 출력(최종)
searchListLoad: async (keyword) => {
    try {
        Functions.setAuthorizationHeader();
        return await axios.get(`/api/boardList/searchList?keyword=${keyword}`);
    } catch(error) {
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.get(`/api/boardList/searchList?keyword=${keyword}`);
    }
},

// 댓글 작성
commentWrite: async (comment, getId, boardNo) => {
    try {
        Functions.setAuthorizationHeader();
        const commentObj = {
            comment: comment,
            getId: getId,
            boardNo: boardNo
        }
        return await axios.post( "/api/comments/commentWrite", commentObj);
    } catch(error) {
        const commentObj = {
            comment: comment,
            getId: getId,
            boardNo: boardNo
        }
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.post( "/api/comments/commentWrite", commentObj);
    }
},

// 댓글 삭제 
commentDelete : async (commentNo) => {
    try {
        Functions.setAuthorizationHeader();
        return await axios.delete(`/api/comments/commentDelete/${commentNo}`);
    } catch(error) {
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.delete(`/api/comments/commentDelete/${commentNo}`);
    }
},


    
// 전시 리스트 출력
exhibitionList : async() => {
    try{
        Functions.setAuthorizationHeader();
        return await axios.get("/exhibitions/dbList");
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.get("/exhibitions/dbList");
    }
},

// 전시 상세정보
exhibitDetail : async(exhibitNo) => {
    try{
        Functions.setAuthorizationHeader();
        return await axios.get(`/exhibitions/${exhibitNo}`);
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.get(`/exhibitions/${exhibitNo}`);
    }
},

// 예매정보저장
bookTicket: async(getId, exhibitNo, kstDate,
    bookedName, bookedContact, bookedEmail, deliveryMethod) => {
    try{
        Functions.setAuthorizationHeader();
        const booking = {
            id: getId,
            exhibitNo: exhibitNo,
            visitDate: kstDate,
            bookedName: bookedName,
            bookedEmail: bookedEmail,
            bookedTel: bookedContact,
            getTicket: deliveryMethod
        };
        return await axios.post("/booking/newTicket", booking);
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        const booking = {
            id: getId,
            exhibitNo: exhibitNo,
            visitDate: kstDate,
            bookedName: bookedName,
            bookedEmail: bookedEmail,
            bookedTel: bookedContact,
            getTicket: deliveryMethod
        };
        return await axios.post("/booking/newTicket", booking);
    }
},

// 결제정보저장(무통장)
bankingPayment: async(getId, bookingId, totalPrice, ticketCnt) => {
    try{
        Functions.setAuthorizationHeader();
        return await axios.post(`/pay/banking?id=${getId}&bookingId=${bookingId}&paidPrice=${totalPrice}&paymentCnt=${ticketCnt}`);
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.post(`/pay/banking?id=${getId}&bookingId=${bookingId}&paidPrice=${totalPrice}&paymentCnt=${ticketCnt}`);
    }
},

// 카카오페이결제요청
kakaopayReady: async(getId, exhibitNo, ticketCnt, totalPrice, bookingId) => {
    try{
        Functions.setAuthorizationHeader();
        return await axios.post( `/pay/kakaoReady?id=${getId}&exhibitNo=${exhibitNo}&quantity=${ticketCnt}&price=${totalPrice}&bookingId=${bookingId}`);
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.post( `/pay/kakaoReady?id=${getId}&exhibitNo=${exhibitNo}&quantity=${ticketCnt}&price=${totalPrice}&bookingId=${bookingId}`);
    }
},

// 전시상세 한줄평작성
writeExhibitComment: async(getId, exhibitNo, stars, comment) => {
    try{
        Functions.setAuthorizationHeader();
        const commentData = {
            memberId: getId,
            exhibitNo: exhibitNo,
            starRates: stars,
            comment: comment
        }
        return await axios.post("/exhibitComment/write", commentData);
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        const commentData = {
            memberId: getId,
            exhibitNo: exhibitNo,
            starRates: stars,
            comment: comment
        }
        return await axios.post("/exhibitComment/write", commentData);
    }
},

// 전시상세 한줄평출력
commentList: async(exhibitNo) =>{
    try{
        Functions.setAuthorizationHeader();
        return await axios.get( `/exhibitComment/list?exhibitNo=${exhibitNo}`);
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.get( `/exhibitComment/list?exhibitNo=${exhibitNo}`);
    }
},

// 내가 쓴 한줄평(마이페이지 내)
 myExhibitComments: async(getId) => {
     try{
        Functions.setAuthorizationHeader();
        return await axios.get(`/exhibitComment/listBy?memberId=${getId}`);
     } catch(error) {
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.get(`/exhibitComment/listBy?memberId=${getId}`);
     }
 },

// 내가 한 예약조회(마이페이지 내)
myBookedList: async(getId) => {
     try{
         Functions.setAuthorizationHeader();
         return await axios.get(`/booking/checkTicket?id=${getId}`);
     } catch(error){
         console.error(error);
         await Functions.handleApiError(error);
         return await axios.get(`/booking/checkTicket?id=${getId}`);
     }
 },

// 예매취소
cancelReservation: async(selectedData) => {
    try{
        Functions.setAuthorizationHeader();
        return await axios.post(`/booking/cancel?bookingId=${selectedData}`);
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.post(`/booking/cancel?bookingId=${selectedData}`);
    }
},

// 전시회리스트 리셋
resetExhibitions: async() => {
    try{
        Functions.setAuthorizationHeader();
        return await axios.get("/exhibitions/list");
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.get("/exhibitions/list");
    }
},

// 댓글리스트(관리자)
boardCommentsList: async() => {
    try{
        Functions.setAuthorizationHeader();
        return await axios.get("/api/comments/commentList");
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.get("/api/comments/commentList");
    }
},

// 예매리스트(관리자)
bookingList: async() => {
    try{
        Functions.setAuthorizationHeader();
        return await axios.get("/booking/allBookings");
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.get("/booking/allBookings");
    }
},

// 게시글전체조회(관리자)
articleList: async() => {
    try{
        Functions.setAuthorizationHeader();
        return await axios.get("/api/boardList/allArticles");
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.get("/api/boardList/allArticles");
    }
},

// 쪽지보내기
sendMsg: async(sendId, receiverId, title, contents) => {
    try{
        Functions.setAuthorizationHeader();
        const msgData = {
            senderId: sendId,
            receiverId: receiverId,
            title: title,
            contents: contents
        }
        return await axios.post("/message/sendMsg", msgData);
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        const msgData = {
            senderId: sendId,
            receiverId: receiverId,
            title: title,
            contents: contents
        }
        return await axios.post("/message/sendMsg", msgData);
    }
},

// 받은쪽지가지고오기
receivedMsg: async(receiverId) => {
     try{
         Functions.setAuthorizationHeader();
         return await axios.get(`/message/receiveMsgList?receiverId=${receiverId}`);
     } catch(error){
         console.error(error);
         await Functions.handleApiError(error);
         return await axios.get(`/message/receiveMsgList?receiverId=${receiverId}`);
     }
 },

// 보낸쪽지
sentMsg: async(sendId) => {
    try{
        Functions.setAuthorizationHeader();
        return await axios.get(`/message/sendMsgList?senderId=${sendId}`);
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.get(`/message/sendMsgList?senderId=${sendId}`);
    }
},

// 열람 추가
openedMsg: async(messageNo, isOpened) => {
    try{
        Functions.setAuthorizationHeader();
        const updateStatus = {
            isOpened: isOpened
        }
        return await axios.post(`/message/isOpened/${messageNo}`, updateStatus);
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        const updateStatus = {
            isOpened: isOpened
        }
        return await axios.post(`/message/isOpened/${messageNo}`, updateStatus);
    }
},

//광고 메일 보내기
sendEmail: async(id, email, title, contents) =>{
    try{
        Functions.setAuthorizationHeader();
        const emailData = {
            member: {
                id: id,
                email: email,
              },
              title: title,
              emailContents: contents,
        }
        return await axios.post("/emailAd/send", emailData);
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        const emailData = {
            member: {
                id: id,
                email: email,
              },
              title: title,
              emailContents: contents,
        }
        return await axios.post("/emailAd/send", emailData);
    }
},

//광고메일조회
emailAdList: async() => {
    try{
        Functions.setAuthorizationHeader();
        return await axios.get("/emailAd/all");
    } catch(error){
        console.error(error);
        await Functions.handleApiError(error);
        return await axios.get("/emailAd/all");
    }
}







};

export default DDDApi;