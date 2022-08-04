import {useParams} from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Detail.css";
import {HiCheck, HiX} from "react-icons/hi";

import Tab from "../components/Tab";

const baseUrl = "http://localhost:8080/"

export default function Details(){
    const {id} = useParams();

    const [data, setData] = useState(null);

    const getDetail = async() => {
        await axios.get(baseUrl + "game-details/" + id).then(res=>
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
        <div>
            <Tab/>
            <section className="detail-container" id="detail-container">
                <div className="detail-image-container" id="detail-image-container">
                    <img className="detail-image" id="detail-image" src={Object.values(data.game)[4]} ></img>
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
                        Views: &nbsp;<b>{data.views}</b>
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
                    <div>Store Info</div>
                    <div className="detail-cost2">
                            <p className="detail-stock">
                            <b>Stock:&nbsp;&nbsp;</b>
                                {
                                data.stock == true ?  <HiCheck size={25}/> :  <HiX/>
                                }
                            </p>
                        <div >
                            <h1>{data.cost}₺</h1>
                        </div>
                        <div>Safe</div>
                        <div>
                            <button className="pursch-btn">
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}