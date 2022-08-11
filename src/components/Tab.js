import { useSelector } from "react-redux";
import axios from "axios";
import {FcBusinessman} from "react-icons/fc";

const handleLogout = async() =>{
  localStorage.removeItem("@token")
   localStorage.removeItem("@username")
  await axios.post("http://localhost:8080/logout");
}

const handleGetProfileInfo = () => {

}
const Tab = ({navigate}) => {
    const token = localStorage.getItem("@token");
    const username = localStorage.getItem("@username")
    const userProfileUrl = "/profile/" + username;
    return (
    <div>
    <div className='top-bar'>
      <div className="top-bar-centering">
    <a className='top-bar-text' href='https://www.gamesatis.com/magaza-paketleri'>Mağaza Paketleri</a>
    |
    <a className='top-bar-text' href='https://www.gamesatis.com/donate'>Donate</a>
    |
    <a className='top-bar-text' href='https://www.gamesatis.com/blog'>Blog</a>
    |
    <a className='top-bar-text' href='https://www.gamesatis.com/yorumlar'>Yorumlar</a>
    |
    <a className='top-bar-text' href='https://www.gamesatis.com/magaza-paketleri'>Yardım ve Destek</a>
    </div>
  </div>
  <section className='site-header'>
    <div className='header-container'>
      <div className='site-header-side'>
        <a href='/main'>
          <img alt='logo' src='https://images.gamesatis.com/assets/logo-light.svg' width="180" height="30"/>
        </a>
        <h1 class="site-header-slogan">Türkiye'nin En Büyük Oyuncu Pazarı</h1>
      </div>
      
      {(token != null && username != null)? 
      <div className='profile'>
          <button onClick={() => navigate(userProfileUrl)} className='username-title'>
          <FcBusinessman size={30}></FcBusinessman>
            <label>{username}<br></br>0,00 ₺</label>
          </button>
          <form className='login' onClick={handleLogout}>
            <input className='login-btn' type='submit' value = "Logout"/>
          </form>
        </div>
      :
      <form className='login' action='http://192.168.1.79:3000/login'>
          <input className='login-btn' type='submit' value = "Login/Register"/>
        </form>
        }
    </div>
  </section>
  </div>
  )
  }

  export default Tab;