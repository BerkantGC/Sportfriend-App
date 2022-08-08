import axios from "axios";
import { useEffect, useState } from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import {FcBusinessman} from "react-icons/fc";
import {BiLira, BiCommentDetail, BiGame, BiStar} from "react-icons/bi";
import "../styles/Profile.css";

import Tab from "../components/Tab";
import FavoriteGames from "../components/FavoriteGames";


const baseUrl = "http://localhost:8080";

const toPassword = (password) => {
    let newPassword = [];
    for(let i = 0; i<password.length; i++){
       newPassword[i] = "."
    }
    console.log(newPassword.join(""));
    return newPassword.join(" ");
}

const handleLogout = () =>{
    localStorage.removeItem("@token");
    localStorage.removeItem("@username");
    axios.post("http://localhost:8080/logout")
  }


function Profile(){
    const {id} = useParams();
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("@token")

    const [selected, setSelected] = useState("infos");
    const handleGetProfileInfo = async(id) => {
        await axios.get(baseUrl + "/users/" + id, {headers: {"Authorization" : `Bearer ${token}`}})
        .then(res => setProfileData(res.data))
        .catch(err => navigate("/main"))
    }

    useEffect(()=>{
        handleGetProfileInfo(id);
    }, [])

    return(
        profileData != null &&
        <div>
        <Tab/>
        <div className="profile-main-container">
            <div className="profile-process">
                <div className="profile-picture">
                    <button className="icon-base" onClick={()=>setSelected("infos").style.cursor = 'pointer'}>
                    <FcBusinessman size={200}></FcBusinessman>
                    </button>
                    <div>
                    <h1>{id.toLocaleUpperCase()}<br></br>0.00<BiLira/></h1>
                    <form  onClick={handleLogout}>
                        <input className='profile-logout' type='submit' value = "Logout"/>
                    </form>
                    </div>
                </div>
                <div className="profile-edit">
                    <button onClick={()=>{setSelected("favorites")}}>
                        <BiStar size={50}/>
                        <label>Favorites</label>
                    </button>
                    <button onClick={()=>{setSelected("addgame")}}>
                        <BiGame size={50}/>
                        <label>Add Game</label>
                    </button>
                    <button onClick={()=>{setSelected("comments")}}>
                        <BiCommentDetail size={50}/>
                        <label>Comments</label>
                    </button>
                    <a href="/pubg-mobile-uc" target="_blank">
                        <img class="user-panel-menu-bottom"  src="https://img.gamesatis.com/slider/908/pubg-uc-satin-al-34550.jpg" alt="pubg-uc-satin-al"/>
                    </a>
                </div>
            </div>
            <div className="profile-info">
            { 
                selected == "infos" && <>
                <div className="profile-placeholder">
                    Email: <p>{profileData.email}</p>
                        </div>
                        <div className="profile-placeholder">
                        Password: <p>{toPassword(profileData.password)}</p>
                        </div>
                        <div className="profile-placeholder">
                            Roles: {Object.values(profileData.roles).map(item=>{
                                return <p>{item.roleName}</p>
                            })}
                        </div>
                        </>
            }
            {
                selected == "favorites" && <FavoriteGames/>
            }
            {
                selected == "addgame" && <div><p>Add Game</p></div>
            }
            {
                selected == "comments" && <div><p>Comments</p></div>
            }
            </div>
        </div>
        </div>
    );
}
export default Profile;