import { useEffect, useRef } from "react";
import "./banner.css"
import { useBannerCanvas } from "./useBannerCanvas.tsx";

const Banner: React.FC = () => {
    const canvasRef = useBannerCanvas();
    
    /*
    useEffect(() => {
        
    }, []);*/

  return (
    <section className="hero" id="inicio">
      <canvas id="heroCanvas" ref={canvasRef}></canvas>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-tag">📍 Barcarena, Pará — Amazônia</div>

        <h1>
          Observatório do<br />
          <em>Desenvolvimento Sustentável</em><br />
          de Barcarena
        </h1>

        <p className="hero-sub">
          Análises estatísticas dos principais indicadores do desenvolvimento
          sustentável para uma tomada de decisão mais qualificada.
        </p>

        <div className="hero-btns">
          <a href="#dimensoes" className="btn-prim">Explorar Indicadores</a>
          <a href="/about/" className="btn-out">Saiba Mais →</a>
        </div>
      </div>

      <div className="scroll-hint">
        <span>Rolar</span>
        <svg viewBox="0 0 24 24">
          <path d="M12 16l-6-6h12z" />
        </svg>
      </div>
    </section>
  );
};

export default Banner;