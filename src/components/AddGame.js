import axios from "axios";
import { useState } from "react";
import "../styles/AddGame.css";
import Select from 'react-select';
import {RiImageAddFill} from "react-icons/ri";
import {GrTopCorner} from "react-icons/gr"
const options = [
    {value: "1975", label: '1975'}, 
    {value: "1990", label: '1990'},
    {value: "2000", label: '2000'}, 
    {value: "2005", label: '2005'}, 
    {value: "2010", label: '2010'}, 
    {value: "2015", label: '2015'}, 
    {value: "2020", label: '2020'}, 
]
const saveGame = (event)=>{
    event.preventDefault();
}

const AddGame =() => {
    const [imageSelected, setImageSelected] = useState("");
    const [description, setDescription] = useState("");
    const [gamename, setGamename] = useState("");
    const [cost, setCost] = useState("");
    const [imageName, setImageName] = useState("");
    const [dateValue, setDateValue] = useState("");

    const [file, setFile] = useState(null);

    const handleGetDate = (val)=> {
        setDateValue(val);
    }

    async function uploadFile(event){
        event.preventDefault();
        const game = {
            "sellerName": "BerkantGC",
            "games": []
        }
        game.games.push({
            "id": 13,
            "gameName": gamename,
            "gameYear": dateValue,
            "gameDetails": {
                "stock": 1,
                "views": 0,
                "description": description,
                "cost": cost
            }
        }
        )

        const getCircularReplacer = () => {
            const seen = new WeakSet();
            return (key, value) => {
              if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                  return;
                }
                seen.add(value);
              }
              return value;
            };
          };
          
        console.log(game)
        const formData = new FormData();
        formData.append("file", imageSelected);
        axios.post("http://localhost:8080/upload", formData).then(res => {
            console.log(res);
        })
        axios.post("http://localhost:8080/sellers", game).then(res => {
            console.log(res);
        })
        
    }
    console.log(dateValue);
    return(
        <form className="addgame-container" onSubmit={uploadFile}>
            <div className="info-input">
                Name: 
                <input  className="addgame-name" onChange={val=> setGamename(val.target.value)} placeholder="" type="text"></input>
                Description:
                <input  className="addgame-name" onChange={val=> setDescription(val.target.value)} placeholder="" type="text"></input>
                Cost: 
                <input  className="addgame-name" onChange={val=> setCost(val.target.value)} placeholder="" type="number" min={0} ></input>
                Year:
                <Select placeholder="" onChange={(val)=>setDateValue(val.value)} className="select-year" options={options}/>
            </div>
            
            <div className="addgame-upload">
                <input id="fileupload" onChange={(event) => {
                    event.preventDefault();
                    setImageSelected(event.target.files[0]);
                    setFile(URL.createObjectURL(event.target.files[0]));
                    setImageName(event.target.files[0].name);
                }}type="file" className="fileupload" />
                {file != null ?
                <img src={file} width= "525px" height="420px"/> 
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