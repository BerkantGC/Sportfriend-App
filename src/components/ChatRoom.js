import React, { useEffect } from "react";
import { useState } from "react";
import {over} from "stompjs";
import SockJS from "sockjs-client";
import {FiSend} from "react-icons/fi"
import "../styles/ChatRoom.scss";

var stompClient =null;
const ChatRoom = () => {
    const username = localStorage.getItem("@username");
    const [userData, setUserData] = useState({
        username: username,
        recieverName: "CHATROOM",
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
    useEffect(()=> {
        const connect = () => {
            let Sock = new SockJS("http://localhost:8080/ws");
            stompClient = over(Sock);
             stompClient.connect({}, onConnected, onError)
         }
         connect();
    }, [])
    

    const sendPublicMessage=(event)=>{
        event.preventDefault();
        if(userData.message.length !== 0){
            if(stompClient){
                let chatMessage ={
                senderName: userData.username,
                receiverName: userData.recieverName,
                message: userData.message,
                messageStatus: "MESSAGE"
                };
                stompClient.send('/app/message', {}, JSON.stringify(chatMessage))
                setUserData({...userData, "message": ""})
            }
        }
    }

    
    const onConnected=()=>{
        stompClient.subscribe("/chatroom/public", onPublicMessageRecieved);
    }
    console.log(userData.message.length)
    function onPublicMessageRecieved(payload){
        let payloadData = JSON.parse(payload.body);
       
        switch(payloadData.messageStatus){
            case "MESSAGE":
                publicChats.push(payloadData)
                setPublicChats([...publicChats]);
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
    const imageUrl = "http://localhost:8080/images/sad.png"
    console.log(publicChats.length)
    return(
        <div >
            <div className="chatroom"> 
                <div className="exist-messages">
                    {publicChats.map((chat,index)=> (
                        chat.senderName ===userData.username ?
                        <li className="self-message-container" key={index}>
                            <div className="avatar-self"><div className="message-data">{chat.message}</div></div>
                        </li>
                        :
                        <li className="message-container" key={index}>
                            <div className="avatar">{chat.senderName}<div className="message-data">{chat.message}</div></div>
                        </li>
                    ))}
                </div>
            </div>
            <div className="send-message">
                <form onSubmit={sendPublicMessage}>
                    <input type="text" className="display-message" placeholder="Enter message..." onChange={handleMessage} value={userData.message}/>
                    <FiSend size={30} className="send-btn" type="submit" onClick={sendPublicMessage}/>
                </form>
            </div>
        </div>
    )
}

export default ChatRoom;