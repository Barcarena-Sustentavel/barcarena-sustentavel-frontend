import { FC } from "react";
import { useNavigate } from "react-router-dom";    
import '../../css/index.css';
import dimensoes from "../const.tsx";
import NavbarComponent from "./navbar/navbar.tsx";

const Home: FC = () => {
    const navigate = useNavigate();
    const handleClick = (dimensao: string) => {
        navigate(`/${dimensao}/`);
    }

    return (
        <div className="home-container">
            <NavbarComponent />
            <div className="hero-section">
                <p>Selecione uma dimensão para explorar</p>
            </div>
            
            <div className="dimensoes-grid">
                {dimensoes.map((dimensao) => (
                    <div className="dimensao-card" key={dimensao}>
                        <button 
                            className="dimensao-button" 
                            onClick={() => handleClick(dimensao)}
                        >
                            <div className="dimensao-icon">
                                {/* You can add icons for each dimension here if needed */}
                            </div>
                            <h3>{dimensao}</h3>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
