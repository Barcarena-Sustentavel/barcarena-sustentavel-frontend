import { FC } from "react";    
//import Map from "./kml/map";
import '../css/map.css'
//import Map2 from "./kml/map2";
//import Map3 from "./kml/map3";
import dimensoes from "./const";
const Home:FC = () => {
    return (
        <div className='container'>
            {dimensoes.map((dimensao) => (
                <div className="map-container">
                    <h2>{dimensao}</h2>
                    </div>
            ))}
        </div>
    )
}

export default Home