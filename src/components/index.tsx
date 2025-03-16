import { FC } from "react";
import { useNavigate } from "react-router-dom";    
//import Map from "./kml/map";
import '../css/map.css'
//import Map2 from "./kml/map2";
//import Map3 from "./kml/map3";
import dimensoes from "./const";
const Home:FC = () => {

    const navigate = useNavigate();
    const handleClick = (dimensao:string) => {
        navigate(`/${dimensao}/`)
    }
    return (
        <div className='container'>
                <div className="map-container">
            <ul>
            {dimensoes.map((dimensao) => (
                <li>
                    <button onClick={() => handleClick(dimensao)}>{dimensao}</button>
                </li>        
                    
            ))}
            </ul>
            </div>
        </div>
    )
}

export default Home