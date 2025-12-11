import { FC } from "react";
import { useNavigate } from "react-router-dom";
import "@assets/styles/index.css";
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import Footer from "../../components/layout/footer/footer.tsx";
import emConstrucao from '../../assets/images/icons/emConstrucao.svg' 
//import IBS from "@assets/images/about/21.12.2022---conexoes-sustentaveis.jpg";
//import image_piramide from "@assets/images/about/piramide.png";
//import image_mandala from "@assets/images/about/mandala_odsb-1.png";
//import "./about.css";

const Colaboradores: FC = () => {
  const paginaInicial = '/'
  const navigate = useNavigate()
  const handleNavigate = (e:any) => {
    e.preventDefault()
    navigate('/')}

  return (
    <div className="home-container">
      <NavbarComponent />
      <main>
        <div style={{backgroundColor:'white', display:'flex', alignItems: 'center'}}>
          <div style={{textAlign:'center'}}>
            <h1 style={{width:'60%', margin:'0 auto', textAlign:'center'}}>Página em Construção</h1>
            <p style={{width:'60%', margin:'0 auto'}}>No momento está página se encontra em produção, estamos trabalhando para entregar o melhor possível</p>
            <button onClick={(e:any) => handleNavigate(e)} style={{marginTop: '10px', borderStyle:'solid', backgroundColor:'var(--primary-blue)', borderRadius:'8px'}}>Página inicial</button>
          </div>
          <div> <img src={emConstrucao} alt="" /></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Colaboradores;
