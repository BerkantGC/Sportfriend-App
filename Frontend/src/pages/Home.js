import {
    useParams
} from "react-router-dom";

export default function Home(props){
    const {id} = useParams();
    return(
        <div>
            <h1>Welcome {id}</h1>
        </div>
    )
}