
import './App.css';
import Login from './pages/login'
import Main from './pages/Main';
import ExhibitListPage from './pages/ExhibitListPage';
import ExhibitInfoPage from './pages/ExhibitInfoPage';
import ReservationPage from './pages/ReservationPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyPage from './pages/MyPage';
import BoardList from './pages/BoardList';
import BoardView from './pages/BoardView';
import AdminMain from './components/admin/AdminMain';
import WriteBoard from './pages/WriteBoard';
import EditBoard from './pages/EditBoard';
import VerifyEmail from './components/Login/VerifyEmail';
import RateExhibitions from './pages/RateExhibitions';
import Chatbot from './pages/Chatbot';

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/exhibitList" element={<ExhibitListPage/>}/>
        <Route path="/exhibitInfo/:id" element={<ExhibitInfoPage/>}/>
        <Route path="/reservation/:id" element={<ReservationPage/>}/>
        <Route path="/boardList" element={<BoardList/>}/>
        <Route path="/boardList/write" element={<WriteBoard/>}/>
        <Route path="/boardList/boardView/:no" element={<BoardView/>}/>
        <Route path="/boardList/boardView/:no/editBoard" element={<EditBoard/>}/>
        <Route path="/mypage/:memberId" element={<MyPage/>}/>
        <Route path="/admin" element={<AdminMain/>}/>
        <Route path="/login/check-email-token" element={<VerifyEmail/>}/>
        <Route path="/ratediary" element={<RateExhibitions/>}/>
        <Route path="/chatbot" element={<Chatbot/>}/>
      </Routes>
      </Router>
  );
}

export default App;
