import logo from './logo.svg';
import "./styles/App.css"
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
import Details from "./pages/Details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path='/home/:id' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/details' element={<Details/>}/>
      </Routes>
    </Router>
  );
}

export default App;
