import axios from "axios";
import { useEffect, useState } from "react";
import {AiFillStar} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css"
const baseUrl = "http://localhost:8080/";

//image api 4098ffd4b6a640e78d6adf831e6f9bc0
const FavoriteGames = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("@username");
    const [favorites, setFavorites] = useState(null);

    const getFavorites = async() => {
        await axios.get(baseUrl + "users/" + username).then(res => {setFavorites(res.data.favorites)});
    }

    useEffect(()=> {
        getFavorites();
    }, [])
    if(favorites != null)
    {
        return(
        <div className="favorite-games-container">
            {favorites.favoriteGames.map(it => {
                return <div onClick={()=> navigate("/details/" + it.id)} className="favorite-game-base">
                    <div><img alt={it.gameName} src={it.imageUrl}/></div>
                    <div><p>{it.gameName}</p></div> 
                    <div><AiFillStar size={60}/></div>
                    </div>
            })}
        </div>
    )}
}

export default FavoriteGames;