import { FC, useEffect, useState } from "react"; 
import {
  IndicadorDadosGrafico,
  DadosGrafico,
} from "../../interfaces/indicador_interface.tsx";
import { DashboardComponent } from "./dashboard/dashboard.tsx";
import api from "../../api.tsx";
import { useParams } from "react-router-dom";
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import "./indicador.css";
import Footer from "../../components/layout/footer/footer.tsx";
import BackButton from "../../components/layout/backButton/backButton.tsx";
import Location from "../../components/layout/location/location.tsx";

const IndicadorComponent: FC = () => {
  const { dimensao, indicador } = useParams();
  const url: string = `/dimensoes/${dimensao}/indicador/${indicador}/`;
  
  const [indicadorJson, setIndicadorJson] = useState<IndicadorDadosGrafico>({
    nome: "",
    graficos: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .get(url)
      .then((response) => {
        console.log(response.request);
        setIndicadorJson( (prev) => {
          const responseData = response.data;
          return responseData.graficos.sort((a: any, b: any) => a.posicao - b.posicao);
        });
        setIndicadorJson(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching indicador data:", error);
        setLoading(false);
      });
  }, [url]);

  const handleDownloadCSV = (grafico: DadosGrafico) => {
    let csvContent = grafico.colunas.join(",") + "\n";
    csvContent = "Ano," + csvContent;
    let categoria;
    let row = "";

    //Adicionando outras linhas com os dados do gráfico
    //fix: agora os dados da tabela são transpostos para o csv de maneira correta
    grafico.dados[0].forEach((row, rowIndex) => {
      categoria = grafico.categoria[rowIndex];
      csvContent += categoria;

      for(let columnIndex = 0; columnIndex <  grafico.dados.length; columnIndex++){
        csvContent += "," + grafico.dados[columnIndex][rowIndex];
      }

      csvContent += "\n";

    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${grafico.tituloGrafico || "dados"}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <NavbarComponent />

      {/* Cabeçalho com botão e localização */}
      <div className="header-location">
        <BackButton />
        <Location
          parentName={decodeURIComponent(dimensao || "")}
          childName={indicadorJson?.nome}
        />
      </div>

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
                        colunas={grafico.colunas}
                        tituloGrafico={grafico.tituloGrafico}
                        categorias={grafico.categoria}
                      />
                    </div>
                    {grafico.descricaoGrafico && (
                      <div className="grafico-description">
                        <p>{grafico.descricaoGrafico}</p>
                      </div>
                    )}
                    <div className="grafico-download">
                      <button 
                        className="download-btn"
                        onClick={() => handleDownloadCSV(grafico)}
                      >
                        Baixar dados (CSV)
                      </button>
                    </div>
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

      <Footer />
    </div>
  );
};

export default IndicadorComponent;
