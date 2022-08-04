import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/exports';
import axios from 'axios';
import{Link, useNavigate} from "react-router-dom"
import '../styles/SellerRow.css';
import "../styles/App.css"


import Tab from "../components/Tab.js";
import SellerRow from "../components/SellerRow";

const GameRows = ({item}) => {
const link = "/details/" + item.id;
console.log("link");
  return ( 
    <div className ="game-rows-container">
      <a href={link} className='image-container'>
        <img className='image' src={item.imageUrl} alt={item.gameName}></img>
        <p className='text'>{item.gameName}</p>
      </a>
    </div>
)
}

const handleLogout = () =>{
  axios.post("http://localhost:8080/logout");
}

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const token = useSelector(sel => sel.userToken);
  console.log(token);

  const handleGetData = async() => 
  { 
    setLoading(true);
    if(token != null)
    {
      await axios.get("http://localhost:8080/sellers",
      {headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
      setData(res.data);
      console.log(res.data[0].games[0]);
      })
    }
    else await axios.get("http://localhost:8080/sellers")
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
          <Tab navigate={navigate}/>
          <SellerRow data={data}/>
          <div className='sellers'>
            {data.map(item=>{
              return <div className='seller-container'>
              {item.games.map(it=>
                {
                  return <GameRows item={it}></GameRows>
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
