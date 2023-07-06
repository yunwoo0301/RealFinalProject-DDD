
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
import PopupModal from './components/Login/PopupModal';
import WriteBoard from './pages/WriteBoard';
import EditBoard from './pages/EditBoard';


function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/popupModal" element={<PopupModal/>}/>
        <Route path="/exhibitList" element={<ExhibitListPage/>}/>
        <Route path="/exhibitInfo/:id" element={<ExhibitInfoPage/>}/>
        <Route path="/reservation/:id" element={<ReservationPage/>}/>
        <Route path="/boardList" element={<BoardList/>}/>
        <Route path="/boardList/write" element={<WriteBoard/>}/>
        <Route path="/boardList/boardView/:no" element={<BoardView/>}/>
        <Route path="/boardList/boardView/:no/editBoard" element={<EditBoard/>}/>
        <Route path="/mypage/:memberId" element={<MyPage/>}/>
        <Route path="/admin" element={<AdminMain/>}/>
      </Routes>
      </Router>
  );
}

export default App;
