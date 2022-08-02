import { useState } from "react";
import "../styles/Login.css"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8080/"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const token = useSelector(sel => sel.userToken);
    const dispatch = useDispatch();

    const navigation = useNavigate();

    const HandleLogin = async() => {
        const user = {
            "username": username,
            "password": password
        };
        
        await axios.post(baseUrl + "login", user)
            .then((response)=>{
                dispatch({type: "USER_ADD", payload: {token: response.data, username: username}})
                navigation(`/details`);
            })
            .catch((response) => {
                alert("There is no such that(" + username + ") user")
                dispatch({type: "USER_ADD", payload: null})
            })
    
        console.log(token);
    }

    
    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log("submittion began!");
        console.log('username 👉️', username);
        console.log('password 👉️', password);

        HandleLogin(username, password);
    }

    return (
        <div className="login-page"> 
            <div className="form-object">
                <label className="title">LOGIN PAGE</label>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="text" onChange={event => setUsername(event.target.value)}  required placeholder="Username..."></input>
                    <input type="password" onChange={event => setPassword(event.target.value)}  required placeholder="Password..."/>
                    <button type="submit">LOGIN</button>
                </form>
                <a className="already-have" href="/register">Create account</a>
            </div>
        </div>        
    )
}

export default Login;