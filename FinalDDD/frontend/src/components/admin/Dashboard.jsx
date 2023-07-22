import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Chart from "./Charts";
import DDDApi from "../../api/DDDApi";
import LoginApi from "../../api/LoginApi";

const DashboardContainer = styled.div`
    width: 80vw;
    height: 100vh;
    p {
        font-size: 0.8em;
        font-weight: bolder;
    }
    .dash-title{
        margin-left: 3rem;
        text-decoration: underline;
    }
    .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    }
    .today-noti{
        background-color: #e3e3e3;
        width: 60em;
        justify-content: center;
        align-items: center;
        text-align: center;
        >h4{
            margin-top: .5rem;
            margin-bottom: 0;
        }

        .noti-list{
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 1rem;
            >p {
                font-size: 0.8em;
            }
        }
    }
    .second-row{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        gap: 2em;
    }
    .charts{
        width: 80%;
        margin-left: 1rem;
        margin-top: 1rem;
        height: 20em;
        text-align: center;
        background-color: #e3e3e3;
        border-radius: 2rem;

    }
    .dailyData{
        width: 28rem;
        height: 20rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        border-radius: 2rem;
        background-color: #e3e3e3;
        margin-left: 1rem;
        margin-top: 1rem;
        table{
            width: 25rem;
            height: 100%;
            font-size: 0.8em;
            text-align: center;
            border-collapse: collapse;
            border-spacing:0;
        th {
            background-color: #050E3D;
            margin: 0;
            color: white;
            border: none;
        }

        td, th {
            border: none;
        }

    }
    }
    .exhibit-container{
        margin: 1rem;
        border-radius: 2rem;
        background-color: #e3e3e3;
        width: 60rem;
        display: flex;
        flex-direction: column;

        >h4{
            margin-top: .5rem;
            margin-bottom: 0;
            text-align: center;
        }

    }
    .exhibit-status{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .exhibits > img{
                width: 5rem;
                height: 7rem;
                margin-bottom: 0.5rem;
            }

    .exhibits {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 2rem;
        gap: 1rem;
        >p{
            font-size: 1rem;
        }
    }
    .exhibit-list{
        display: flex;
        flex-direction: column;
        padding: 1rem;
        >p{
            font-size: 1rem;
        }
    }
    .contents{
        display: flex;
        flex-direction: row;
    }
`;



