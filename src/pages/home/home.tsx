import { FC } from "react";
import { useNavigate } from "react-router-dom";    
import '@assets/styles/index.css';
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import ImageCarousel from "./components/carousel/carousel.tsx";
import DimensoesSection from "./components/dimensoesSection/dimensoesSection.tsx";
import Footer from "../../components/layout/footer/footer.tsx";
import Map3 from "../kml/map3.tsx";

const Home: FC = () => {
    const navigate = useNavigate();
    const handleClick = (dimensao: string) => {
        navigate(`/${dimensao}/`);
    }

    return (
        <div className="home-container">
            <NavbarComponent />
            <ImageCarousel />
            <DimensoesSection />
            <Map3 />
            <Footer/>
        </div>
    );
}

export default Home;
