import { useSelector } from "react-redux";
import axios from "axios";
import {FcBusinessman} from "react-icons/fc";
import { useState, useEffect, useRef } from "react";
import SearchInput,{ createFilter } from 'react-search-input';
import {useNavigate} from "react-router-dom";

import "../styles/Tab.scss"
const handleLogout = async() =>{
  localStorage.removeItem("@token")
   localStorage.removeItem("@username")
  await axios.post("https://gamessatis-backend.herokuapp.com/logout");
}

const handleGetProfileInfo = () => {

}
const Tab = () => {
      const [data, setData] = useState([]);
      const [isSearchBarActive, updateSearchBarActivity] = useState(false);
      const [searchTerm,searchUpdate] = useState("");

      //To detect when click outside of <div>
      const resultRef = useRef();
      const searchRef = useRef();
        useEffect(() => {
          const closeDropdown = (event) => {
            if(resultRef.current && !resultRef.current.contains(event.target) && searchRef.current && !searchRef.current.contains(event.target))
            {
              updateSearchBarActivity(false)
            }
          };
          document.body.addEventListener("click", closeDropdown);

          return()=> document.body.removeEventListener('click', closeDropdown);
        }, []);

      

      const navigate = useNavigate();
      const handleGetData = async() => 
      {
        await axios.get("https://gamessatis-backend.herokuapp.com/sellers")
        .then(res => {
          setData(res.data);
          })
      }
      useEffect(() => {
        handleGetData();
      }, [])

      let gamesData = [];
      data.map(it => {
        it.games.map(id=> {
          gamesData.push(id)
        })
      })
      const filteredList = gamesData.filter(createFilter(searchTerm, "gameName"))
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
        <h1 className="site-header-slogan">Türkiye'nin En Büyük Oyuncu Pazarı</h1>
      </div>

      <div className="search-input" ref={searchRef}>
        <SearchInput onClick={()=> updateSearchBarActivity(true)}  onChange={searchUpdate}/>
        <div ref={resultRef} className={`${"search-results-container"} ${isSearchBarActive && "active"}`}>
      {filteredList.map(games => {
            return(
              <div className="bar" onClick={()=>{let detailLink="/details/"+ games.id; navigate(detailLink)}} >
                <div className="each-result" key={games.id}>
                  {games.gameName}
                </div>
              </div>
            )
          })}
      </div>
      </div>
      
      {(token != null && username != null)? 
      <div className='profile'>
          <a href={userProfileUrl} className='username-title'>
          <FcBusinessman size={30}></FcBusinessman>
            <label>{username}<br></br>0,00 ₺</label>
          </a>
          <form className='login' onClick={handleLogout}>
            <input className='login-btn' type='submit' value = "Logout"/>
          </form>
        </div>
      :
      <form className='login' action='https://admin.d1tfj4asd39lfx.amplifyapp.com/login'>
          <input className='login-btn' type='submit' value = "Login/Register"/>
        </form>
        }
        
    </div>
  </section>
  </div>
  )
  }

  export default Tab;