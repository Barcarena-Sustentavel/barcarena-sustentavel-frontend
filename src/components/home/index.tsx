import { FC } from "react";
import { useNavigate } from "react-router-dom";    
import '../../css/index.css';
import NavbarComponent from "./navbar/navbar.tsx";
import ImageCarousel from "./carousel/carousel.tsx";
import DimensoesSection from "./dimensoesSection/dimensoesSection.tsx";

const Home: FC = () => {
    const navigate = useNavigate();
    const handleClick = (dimensao: string) => {
        navigate(`/${dimensao}/`);
    }

    return (
        <div className="home-container">
            <NavbarComponent />
            <ImageCarousel />
            <div className="hero-section">

            </div>
            {/*<div className="dimensoes-grid">*/}
                <DimensoesSection />
                {/*dimensoes.map((dimensao) => (
                    <div className="dimensao-card" key={dimensao}>
                        <button 
                            className="dimensao-button" 
                            onClick={() => handleClick(dimensao)}
                        >
                            <div className="dimensao-icon">
                                
                            </div>
                            <h3>{dimensao}</h3>
                        </button>
                    </div>
                ))*/}
            {/*</div>*/}
        </div>
    );
}

export default Home;
