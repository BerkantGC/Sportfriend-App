import React, { useEffect, useState } from 'react';
import axios from 'axios';
import{useNavigate} from "react-router-dom"
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
      <div onClick={()=>props.navigate(link)} className='image-container'>
        <img className='image' loading="lazy"  src={imageLink} alt={props.item.gameName}></img>
        <p className='text'>{props.item.gameName}</p>
      </div>
    </div>
)
}

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
                <span className="loader"><span className="loader-inner"></span></span>
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
