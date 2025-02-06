import { FC } from "react";    
import Map from "./kml/map";
import '../css/map.css'
import Map2 from "./kml/map2";
import Map3 from "./kml/map3";
const Home:FC = () => {
    return (
        <div className='container'>
            <Map />
            <Map2 />
            <Map3 />
        </div>
    )
}

export default Home