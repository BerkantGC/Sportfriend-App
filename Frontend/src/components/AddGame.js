import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/AddGame.css";
import Select from 'react-select';
import {RiImageAddFill} from "react-icons/ri";
//DONE!

const options = [
    {value: "1975", label: '1975'}
]

function hasSeller(username, sellers){
    const arr = sellers.split(',');
    console.log(arr[6] + " " +username)

    for(let i= 0; i < arr.length; i++){
        if(arr[i] === username)
        {        
            return true;
        }    
    }
    return false;
}

const AddGame =() => {
    const [imageSelected, setImageSelected] = useState("");
    const [description, setDescription] = useState("");
    const [gamename, setGamename] = useState("");
    const [cost, setCost] = useState("");
    const [imageName, setImageName] = useState("");
    const [dateValue, setDateValue] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [process, setProcess] = useState(1);

    const [file, setFile] = useState(null);

    useEffect(()=> {
        for(let i = 1976; i<= 2022; i++){
            options.push({value: i, label: i})
         }
    }, [])

    console.log(imageName)

    const username = localStorage.getItem("@username");
    const sellers = localStorage.getItem("@sellers");

    async function uploadFile(event){
        event.preventDefault();

        let videoId = youtubeUrl.slice(youtubeUrl.indexOf("watch?v=") + 8, youtubeUrl.length);
        let youtubeEmbed = "https://www.youtube.com/embed/" + videoId;
        const game = {
            "sellerName": username,
            "games": [{
                "gameName": gamename,
                "gameYear": dateValue,
                "imageUrl": imageName,
                "gameDetails": {
                    "stock": 1,
                    "views": 0,
                    "description": description,
                    "cost": cost,
                    "youtubeTrailer": youtubeEmbed
                }
            }]
        }
        const formData = new FormData();
        formData.append("file", imageSelected)
        console.log(formData.getAll("file"))
        console.log(game);

        await axios.post("http://localhost:8080/upload", formData).then(res=>{
            console.log(res);
        })

        if(hasSeller(username, sellers))
        {
            axios.put("http://localhost:8080/sellers", game)
            .then(res => {
                alert("Game successfully has been added!\nInfo: "+ res.data)
            })
            .catch(err=> alert("Game adding has failed please try again\nError: " + err))
        }
        else{
            axios.post("http://localhost:8080/sellers", game).then(res => {
                alert("Game successfully has been added!\nInfo: "+ res)
            })
            .catch(err=> alert("Game adding has failed please try again\nError: " + err))
        }
    }
    return(
        <form className="addgame-container" onSubmit={uploadFile}>
            <div className="info-input">
                <progress  value={process} max={5}>60%</progress>
                Name: 
                <input  className="addgame-name" onChange={val=> setGamename(val.target.value)} placeholder="" type="text"></input>
                Description:
                <input  className="addgame-name" onChange={val=> setDescription(val.target.value)} placeholder="" type="text"></input>
                Number of players: 
                <input  className="addgame-name" onChange={val=> setCost(val.target.value)} placeholder="" type="number" min={0} ></input>
                Year:
                <Select placeholder="" className="select-year" onChange={(val)=>setDateValue(val.value)} theme={(theme) => ({
                ...theme,
                colors: {
                    neutral20: "transparent",
                    neutral0: "#111318",
                    primary: 'rgb(194, 194, 241)',
                    neutral80: 'white',
                },
                })}  options={options}/>
                Youtube URL:
                <input placeholder="" onChange={val=>setYoutubeUrl(val.target.value)} className="addgame-name" type="text"/>
            </div>
            
            <div className="addgame-upload">
                <input id="fileupload" onChange={(event) => {
                    event.preventDefault();
                    setImageSelected(event.target.files[0]);
                    setImageName(event.target.files[0].name);
                    setFile(URL.createObjectURL(event.target.files[0]));
                    setProcess(process+1);
                }}type="file" className="fileupload" />
                {file != null ?
                <img src={file} alt="display-img" width= "525px" height="420px"/> 
                :
                <div>
                    <RiImageAddFill size={100}/>
                    <h1>Upload  Image</h1>
                </div>}
            </div>
            <button type="submit" id="upload-button" >Upload</button>
        </form>
    )
}

export default AddGame;