const DashBoard = () => {
    const [bookingList, setBookingList] = useState([]);
    // 날짜형식
    const formatDate = (date) => {
        const writeDate = new Date(date);
        const year = writeDate.getFullYear();
        const month = (writeDate.getMonth() + 1).toString().padStart(2, "0");
        const day = writeDate.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
      };

    // 전체 예매리스트
    useEffect(() => {
        const getBookings = async () => {
            const result = await DDDApi.bookingList();
            setBookingList(result.data);
        };
        getBookings();
        }, []);

    // 대시보드로 제일예매가 많이 된 전시정보 전달
    const [dashboardData, setDashboardData] = useState({ exhibitName: "", imgUrl: "" });
    // 오늘 날짜인 예약 개수
    const [todayBookingCount, setTodayBookingCount] = useState(0);

    useEffect(() => {
        const today = new Date();
        const formattedToday = formatDate(today); // 오늘 날짜를 형식에 맞게 변환

        // 가장 많이 중복된 exhibitNo를 찾는 로직
       const duplicateExhibitNo = findDuplicateExhibitNo(bookingList);

       // duplicateExhibitNo가 존재하면 해당 전시회의 exhibitName과 imgUrl 추출
       let exhibitName = "";
       let imgUrl = "";
       if (duplicateExhibitNo) {
         const duplicateBookings = bookingList.filter(
           (item) => item.exhibitNo === duplicateExhibitNo
         );

        // 오늘 날짜인 예약만 추출
      const todayBookings = bookingList.filter((item) => {
      const formattedBookingDate = formatDate(new Date(item.bookingDate));
      return formattedBookingDate === formattedToday;
      });

      setTodayBookingCount(todayBookings.length); // 오늘 날짜인 예약 개수 설정
         if (duplicateBookings.length > 0) {
           exhibitName = duplicateBookings[0].exhibitName;
           imgUrl = duplicateBookings[0].imgUrl;
         }
       }

    // DashBoard 컴포넌트로 exhibitName과 imgUrl 전달
    setDashboardData({ exhibitName, imgUrl });
     }, [bookingList]);

    const findDuplicateExhibitNo = (list) => {
    const counts = {};
    let maxCount = 0;
    let duplicateExhibitNo = null;

    for (const item of list) {
        const exhibitNo = item.exhibitNo;
        counts[exhibitNo] = (counts[exhibitNo] || 0) + 1;
        if (counts[exhibitNo] > maxCount) {
        maxCount = counts[exhibitNo];
        duplicateExhibitNo = exhibitNo;
        }
    }
    return duplicateExhibitNo;
     };

    // 전시리스트 불러오기
    const [exhibitionList, setExhibitionList] = useState([]);
    const [thisWeekStartExhibitions, setThisWeekStartExhibitions] = useState([]);
    const [thisWeekEndExhibitions, setThisWeekEndExhibitions] = useState([]);
    const [ongoingExhibitions, setOngoingExhibitions] = useState([]);

    const exhibitions = async () => {
    try {
        const exhibitListData = await DDDApi.exhibitionList();
        setExhibitionList(exhibitListData.data);
    } catch (e) {
        console.log(e);
    }
    };

    useEffect(() => {
    exhibitions();
    }, []);

    useEffect(() => {
    const today = new Date();
    const startOfWeek = getStartOfWeek(today);
    const endOfWeek = getEndOfWeek(today);
    const formattedToday = formatDate(today);

    const thisWeekStartExhibitions = exhibitionList.filter((exhibition) => {
        const startDate = new Date(exhibition.startDate);
        return startDate >= startOfWeek && startDate <= endOfWeek;
    });

    const thisWeekEndExhibitions = exhibitionList.filter((exhibition) => {
        const endDate = new Date(exhibition.endDate);
        return endDate >= startOfWeek && endDate <= endOfWeek;
    });

    // 오늘 날짜에 해당하는 전시 중인 전시 개수
    const todayOngoingExhibitionsCount = exhibitionList.filter(
        (exhibition) =>
        exhibition.startDate <= formattedToday && formattedToday <= exhibition.endDate
    ).length;

    setOngoingExhibitions(todayOngoingExhibitionsCount);
    setThisWeekStartExhibitions(thisWeekStartExhibitions);
    setThisWeekEndExhibitions(thisWeekEndExhibitions);
    }, [exhibitionList]);

    const getStartOfWeek = (date) => {
    const firstDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 1));
    return new Date(firstDayOfWeek.getFullYear(), firstDayOfWeek.getMonth(), firstDayOfWeek.getDate(), 0, 0, 0);
    };

    const getEndOfWeek = (date) => {
    const lastDayOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 7));
    return new Date(lastDayOfWeek.getFullYear(), lastDayOfWeek.getMonth(), lastDayOfWeek.getDate(), 23, 59, 59);
    };

     // 멤버리스트가져오기
     const [regDateCnt, setRegDateCnt] = useState(0);
     const [deleteDateCnt, setDeleteDateCnt] = useState(0);

     const getMembers = async() => {
        const result = await LoginApi.getAllMembers();

        // 오늘 날짜 계산
        const today = new Date().toISOString().slice(0, 10);

        // regDate가 오늘 날짜인 데이터 개수 구하기
        const regDateCount = result.data.filter((item) => item.regDate.slice(0, 10) === today).length;
        // deleteDate가 오늘 날짜인 데이터 개수 구하기
        const deleteDateCount = result.data.filter((item) => item.deleteDate && item.deleteDate.slice(0, 10) === today).length;

        setRegDateCnt(regDateCount);
        setDeleteDateCnt(deleteDateCount);

    }
    useEffect(() => {
       getMembers();
    }, [])

    // 게시글 수 구하기
    const [todayArticles, setTodayArticles] = useState(0);

      // 글 전체조회
    useEffect(() => {
    const getBoards = async () => {
      try {
        const result = await DDDApi.articleList();

        // 오늘 날짜 계산
        const today = new Date().toISOString().slice(0, 10);

        // writeDate가 오늘 날짜인 데이터 개수 구하기
        const todayWriteDateCount = result.data.filter((item) => item.writeDate && item.writeDate.slice(0, 10) === today).length;
        setTodayArticles(todayWriteDateCount);

      } catch (e) {
        console.log(e);
      }
    };
    getBoards();

    }, []);


  return(
      <DashboardContainer>
        <h3 className="dash-title">Dash Board</h3>
        <div className="container">
        <div className="today-noti">
            <h4>오늘의 알림</h4>
            <hr />
            <div className="noti-list">
            <p>신규회원 : {regDateCnt}</p>
            <p>탈퇴회원 : {deleteDateCnt}</p>
            <p>전시 중 : {ongoingExhibitions}</p>
            <p>예매완료 : {todayBookingCount}</p>
            <p>게시글 수 : {todayArticles}</p>
            </div>
        </div>
        <div className="second-row">
        <div className="charts">
            <h4>이번달 가입현황</h4>
            <Chart/>
        </div>
        </div>
        <div className="exhibit-container">
        <h4>전시 현황</h4>
            <hr/>
        <div className="exhibit-status">

        <div className="exhibit-list">
        <p>이번 주 시작하는 전시</p>
        <div className="contents">
            {thisWeekStartExhibitions.map((exhibit) => (
            <div className="exhibits" key={exhibit.exhibitNo}>
                <img src={exhibit.imgUrl} alt={exhibit.name} />
                <p>{exhibit.exhibitName}</p>
            </div>
            ))}
            </div>
        </div>
        <div className="exhibit-list">
        <p>이번 주 끝나는 전시</p>
        <div className="contents">
            {thisWeekEndExhibitions.map((exhibit) => (
            <div className="exhibits" key={exhibit.exhibitNo}>
                <img src={exhibit.imgUrl} alt={exhibit.name} />
                <p>{exhibit.exhibitName}</p>
            </div>
            ))}
            </div>
            </div>
            </div>
            <div className="exhibit-list">
                <p>예매가 제일 잘되는 전시</p>
            <div className="contents">
                <div className="exhibits">
                <img
                    src={dashboardData.imgUrl}
                    alt={dashboardData.exhibitName}
                />
                <p>{dashboardData.exhibitName}</p>
                </div>
            </div>

            </div>
    </div>
    </div>

        </DashboardContainer>
    )
}

export default DashBoard;