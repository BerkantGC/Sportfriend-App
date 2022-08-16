import axios from "axios";
import { useEffect, useState, useRef } from "react";
import {AiFillStar} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css"
import "../styles/ChangePasswordStyle.scss"
const baseUrl = "http://192.168.1.79:8080/";

//image api 4098ffd4b6a640e78d6adf831e6f9bc0
const FavoriteGames =() => {
    const navigate = useNavigate();
    const username = localStorage.getItem("@username");
    const [favorites, setFavorites] = useState(null);

    const token = localStorage.getItem("@token");
    useEffect(()=>{
        const getFavorites = async() => {
            await axios.get(baseUrl + "users/" + username, {
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            }).then(res => {setFavorites(res.data.favorites)});
        }
    
        getFavorites();
    
    }, [])

    if(favorites != null)
    {
        return(
        <div className="favorite-games-container">

            {favorites.favoriteGames.map(it => {
                const imageLink = baseUrl + "images/" + it.imageUrl;
                return <div onClick={()=> navigate("/details/" + it.id)}  className="favorite-game-base">
                    <div><img alt={it.gameName} loading="lazy"  src={imageLink}/></div>
                    <div><p>{it.gameName}</p></div> 
                    <div><AiFillStar size={60}/></div>
                    </div>
            })}
        </div>
    )}
    else return(
    <div className="no-favorites">
            <label>You don't have any favorite games!</label>
            <img src="http://localhost:8080/images/sad.png" width={200}/>
    </div> 
    )
}

export default FavoriteGames;