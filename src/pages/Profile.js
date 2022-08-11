import axios from "axios";
import { useEffect, useState } from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import {FcBusinessman} from "react-icons/fc";
import {BiLira, BiCommentDetail, BiGame, BiStar} from "react-icons/bi";
import {FaRegEdit} from "react-icons/fa";
import {CgClose} from "react-icons/cg";
import "../styles/Profile.css";

import styles from "../styles/ChangePasswordStyle.scss";

import Tab from "../components/Tab";
import FavoriteGames from "../components/FavoriteGames";
import AddGame from "../components/AddGame";


const baseUrl = "http://localhost:8080";

const handleChangePassword= async(oldPassw, newPassw, checkPassw)=> {
    
    const token = localStorage.getItem("@token")
    if(newPassw == checkPassw)
    {
        const changePassword = {
            "oldPassword": oldPassw,
            "newPassword": newPassw
        }
        await axios.put(baseUrl + "change_password", changePassword, {headers: {"Authorization" : `Bearer ${token}`}})
    }
}

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

    const [isPasswordModalActive, setPasswordModalActive] = useState(false);

    const EditPassword = () => {
        const [oldPassw, setOldPass] = useState("");
        const [newPassw, setPassw] = useState("");
        const [checkPassw, setCheckPassw] = useState("");

        const handleSubmit = (event) => {
            event.prevent.default();
    
            handleChangePassword(oldPassw, newPassw, checkPassw);
        }
        
        return(
            <form className={`${"profile-edit-password"} ${isPasswordModalActive ? "active" : ""}`}>
                <CgClose onClick={()=> setPasswordModalActive(!isPasswordModalActive)} size={40} style={{position:"absolute", top: "15px", right: "15px", cursor: "pointer"}}></CgClose>
                <div>
                    Old Password:
                    <input value={oldPassw} onChange={event => setOldPass(event.target.value)} placeholder="" />
                </div>
                <div>
                    New Password:
                    <input value={newPassw} onChange={event => setPassw(event.target.value)} placeholder="" />
                </div>
                <div>
                    New Password Again:
                    <input value={checkPassw} onChange={event => setCheckPassw(event.target.value)} placeholder="" />
                </div>
                <button onSubmit={handleSubmit}>Change Password</button>
            </form>
        )
    }

    const [selected, setSelected] = useState("infos");
    const handleGetProfileInfo = async(id) => {
        await axios.get(baseUrl + "/users/" + id, {headers: {"Authorization" : `Bearer ${token}`}})
        .then(res => {
            setProfileData(res.data)
            console.log(res.data)
        })
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
                    <h1>{id.toLocaleUpperCase()}<br></br>0.00<BiLira size={25} className="BiLira"/></h1>
                    <form  onClick={handleLogout}>
                        <input className='profile-logout' type='submit' value = "Logout"/>
                    </form>
                    </div>
                </div>
                <div className="profile-edit">
                    <div className="profile-buttons">
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
                    </div>
                    <div className="profile-banner">
                    <a href="/pubg-mobile-uc" target="_blank">
                        <img class="user-panel-menu-bottom"  src="https://img.gamesatis.com/showcase/735/lol-hesap-64628.jpg" alt="lol"/>
                    </a>
                    </div>
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
                            <div onClick={()=>setPasswordModalActive(!isPasswordModalActive)} className="edit-button">
                                <FaRegEdit size={35}/>
                            </div>
                            <EditPassword/>
                        </div>
                        <div className="profile-placeholder">
                            Roles: {Object.values(profileData.roles).map(item=>{
                                return <p>{item.roleName}</p>
                            })}
                        </div>
                        </>
            }
            {
                selected == "favorites" && <FavoriteGames />
            }
            {
                selected == "addgame" && <AddGame/>
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