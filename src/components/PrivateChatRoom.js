import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {over} from "stompjs";
import SockJS from "sockjs-client";

import {FiSend} from "react-icons/fi"
import "../styles/ChatRoom.scss";
import moment from "moment";
import axios from "axios";
var stompClient =null;

const baseUrl = "http://localhost:8080/"

const PrivateChatRoom = ({receiverName}) => {
    //define token from localstorage
    const token = localStorage.getItem("@token")
    const username = localStorage.getItem("@username");
    const [userData, setUserData] = useState({
        username: username,
        receiverName: receiverName,
        connected: true,
        message:""
    })
    const [privateChats, setPrivateChats] = useState([]);

    const handleMessage = (event) => {
        const {value} = event.target;
        setUserData({...userData, "message": value})
    }
    const onError = () => {

    }
    
    const messageFromDatabase = async() => {
        await axios.get(baseUrl + "message-data/" + receiverName, {headers: {"Authorization" : `Bearer ${token}`}})
            .then(res => {
                console.log("fetch: " + res.data)
                setPrivateChats(res.data)
            })
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

  const messageToDatabase = async(data) => {
    await axios.post(baseUrl + "message-data", {
        "senderName": username,
        "receiverName": receiverName,
        "message": data.message,
        "date": data.date
    }, {headers: {"Authorization" : `Bearer ${token}`}})
}

    useEffect(()=> {
        scrollToBottom();
    });
    const sendPrivateMessage=(event)=>{
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
                privateChats.push(chatMessage);
                setPrivateChats([...privateChats])
                messageToDatabase(chatMessage);
                stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage))
                
                setUserData({...userData, "message": ""})
            }
        }
    }

    const onConnected=()=>{
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessageReceived);
    }

    function onPrivateMessageReceived(payload){
        let payloadData = JSON.parse(payload.body);
        switch(payloadData.messageStatus){
            case "MESSAGE":
                console.log("gelen: " + payloadData.senderName + "zaten: " + username)
                if(payloadData.receiverName == username && payloadData.senderName === receiverName)
                {
                    messageFromDatabase();
                    privateChats.push(payloadData);
                }
                setPrivateChats([...privateChats])
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
    return(
        <div >
            <div className="chatroom"> 
                <div className="exist-messages">
                    {privateChats.map((chat,index)=> (
                        chat.senderName ===userData.username ?
                        <div className="self-message-container" key={index}>
                            <div className="avatar-self">
                                <div className="message-data">{chat.message}</div>
                                </div>
                        </div>
                        :
                        <div className="message-container" key={index}>
                            <div className="avatar"><div className="message-data">{chat.message}</div></div>
                        </div>
                    ))}
                    <div ref={messagesEndRef}></div>
                </div>
            </div>
            <div className="send-message">
                <form onSubmit={sendPrivateMessage}>
                    <input type="text" className="display-message" placeholder="Enter message..." onChange={handleMessage} value={userData.message}/>
                    <FiSend size={30} className="send-btn" type="submit" onClick={sendPrivateMessage}/>
                </form>
            </div>
        </div>
    )
}

export default PrivateChatRoom;