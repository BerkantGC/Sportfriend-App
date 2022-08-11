import axios from "axios";
import { useEffect, useState } from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import {FcBusinessman} from "react-icons/fc";
import {BiLira, BiCommentDetail, BiGame, BiStar} from "react-icons/bi";
import {FaRegEdit} from "react-icons/fa";
import {CgClose} from "react-icons/cg";

import styles from "../styles/ChangePasswordStyle.scss";

import Tab from "../components/Tab";
import FavoriteGames from "../components/FavoriteGames";
import AddGame from "../components/AddGame";


const baseUrl = "http://localhost:8080";

//Here is Post Action to Change Password 
const handleChangePassword= async(oldPassw, newPassw, checkPassw)=> {
    
    const token = localStorage.getItem("@token")
    if(newPassw == checkPassw)
    {
        const changePassword = {
            "oldPassword": oldPassw,
            "newPassword": newPassw
        }
        await axios.put(baseUrl + "/change_password", changePassword, {headers: {"Authorization" : `Bearer ${token}`}})
    }
}

//To Convert password to dots(.)
const toPassword = (password) => {
    let newPassword = [];
    for(let i = 0; i<password.length; i++){
       newPassword[i] = "."
    }
    console.log(newPassword.join(""));
    return newPassword.join(" ");
}

//Logout function and remove token from storage
const handleLogout = () =>{
    localStorage.removeItem("@token");
    localStorage.removeItem("@username");
    axios.post("http://localhost:8080/logout")
  }


function Profile(){
    //Ability of routing between pages
    const navigate = useNavigate();

    //Getting username for param of page
    const {id} = useParams();

    //to store profile data
    const [profileData, setProfileData] = useState(null);

    //define token from localstorage
    const token = localStorage.getItem("@token")

    //activate or deactivate the modal
    const [isPasswordModalActive, setPasswordModalActive] = useState(false);

    //Model and functions of 'Change Password'
    const EditPassword = () => {
        const [oldPassw, setOldPass] = useState("");
        const [newPassw, setPassw] = useState("");
        const [checkPassw, setCheckPassw] = useState("");

        const handleSubmit = (event) => {
            //preventing refreshing of page when button clicked;
            event.preventDefault();
    
            handleChangePassword(oldPassw, newPassw, checkPassw);
        }
        
        return(
            <form  onSubmit={handleSubmit} className={`${"profile-edit-password"} ${isPasswordModalActive ? "active" : ""}`}>
                <CgClose onClick={()=> setPasswordModalActive(!isPasswordModalActive)} size={40} style={{position:"absolute", top: "15px", right: "15px", cursor: "pointer"}}></CgClose>
                <div>
                    Old Password:
                    <input value={oldPassw} type="password" onChange={event => setOldPass(event.target.value)} required placeholder="" />
                </div>
                <div>
                    New Password:
                    <input value={newPassw} type="password" onChange={event => setPassw(event.target.value)} required placeholder="" />
                </div>
                <div>
                    New Password Again:
                    <input value={checkPassw} type="password" onChange={event => setCheckPassw(event.target.value)} required placeholder="" />
                </div>
                <input className="change-password-button" value="CHANGE PASSWORD" type="submit"/>
            </form>
        )
    }

    //To select which subpage will be displayed
    const [selected, setSelected] = useState("infos");

    //function to fetch data from api
    const handleGetProfileInfo = async(id) => {
        await axios.get(baseUrl + "/users/" + id, {headers: {"Authorization" : `Bearer ${token}`}})
        .then(res => {
            setProfileData(res.data)
            console.log(res.data)
        })
        .catch(err => navigate("/main"))
    }

    //do it just for once
    useEffect(()=>{
        handleGetProfileInfo(id);
    }, [])

    return(
        profileData != null &&
        <div>
        <Tab/>
        <div alt="LEFT-SIDE" className="profile-main-container">
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
            <div alt="RIGHT-SIDE" className="profile-info">
            { 
                selected == "infos" && <>
                <div className="profile-placeholder">
                    Email: <p>{profileData.email}</p>
                    <div onClick={()=>setPasswordModalActive(!isPasswordModalActive)} className="edit-button">
                                <FaRegEdit size={30}/>
                            </div>
                        </div>
                        <div className="profile-placeholder">
                        Password: <p>{toPassword(profileData.password)}</p>
                            <div onClick={()=>setPasswordModalActive(!isPasswordModalActive)} className="edit-button">
                                <FaRegEdit size={30}/>
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
                selected == "favorites" && <FavoriteGames alt="RIGHT-SIDE"/>
            }
            {
                selected == "addgame" && <AddGame alt="RIGHT-SIDE"/>
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