import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();


    const handleRegister = async(email, username, password) => {
        const userToRegister= {
            "email": email,
            "username": username,
            "password": password,
            "blocked": 0,
            "roles": [
                {
                    "roleName": "USER"
                }
            ]
        }
    
        await axios.post("http://localhost:8080/register", userToRegister)
        .then(res => console.log(userToRegister)
        )
        .catch(err=> console.log("Failed"))
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submittion began!");
        console.log('username 👉️', username);
        console.log('password 👉️', password);
        console.log('email 👉️', email);

        if(password !== checkPassword)
        return null;

        handleRegister(email, username, password);
    }

return (
    <div className="login-page"> 
        <div className="form-object">
            <label className="title">REGISTER PAGE</label>
            <form className="login-form" onSubmit={handleSubmit}>
                <input type="email" onChange={event => setEmail(event.target.value)} value={email} placeholder="Email"/>
                <input type="text" onChange={event => setUsername(event.target.value)}  value={username} required placeholder="Username..."></input>
                <input type="password" onChange={event => setPassword(event.target.value)} value={password} required placeholder="Password..."/>
                <input type="password" onChange={event => setCheckPassword(event.target.value)} value={checkPassword} required placeholder="Verify Password..."/>
                <button type="submit">LOGIN</button>
            </form>
            <a className="already-have" href="/login">Already have an account?</a>
        </div>
    </div>        
)
}

export default Register;
