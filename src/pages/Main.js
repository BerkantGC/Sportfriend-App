import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/exports';
import axios from 'axios';
import{Link, useNavigate} from "react-router-dom"
import '../styles/SellerRow.css';
import "../styles/App.css"


import Tab from "../components/Tab.js";
import SellerRow from "../components/SellerRow";

const baseUrl = "http://localhost:8080/";

const GameRows = (props) => {
const link = "/details/" + props.item.id;
let imageLink = baseUrl + "images/" + props.item.imageUrl;

  return ( 
    <div className ="game-rows-container">
      <a onClick={()=>props.navigate(link, imageLink)} className='image-container'>
        <img className='image' loading="lazy"  src={imageLink} alt={props.item.gameName}></img>
        <p className='text'>{props.item.gameName}</p>
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
  const token = localStorage.getItem("@token");
  console.log("token by local storage is :" + token);

  const handleGetData = async() => 
  { 
    setLoading(true);
    
    await axios.get("http://localhost:8080/sellers")
    .then(res => {
      setData(res.data);
      setLoading(false);
      })
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
           <div className='seller-container'>
              {data.map(it=>
              it.games.map(item=>
                {
                  return <GameRows item={item} navigate={navigate}></GameRows>
                }))}
              </div>
          </div>
          <div><br></br></div>
    </div>
   }
   </div>
);
}

export default App;
