import { FC } from "react";    
import Map from "./kml/map";
import '../css/map.css'

const Home:FC = () => {
    return (
        <div className='container'>
            <Map />
        </div>
    )
}

export default Home