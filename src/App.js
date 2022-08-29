import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route, 
  Link
} from "react-router-dom"

import Login from "./pages/Login.js";
import Register from "./pages/Register";
import Home from './pages/Home';
import Main from "./pages/Main";
import Details from './pages/Details';
import Profile from './pages/Profile';
import ChatRoom from './components/ChatRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path='/home/:id' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Main/>}/>
        <Route path='/main' element={<Main/>}/>
        <Route path='details/:id' element={<Details/>}/>
        <Route path='profile/:id' element={<Profile/>}/>
        <Route path='/chatroom' element={<ChatRoom/>}/>
      </Routes>
    </Router>
  );
}

export default App;
