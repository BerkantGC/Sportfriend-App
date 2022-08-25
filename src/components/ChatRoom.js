import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {over} from "stompjs";
import SockJS from "sockjs-client";
import {FiSend} from "react-icons/fi"
import "../styles/ChatRoom.scss";
import moment from "moment";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Tab from "./Tab";

var stompClient =null;
const baseUrl = "http://localhost:8080/"

const ChatRoom = () => {
    const navigate = useNavigate();
    //define token from localstorage
    const token = localStorage.getItem("@token")
    const username = localStorage.getItem("@username");
    const [userData, setUserData] = useState({
        username: username,
        receiverName: "CHATROOM",
        connected: true,
        message:""
    })
    const [publicChats, setPublicChats] = useState([])

    //const [privateChats, setPrivateChats] = useState(new Map());
    const handleMessage = (event) => {
        const {value} = event.target;
        setUserData({...userData, "message": value})
    }
    const onError = () => {

    }
    
    const messageFromDatabase = async() => {
        await axios.get(baseUrl + "message-data/CHATROOM", {headers: {"Authorization" : `Bearer ${token}`}})
            .then(res => setPublicChats(res.data))
    }
    useEffect(()=> {
        const connect = () => {
            let Sock = new SockJS("http://localhost:8080/ws");
            stompClient = over(Sock);
            stompClient.connect({}, onConnected, onError)
         }
         messageFromDatabase();
         connect();
    }, [])

    const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    if(messagesEndRef.current)
    messagesEndRef.current?.scrollIntoView()
  }

    useEffect(()=> {
        scrollToBottom();
    });
    const sendPublicMessage=(event)=>{
        event.preventDefault();
        const date = new Date();
        console.log(moment(date.toUTCString()).fromNow());
        if(userData.message.length !== 0){
            if(stompClient){
                let chatMessage ={
                senderName: userData.username,
                receiverName: userData.receiverName,
                message: userData.message,
                messageStatus: "MESSAGE",
                date: date.toUTCString()
                };
                messageToDatabase(chatMessage);
                stompClient.send('/app/message', {}, JSON.stringify(chatMessage))
                
                setUserData({...userData, "message": ""})
            }
        }
    }

    const messageToDatabase = async(data) => {
        await axios.post(baseUrl + "message-data", {
            "senderName": username,
            "receiverName": 'CHATROOM',
            "message": data.message,
            "date": data.date
        }, {headers: {"Authorization" : `Bearer ${token}`}})
    }
    const onConnected=()=>{
        console.log(publicChats);

        stompClient.subscribe("/chatroom/public", onPublicMessageRecieved);
    }

    function onPublicMessageRecieved(payload){
        let payloadData = JSON.parse(payload.body);
        switch(payloadData.messageStatus){
            case "MESSAGE":
                messageFromDatabase();
                let array = [...publicChats];
                array.push(payloadData);
                setPublicChats(array);
                break;
        }
        
    }
    /*function onPrivateMessageRecieved(payload){
        let payloadData=JSON.parse(payload);
        if(privateChats.get(payload.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        }else{
            let list = [];
            list.push(payloadData);

            privateChats.get(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }*/
    const colorArr = ['#278EFF', 'green', 'red']
    let color = colorArr[Math.floor(Math.random()*colorArr.length)];

    const imageUrl = "http://localhost:8080/images/sad.png"
    return(
        <div className="chatroom-container">
            <Tab/>
            <div className="chatroom-vertical-center">
            <div className="chatroom"> 
                <div className="exist-messages">
                    {publicChats.map((chat,index)=> (
                        chat.senderName ===username ?
                        <div className="self-message-container" key={index}>
                            <div className="avatar-self">
                                <div className="message-data">{chat.message}</div>
                                </div>
                        </div>
                        :
                        <div className="message-container" key={index}>
                            {
                            <div className="avatar" style={{color: colorArr[0]}}>{chat.senderName}<div className="message-data">{chat.message}</div></div>
                            }
                        </div>
                    ))}
                    <div ref={messagesEndRef}></div>
                </div>
            </div>
            <div className="send-message">
                <form onSubmit={sendPublicMessage}>
                    <input type="text" className="display-message" placeholder="Send Message..." onChange={handleMessage} value={userData.message}/>
                    <FiSend size={30} className="send-btn" type="submit" onClick={sendPublicMessage}/>
                </form>
            </div>
            </div>
        </div>
    )
}

export default ChatRoom;