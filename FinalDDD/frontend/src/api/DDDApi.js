import axios from "axios";
//const HEADER = {"Content-type" : "application/json"}

const DDDApi = {
    // 자유게시판 카테고리별 리스트 조회 
    getFreeBoardsByCategory : async (category) => {
        return await axios.get(`/boardList/${category}`);
    },

    // 특정 게시판 번호의 게시물 상세 조회(+댓글 포함)
    getBoard: async(boardNo) => {
        return await axios.get(`/boardList/boardView/${boardNo}`);
    },

    // 게시글 작성
    boardWrite: async (getId, category, region, title, imageUrl, contents ) => {
        console.log("getId : "+ getId, "category : " + category, "region: " + region, "title: " + title, "image: " + imageUrl, "contents: " + contents )
        const postObj = {
            id: getId,
            category: category,
            region: region,
            title: title,
            image: imageUrl,
            contents: contents
        };
        return await axios.post( "/boardList/write", postObj);
    },

    // 게시글 수정
    editBoards: async (boardNo, updateBoard) => {
        return await axios.put(`/boardList/boardView/${boardNo}`, updateBoard);
    },


    // 게시글 삭제
    delBoards: async (boardNo) => {
        return await axios.delete(`/boardList/boardView/${boardNo}`);
    },


    // 마이페이지 내 게시글 조회
    getBoardsByMember: async (memberId) => {
        return await axios.get(`/boardList/members/${memberId}/boards`);
    },

    // 마이페이지 내 댓글 조회
    commentLoad: async (memberId) => {
        return await axios.get(`/comments/members/${memberId}/comments`);
    },


    // 자유게시판 검색 목록 출력
    searchListLoad: async (keyword) => {
        const url = `/boardList/searchList?keyword=${keyword}`;
        console.log(url); // 해당 페이지 url 확인 위해
        return await axios.get(url);
        // return await axios.get(DDD_DOMAIN + `/boardList/searchList?keyword=${keyword}`, HEADER); 
    },

    // 댓글 작성
    commentWrite: async (comment, getId, boardNo) => {
        const commentObj = {
            comment: comment,
            getId: getId,
            boardNo: boardNo
        }
        return await axios.post( "/comments/commentWrite", commentObj);
    },

    // 댓글 삭제 
    commentDelete : async (commentNo) => {
        return await axios.delete(`/comments/commentDelete/${commentNo}`);
    },


    // 로그인
    login : async(email, password) => {
        console.log('입력받은 이메일' + email)
        console.log('입력받은 패스워드' + password)
        const loginCheck = {
            email : email,
            password : password
        };
        return await axios.post("/login/login", loginCheck);
    },
    
    // 전시 리스트 출력
    exhibitionList : async() => {
        return await axios.get("/exhibitions/dbList");
    }, 
    
    // 전시 상세정보
    exhibitDetail : async(exhibitNo) => {
        return await axios.get(`/exhibitions/${exhibitNo}`);
    },

    // 예매정보저장
    bookTicket: async(getId, exhibitNo, kstDate,
        bookedName, bookedContact, bookedEmail, deliveryMethod) => {
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
    },

    // 결제정보저장(무통장)
    bankingPayment: async(getId, bookingId, totalPrice, ticketCnt) => {
        return await axios.post(`/pay/banking?id=${getId}&bookingId=${bookingId}&paidPrice=${totalPrice}&paymentCnt=${ticketCnt}`);
    },

    // 카카오페이결제요청
    kakaopayReady: async(getId, exhibitNo, ticketCnt, totalPrice, bookingId) => {
        return await axios.post( `/pay/kakaoReady?id=${getId}&exhibitNo=${exhibitNo}&quantity=${ticketCnt}&price=${totalPrice}&bookingId=${bookingId}`);
    },

    // 전시상세 한줄평작성
    writeExhibitComment: async(getId, exhibitNo, stars, comment) => {
        return await axios.post(`/exhibitComment/write?id=${getId}&exhibitNo=${exhibitNo}&starRates=${stars}&comment=${comment}`);
    },

    // 전시상세 한줄평출력
    commentList: async(exhibitNo) =>{
        return await axios.get( `/exhibitComment/list?exhibitNo=${exhibitNo}`);
    },

    // 내가 한 예약조회(마이페이지 내)
    myBookedList: async(getId) => {
        return await axios.get(`/booking/checkTicket?id=${getId}`);
    },

    // 예매취소
    cancelReservation: async(selectedData) => {
        return await axios.post(`/booking/cancel?bookingId=${selectedData}`);
    },



};

export default DDDApi;