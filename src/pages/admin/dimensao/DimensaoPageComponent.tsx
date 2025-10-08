import { FC, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TabContentComponent } from "../tab/TabContentComponent.tsx";
import "../css/dimensaoPage.css";
import dimensoes from "../../../utils/const.tsx";

const DimensaoPageComponent: FC = () => {
  const { dimensao } = useParams();
  const [activeTab, setActiveTab] = useState<string>("Dimensão");
  const { dimensoesColumn1, dimensoesColumn2, dimensoesCores12 } =
    dimensoes.GetAllConst();
  const dimensoesColumn12 = {
    ...dimensoesColumn1,
    ...dimensoesColumn2,
  };
  // botão para voltar página
  const navigate = useNavigate();

  function handleBack() {
    navigate("/admin/dimensao");
  }

  return (
    <div className="home-container">
      <div
        style={{
          backgroundColor: `var(--${dimensoesCores12[dimensao!]})`,
        }}
        className="admin-header-dimensao-page"
      >
        <div className="admin-header-dimensao-page-space">
          <div
            style={{
              maskImage: `url(${dimensoesColumn12[dimensao!]})`,
            }}
            className="dimensao-button-header"
          ></div>
          <h1 className="admin-header-dimensao-page">{dimensao}</h1>
        </div>
      </div>

      <div className="admin-tabs-container">
        <nav className="admin-tabs-nav">
          <button
            className={`admin-tab-button ${activeTab === "Dimensão" ? "active" : ""}`}
            onClick={() => setActiveTab("Dimensão")}
          >
            Dimensão
          </button>
          <button
            className={`admin-tab-button ${activeTab === "Indicadores" ? "active" : ""}`}
            onClick={() => setActiveTab("Indicadores")}
          >
            Indicadores
          </button>

          <button
            className={`admin-tab-button ${activeTab === "Referências" ? "active" : ""}`}
            onClick={() => setActiveTab("Referências")}
          >
            Referências
          </button>
          <button
            className={`admin-tab-button ${activeTab === "Artigo" ? "active" : ""}`}
            onClick={() => setActiveTab("Artigo")}
          >
            Artigo
          </button>
        </nav>
        <button className="voltar-button" onClick={() => handleBack()}>
          Voltar
        </button>

        <div className="admin-tab-content">
          <TabContentComponent dimensao={dimensao} activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default DimensaoPageComponent;
