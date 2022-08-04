import axios from "axios";
import { useEffect, useState } from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import {FcBusinessman} from "react-icons/fc";
import {BiLira} from "react-icons/bi";
import "../styles/Profile.css";

import Tab from "../components/Tab";


const baseUrl = "http://localhost:8080";

const toPassword = (password) => {
    let newPassword = [];
    for(let i = 0; i<password.length; i++){
       newPassword[i] = "."
    }
    console.log(newPassword.join(""));
    return newPassword.join(" ");
}

function Profile(){
    const {id} = useParams();
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();
    const token = useSelector(sel => sel.userToken)

    const handleGetProfileInfo = async(id) => {
        await axios.get(baseUrl + "/users/" + id, {headers: {"Authorization" : `Bearer ${token}`}})
        .then(res => setProfileData(res.data))
        .catch(err => console.error(err))
    }

    const handleLogout = async() =>{
        await axios.post("http://localhost:8080/logout")
        .then(res=>{
            navigate("/main");
        });
      }

    useEffect(()=>{
        handleGetProfileInfo(id);
    }, [])

    console.log(profileData)
    return(
        profileData != null &&
        <div>
        <Tab/>
        <div className="profile-main-container">
            <div className="profile-picture">
                <div className="icon-base">
                <FcBusinessman size={200}></FcBusinessman>
                </div>
                <div>
                <h1>{id.toLocaleUpperCase()}<br></br>0.00<BiLira/></h1>
                <form  onClick={handleLogout}>
                    <input className='profile-logout' type='submit' value = "Logout"/>
                </form>
                </div>
            </div>
            <div className="profile-info">
                <div className="profile-placeholder">
                Email: <p>{profileData.email}</p>
                </div>
                <div className="profile-placeholder">
                Password: <p>{toPassword(profileData.password)}</p>
                </div>
            </div>
        </div>
        </div>
    );
}
export default Profile;