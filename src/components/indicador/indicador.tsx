import { FC, useEffect, useState } from "react";
import { IndicadorDadosGrafico, DadosGrafico } from "../../interfaces/indicador_interface.tsx";
import { DashboardComponent } from "./dashboard/dashboard.tsx";
import api from "../../api.tsx";
import { useParams } from "react-router-dom";
import NavbarComponent from "../home/navbar/navbar.tsx";
import "../css/indicadorCSS.css";

const IndicadorComponent: FC = () => {
  const { dimensao, indicador } = useParams();
  const url: string = `/dimensoes/${dimensao}/indicador/${indicador}/`;
  const [indicadorJson, setIndicadorJson] = useState<IndicadorDadosGrafico>({
    nome: '',
    graficos: []
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api.get(url)
      .then((response) => {
        setIndicadorJson(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching indicador data:", error);
        setLoading(false);
      });
  }, [url]);

  return (
    <div>
      <NavbarComponent />
      
      <div className="indicador-container">
        <div className="indicador-header">
          <h1>{indicadorJson.nome}</h1>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando dados...</p>
          </div>
        ) : (
          <div className="graficos-container">
            {indicadorJson.graficos.length > 0 ? (
              indicadorJson.graficos.map((grafico: DadosGrafico, index) => (
                <div className="grafico-card" key={index}>
                  <div className="grafico-content">
                    <div className="dashboard-container">
                      <DashboardComponent 
                        tipoGrafico={grafico.tipoGrafico} 
                        dados={grafico.dados} 
                        tituloGrafico={grafico.tituloGrafico} 
                        categorias={grafico.categoria}
                      />
                    </div>
                    {grafico.descricaoGrafico && (
                      <div className="grafico-description">
                        <p>{grafico.descricaoGrafico}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">
                <h3>Nenhum gráfico disponível para este indicador</h3>
                <p>Novos dados serão adicionados em breve.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IndicadorComponent;
