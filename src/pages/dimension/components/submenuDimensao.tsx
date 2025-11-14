import React,{useState} from "react";
import "./submenu-dimensao.css";
import dimensoes from "../../../utils/const.tsx"; // Ajuste o caminho conforme necessário
import { useLocation } from "react-router-dom";
import { getArtigoDimensao } from "../../admin/create/artigo/crudArtigo.tsx";
import { color } from "highcharts";
interface SubmenuDimensaoProps {
  dimensaoAtiva: string;
}

const SubmenuDimensao: React.FC<SubmenuDimensaoProps> = ({ dimensaoAtiva }) => {
  const location = useLocation();
  const activeDimensionFromPath = decodeURIComponent(
    location.pathname.split("/")[1],
  );
  const [isOpen, setIsOpen] = useState(false);
  const {
    dimensoesColumn1,
    dimensoesColumn2,
    dimensoesColumn3,
    dimensoesCores123,
    dimensaoAumentaIcone,
  } = dimensoes.GetAllConst();
  const todasDimensoes = { ...dimensoesColumn1, ...dimensoesColumn2, ...dimensoesColumn3 };

  function ajustarFonteTitulo(dimensaoAtiva: string){
    const tamanhoString = dimensaoAtiva.length;

    if(tamanhoString < 20){
      return "40px";
    }
    else if(tamanhoString < 30){
      return "30px";
    }

    return "20px";
  }

  return (
    <div
      className="submenu-dimensao d-flex flex-column align-items-center"
      style={{
        backgroundColor: `var(--${dimensoesCores123[dimensaoAtiva || activeDimensionFromPath] || "default-color"})`,
      }}
      >
      <div id="mostrarDimensoes" className="cards-row flex-row justify-content-center flex-wrap">
        {Object.entries(todasDimensoes).map(([nomeDimensao, icon]) => {
          const isAtiva =
            nomeDimensao === (dimensaoAtiva || activeDimensionFromPath);
          //const cor = dimensoes.dimensaoCores[nomeDimensao] || 'default-color';
          const cor = dimensoesCores123[nomeDimensao] || "default-color";
          //const aumentaIcone = dimensoes.dimensaoAumentaIcone[nomeDimensao] || false;
          const aumentaIcone = dimensaoAumentaIcone[nomeDimensao] || false;

          return (
            <a
              key={nomeDimensao}
              className={`submenu-dimensao-item m-2 p-3 d-flex flex-column justify-content-between align-items-center ${
                isAtiva ? "selected" : ""
              }`}
              href={`/${nomeDimensao}`}
              style={{
                backgroundColor: `var(--${cor})`,
                color: "#fff",
              }}
            >
              <div
                className={`icon-color-submenu-dimensao ${aumentaIcone ? "increase" : ""}`}
                style={{
                  maskImage: `url(${icon})`,
                  WebkitMaskImage: `url(${icon})`,
                  backgroundColor: "white",
                }}
              />
              <p className="label-dimensao">{nomeDimensao}</p>
            </a>
          );
        })}
      </div>
      <div id="dropDownSubmenuDimensao">
        <button 
        className="dropdown-button-subdimensao" 
        onClick={() => setIsOpen(!isOpen)}
        >
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}><h2>Mudar de Dimensão</h2>▼</span>
        </button>
        {isOpen && Object.entries(todasDimensoes).map(([nomeDimensao, icon]) => {
          const isAtiva =
            nomeDimensao === (dimensaoAtiva || activeDimensionFromPath);
          //const cor = dimensoes.dimensaoCores[nomeDimensao] || 'default-color';
          const cor = dimensoesCores123[nomeDimensao] || "default-color";
          //const aumentaIcone = dimensoes.dimensaoAumentaIcone[nomeDimensao] || false;
          const aumentaIcone = dimensaoAumentaIcone[nomeDimensao] || false;

          return (
            <a
              key={nomeDimensao}
              className={`submenu-dimensao-item m-2 p-3 d-flex flex-column justify-content-between align-items-center ${
                isAtiva ? "selected" : ""
              }`}
              href={`/${nomeDimensao}`}
              style={{
                backgroundColor: `var(--${cor})`,
                color: "#fff",
              }}
            >
              <div
                className={`icon-color-submenu-dimensao ${aumentaIcone ? "increase" : ""}`}
                style={{
                  maskImage: `url(${icon})`,
                  WebkitMaskImage: `url(${icon})`,
                  backgroundColor: "white",
                }}
              />
              <p className="label-dimensao">{nomeDimensao}</p>
            </a>
          );
        })}
      </div>
      <div className="label d-flex flex-row align-items-center pt-3 pb-3">
        <div
          className={`label-icon-dimensao icon-color-submenu-dimensao ${
            /*dimensoes.*/ dimensaoAumentaIcone[
              dimensaoAtiva || activeDimensionFromPath
            ]
              ? "increase"
              : ""
          }`}
          style={{
            maskImage: `url(${todasDimensoes[dimensaoAtiva || activeDimensionFromPath]})`,
            WebkitMaskImage: `url(${todasDimensoes[dimensaoAtiva || activeDimensionFromPath]})`,
            backgroundColor: "white",
          }}
        />
        <div className="align-items-center tituloDimensao">
          <p className="label-dimensao ml-5" /*style={{ fontSize: ajustarFonteTitulo(dimensaoAtiva)}}*/>
            {dimensaoAtiva || activeDimensionFromPath}
          </p>
          <button
            className="btn btn-primary botao-download-resumo"
            onClick={() =>
              getArtigoDimensao(dimensaoAtiva || activeDimensionFromPath)
            }
          >
          <p style={{color:"white"}}>Resumo da dimensão</p> <i className="bi bi-download"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmenuDimensao;
