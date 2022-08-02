import '../styles/App.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/exports';
import axios from 'axios';
import '../styles/SellerRow.css';

const GameRows = (props) => {
  return ( 
    <div className ="game-rows-container">
      <a className='image-container'>
        <img className='image' src={props.imageUrl} alt={props.gameName}></img>
        <p className='text'>{props.gameName}</p>
      </a>
    </div>
)
}

const handleLogout = () =>{
  axios.post("http://localhost:8080/logout");
}

const Tab = () => {
  const token = useSelector(sel => sel.userToken)
  const username = useSelector(sel => sel.username)
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
      <a href='/details'>
        <img alt='logo' src='https://images.gamesatis.com/assets/logo-light.svg' width="180" height="30"/>
      </a>
      <h1 class="site-header-slogan">Türkiye'nin En Büyük Oyuncu Pazarı</h1>
    </div>
    {token != null ? 
    <div className='profile'>
        <label className='username-title'>{username}<br></br>0,00 ₺</label>
        <form className='login' onClick={handleLogout}>
          <input className='login-btn' type='submit' value = "Logout"/>
        </form>
      </div>
    :
    <form className='login' action='http://localhost:3000/login'>
        <input className='login-btn' type='submit' value = "Login/Register"/>
      </form>
      }
  </div>
</section>
</div>
)
}

const SellerRow = (props) =>{
  return(
    <div>
    <div className="seller-row-container">
        <section >
          <ol className="seller-row-sellers">
          {props.data.map(it => {return <a className="each-seller">{it.sellerName}</a>})} 
          </ol>
        </section>
    </div>
    <div className="all-games">
      <a className="all-games-container1" href ="https://www.gamesatis.com/tum-oyunlar/pubg-mobile">
        <img className="all-games-image" src="https://img.gamesatis.com/showcase/5/pubg.svg" width="70" height="45"/>
      </a> 
      <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/valorant">
        <img className="all-games-image"  src="https://img.gamesatis.com/showcase/310/valorant.svg" width="70" height="45"/>
      </a> 
      <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/league-of-legends">
        <img className="all-games-image" src="https://img.gamesatis.com/showcase/311/league-of-legends.svg" width="70" height="45"/>
      </a> 
      <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/knight-online">
        <img className="all-games-image" src="https://img.gamesatis.com/showcase/929/knight-online.svg" width="70" height="45"/>
      </a> 
      <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/cs-go">
        <img className="all-games-image" src="https://img.gamesatis.com/showcase/4/cs-go.svg" width="70" height="45"/>
      </a> 
      <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/mobile-legends">
        <img className="all-games-image" src="https://img.gamesatis.com/showcase/723/mobile-legends.svg" width="70" height="45"/>
      </a> 
      <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/black-desert-online">
        <img className="all-games-image" src="https://img.gamesatis.com/showcase/725/black-desert-online.svg" width="70" height="45"/>
      </a> 
      <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
        <img className="all-games-image" src="https://img.gamesatis.com/showcase/8/metin2.svg" width="70" height="45"/>
      </a> 
      <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
        <img className="all-games-image" src="https://img.gamesatis.com/showcase/743/point-blank.svg" width="70" height="45"/>
      </a> 
      <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
        <img className="all-games-image" src="https://img.gamesatis.com/showcase/731/wolfteam.svg" width="70" height="45"/>
      </a> 
      <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
        <img className="all-games-image" src="https://img.gamesatis.com/showcase/850/fifa-22.svg" width="70" height="45"/>
      </a> 
      <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
        <img className="all-games-image" src="https://img.gamesatis.com/showcase/893/dota-2.svg" width="70" height="45"/>
      </a> 
      <a className="all-games-container" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
        <img className="all-games-image" src="https://img.gamesatis.com/showcase/3/google.svg" width="70" height="45"/>
      </a> 
      <a className="all-games-container2" href ="https://www.gamesatis.com/tum-oyunlar/free-fire">
        <img className="all-games-image" src="https://img.gamesatis.com/showcase/726/rust.svg" width="70" height="45"/>
      </a> 
  </div>
    </div>
  );
}
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = useSelector(sel => sel.userToken);
  console.log(token);

  const handleGetData = async() => 
  { 
    setLoading(true);
    await axios.get("http://localhost:8080/sellers",
    {headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      setData(res.data);
      console.log(res.data[0].games[0]);
    })
      setLoading(false);
   }
  useEffect(() => {
    handleGetData();
  }, [])


 if(data != null)
 return(
    <div>
      { loading ? 
      <div className='loader-wrapper'>
                <span class="loader"><span class="loader-inner"></span></span>
        </div>
        :
        <div className="main">
          <Tab/>
          <SellerRow data={data}/>
          <div className='sellers'>
            {data.map(item=>{
              return <div className='seller-container'>
              {item.games.map(it=>
                {
                  return <GameRows gameName={it.gameName} imageUrl={it.imageUrl}></GameRows>
                })}
              </div>
            })}
          </div>
          <div><br></br></div>
    </div>
   }
   </div>
);
}

export default App;
