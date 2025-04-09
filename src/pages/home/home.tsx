import { FC } from "react";
import { useNavigate } from "react-router-dom";    
import '@assets/styles/index.css';
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import ImageCarousel from "./components/carousel/carousel.tsx";
import DimensoesSection from "./components/dimensoesSection/dimensoesSection.tsx";
import Footer from "../../components/layout/footer/footer.tsx";

const Home: FC = () => {
    const navigate = useNavigate();
    const handleClick = (dimensao: string) => {
        navigate(`/${dimensao}/`);
    }

    return (
        <div className="home-container">
            <NavbarComponent />
            <ImageCarousel />
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
            <Footer/>
        </div>
    );
}

export default Home;
