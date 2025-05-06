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

const IndicadorComponent: FC = () => {
  const { dimensao, indicador } = useParams();
  const url: string = `/dimensoes/${dimensao}/indicador/${indicador}/`;
  const [indicadorJson, setIndicadorJson] = useState<IndicadorDadosGrafico>({
    nome: "",
    graficos: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  //console.log(`${indicador}`);
  //console.log(indicador);
  useEffect(() => {
    api
      .get(url)
      .then((response) => {
        //console.log(response.request);
        setIndicadorJson(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching indicador data:", error);
        setLoading(false);
      });
  }, [url]);
  //console.log(indicadorJson);
  //console.log(DashboardComponent);
  const handleDownloadCSV = (grafico: DadosGrafico) => {
    //Cria o header das colunas na primeira linha do arquivo CSV
    let csvContent = grafico.colunas.join(",") + "\n";

    //Adicionando outras linhas com os dados do gráfico
    grafico.dados.forEach((row, rowIndex) => {
      //pega os valores dentro de cada linha e transforma em array com strings
      const rowData = row.map(value => String(value));

      // categorias são sempre as primeiras colunas
      if (grafico.categoria && grafico.categoria.length > rowIndex) {
        //Adiciona os valores da categoria ao início da linha, após isso insere uma vírgula e pula uma linha
        csvContent += `${grafico.categoria[rowIndex]},${rowData.join(",")}\n`;
        //console.log(csvContent);
      } else {
        csvContent += rowData.join(",") + "\n";
        //console.log(csvContent);
      }
    });
    
    // O blob é uma interface para representar um objeto de dados imutáveis em um formato de arquivo
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    //Precisamos criar o link de download
    const url = window.URL.createObjectURL(blob);
    //Precisamos criar um tag de ancora que possui um atributo com o link e um atributo de download para acessar o link
    const link = document.createElement("a");
    //console.log(link);
    link.setAttribute("href", url);
    link.setAttribute("download", `${grafico.tituloGrafico || "dados"}.csv`);
    document.body.appendChild(link);
    
    //após isso o link é clicado para iniciar o download
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
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
