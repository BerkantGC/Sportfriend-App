import {useNavigate, useParams} from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Detail.css";
import {HiCheck, HiX} from "react-icons/hi";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {BiLira, BiStar} from "react-icons/bi";


import Tab from "../components/Tab";

const baseUrl = "http://localhost:8080/"

const AddFavorite = (props) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const token = localStorage.getItem("@token");
    const username =localStorage.getItem("@username");
    const game = {
        "username": username,
        "favorites": {
            "favoriteGames": [
                {
                    "gameName": props.gameName 
                }
            ]
        }
    };
    console.log(token)
    console.log(game);

    function add(){
        if(token != null)
        {
            axios.put(baseUrl + "add_favorite/", game, {headers: {"Authorization" : `Bearer ${token}`}})
            .then(res =>{ 
                alert("Added to your favorites");
                setIsFavorite(true);
            })
            .catch(err => alert(err));
        }
        else{
            props.navigate("/login");
        }
    }
    return(
    <div className="detail-cost-container">
        <h1>Store Info</h1>
        {
            isFavorite ? <AiFillStar onClick={add} size={80}/> : <AiOutlineStar onClick={add} size={80}/>
        }
        <div>
            Add Favorite
        </div>
    </div>);
}
const Image = ({url}) => {
    const imageUrl = baseUrl+ "images/"+ url.imageUrl;
    return <img className="detail-image" id="detail-image" width="1920px" height="1080px" loading="lazy" src={imageUrl}></img>
}

export default function Details(){
    const {id} = useParams();

    const [data, setData] = useState(null);

    const navigate = useNavigate();
    //Burada kaldım!
    const getDetail = async() => {
        await axios.get(baseUrl + "sport-details/" + id).then(res=>
            {
                setData(res.data)
                console.log(res.data);
            })
            .catch(err => console.error(err))
    }

    useEffect(()=> {
        getDetail();
    }, [])
    return(
        data == null ? null 
        :
        <div className="detail-main-container">
            <Tab navigate={navigate}/>
            <section className="detail-container" id="detail-container">
                <div className="detail-image-container" id="detail-image-container">
                    <Image url={data}></Image>
                </div>
                <div className="detail-info" id="detail-info">
                    <div>
                        <h1 className="detail-title">{data.gameName}</h1>
                        <p className="detail-description"><b>Description:</b></p>
                        <p className="detail-description">{data.description}</p>
                    </div>
                    <div className="detail-views">
                        <div className="view-container">
                            <p>
                            Product Id: &nbsp;<b>#{data.id}</b>
                            </p>
                        </div>
                        <div className="view-container">
                            <p>
                            Views: &nbsp;{data.views<500 ? <b>{data.views}</b> : <b>500+</b>}
                            </p>
                        </div>
                        <div className="view-container">
                            <p>
                            Year: &nbsp;<b>{data.year}</b>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="detail-cost">
                    <AddFavorite gameName = {data.gameName} navigate = {navigate}/>
                    <div className="detail-cost2">
                            <p className="detail-stock">
                            <b>Stock:&nbsp;&nbsp;</b>
                                {
                                data.stock == true ?  <HiCheck size={25}/> :  <HiX/>
                                }
                            </p>
                        <div >
                            <h1>{data.cost}<BiStar size={20}/></h1>
                        </div>
                        <div>Safe</div>
                        <div>
                            <button className="pursch-btn">
                                Rezervation
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <div className="youtube-video">
                <h1>Sport's Trailer</h1> 
                <iframe width="75%" height={1430*9/16} title={data.gameName}
                src={data.youtubeTrailer}>
                </iframe> 
            </div>
        </div>
    )
}