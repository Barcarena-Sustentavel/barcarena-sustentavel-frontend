import { FC, useEffect, useState, useRef } from "react";

import {
  IndicadorDadosGrafico,
  DadosGrafico,
} from "../../interfaces/indicador/indicador_interface.js";
import { DashboardComponent } from "./components/dashboard/dashboard.tsx";
import api from "../../adapters/api.tsx";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import "./style.css";
import Footer from "../../components/layout/footer/footer.tsx";
import Location from "../../components/layout/location/location.tsx";
import html2canvas from 'html2canvas';
import dimensoes from '../../utils/const.tsx'
import { getArtigoDimensao } from "../../services/crudArtigo.tsx";
const IndicadorComponent: FC = () => {
  const { dimensao, indicador, ordem } = useParams();
  const { dimensoesColumn1, dimensoesColumn2, dimensoesColumn3, dimensoesCores123 } = dimensoes.GetAllConst();
  const todasAsDimensoes = { ...dimensoesColumn1, ...dimensoesColumn2, ...dimensoesColumn3 }
  const icone = todasAsDimensoes[dimensao as string]
  const [indicadorJson, setIndicadorJson] = useState<IndicadorDadosGrafico>({
    nome: "",
    graficos: [],
  });
  const [fonteEMetodologia, setFonteEMetodologia] = useState({
    referenciaFonteDados: "",
    periodicidade: "",
    ultimaAtualizacao: "",
    unidadeMedida: "",
    metodologia: ""
  })
  const [loading, setLoading] = useState<boolean>(true);
  const [singleColumn, setSingleConlumn] = useState<boolean>(true);
  //guarda a referência dos graficos
  const graficosRef = useRef<Array<HTMLDivElement | null>>([]);
  const navigate = useNavigate()
  const location = useLocation()

  const getProximosIndicadores = () => {
    console.log(location)
    const arrayIndicadoresProximoAnterior = location.state
    const indicadorIndex = arrayIndicadoresProximoAnterior.findIndex(
      (indicadorAtual: string) => indicadorAtual === indicador
    );
    const ordemAnterior = parseInt(ordem as string) - 1
    const ordemProxima = parseInt(ordem as string) + 1
    const indicadoresProximoAnterior = {
      proximo: arrayIndicadoresProximoAnterior[indicadorIndex + 1] !== undefined && arrayIndicadoresProximoAnterior[indicadorIndex + 1],
      anterior: arrayIndicadoresProximoAnterior[indicadorIndex - 1] !== undefined && arrayIndicadoresProximoAnterior[indicadorIndex - 1]
    }
    return { indicadoresProximoAnterior, ordemAnterior, ordemProxima, arrayIndicadoresProximoAnterior}
  }

  const indicadoresProximoAnterior = getProximosIndicadores().indicadoresProximoAnterior
  const indicadoresOrdemAnterior = getProximosIndicadores().ordemAnterior
  const indicadoresOrdemProxima = getProximosIndicadores().ordemProxima
  const arrayIndicadoresProximoAnterior = getProximosIndicadores().arrayIndicadoresProximoAnterior

  useEffect(() => {
    const url: string = `/dimensoes/${dimensao}/indicador/${indicador}/`;
    const getIndicador = async () => {
      const response = await api.get(url)
      setIndicadorJson((prev) => {
        const responseData = response.data;
        console.log(responseData)
        return {...prev,nome: responseData.nome, graficos:responseData.graficos.sort((a: any, b: any) => a.posicao - b.posicao)}
      });
      setFonteEMetodologia((prev) => {
        fonteEMetodologia.referenciaFonteDados = response.data.fonteDeDados
        fonteEMetodologia.periodicidade = response.data.periodicidade
        fonteEMetodologia.ultimaAtualizacao = response.data.ultimaAtualizacao
        fonteEMetodologia.unidadeMedida = response.data.unidadeMedida
        fonteEMetodologia.metodologia = response.data.metodologia
        return fonteEMetodologia
      })
      setLoading(false);
    }
    getIndicador()
  }, []);

  const handleNavigateIndicador = (indicador: string, ordem: number, arrayIndicadores: string[]) => {
    const url = encodeURI(`/${dimensao}/${indicador}/${ordem}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(url, {
      state: arrayIndicadores
    });
  };

  const iconeRenderizado = () => <svg
    viewBox={(icone as any).viewBox}                   // Aumenta o ícone se for ativo
    stroke="white"  //{(icon as any).stroke}
    fill={(icone as any).fill}
    strokeWidth={(icone as any)["stroke-width"]}
    strokeLinecap={(icone as any)["stroke-linecap"]}
    strokeLinejoin={(icone as any)["stroke-linejoin"]}
    width="36" // icon um tamanho padrão
    height="36">
    {(icone as any).children}
  </svg>

  
  const handleDownloadCSV = (grafico: DadosGrafico) => {

    const linkDownLoadCSV = (csvContent: string) => {
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${grafico.tituloGrafico || "dados"}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }

    let csvContent = grafico.colunas.join(",") + "\n";
    csvContent = "Ano," + csvContent;
    let categoria;
    //Adicionando outras linhas com os dados do gráfico
    //fix: agora os dados da tabela são transpostos para o csv de maneira correta
    grafico.dados[0].forEach((row, rowIndex) => {
      categoria = grafico.categoria[rowIndex];
      csvContent += categoria;
      for (let columnIndex = 0; columnIndex < grafico.dados.length; columnIndex++) {
        csvContent += "," + grafico.dados[columnIndex][rowIndex];
      }
      csvContent += "\n";
    });
    linkDownLoadCSV(csvContent)
  };

  const exportGrafico = async (nome: string, index: number) => {
    const canvas = await html2canvas(graficosRef.current[index])
    const dataUrl = canvas.toDataURL("image/png");
    // Optional: Trigger an automatic download
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${nome}.png`
    link.click();
  }
  return (
    <div>
      <NavbarComponent />
      {/* Cabeçalho com botão e localização */}
      <div id="header-location" className="header-location">
        <Location
          parentName={decodeURIComponent(dimensao || "")}
          childName={indicadorJson?.nome}
        />
      </div>

      <div className="indicador-container">
        <div className="indicador-hero" style={{ backgroundColor: `${dimensoesCores123[dimensao as string]}` }}>
          <div className="indicador-hero-inner">
            <div className="indicador-hero-icon">
              {icone !== undefined && iconeRenderizado()}
            </div>
            <div className="indicador-hero-text">
              <span className="indicador-hero-badge">{dimensao} · Indicador {ordem}</span>
              <div className="indicador-hero-titulo">{indicador}</div>
            </div>
            <div className="indicador-hero-acoes">
              <a className="indicador-hero-resumo" onClick={() => getArtigoDimensao(dimensao as string)}>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="1" x2="6" y2="8"></line><polyline points="3,5 6,8 9,5"></polyline><line x1="1" y1="11" x2="11" y2="11"></line></svg>
                Resumo da dimensão
              </a>
              <div className="indicador-hero-toggle">
                <button className="botao-layout"
                  onClick={() => setSingleConlumn(true)}
                  style={singleColumn ? { backgroundColor: "rgba(255,255,255,0.9)", color: `${dimensoesCores123[dimensao as string]}` } : {}}>
                  {/*<i className="bi bi-square"></i>*/}
                  <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="5" rx="1.5" fill="currentColor"></rect><rect x="2" y="9" width="12" height="5" rx="1.5" fill="currentColor"></rect></svg>
                </button>

                <button className="botao-layout"
                  onClick={() => setSingleConlumn(false)}
                  style={!singleColumn ? { backgroundColor: "rgba(255,255,255,0.9)", color: `${dimensoesCores123[dimensao as string]}` } : {}}>
                  {/*<i className="bi bi-layout-split"></i>*/}
                  <svg viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="6" height="5" rx="1.5" fill="currentColor"></rect><rect x="9" y="2" width="6" height="5" rx="1.5" fill="currentColor"></rect><rect x="1" y="9" width="6" height="5" rx="1.5" fill="currentColor"></rect><rect x="9" y="9" width="6" height="5" rx="1.5" fill="currentColor"></rect></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando dados...</p>
          </div>
        ) : (
          <div className="indicadorConteudo">
            <div className={`${singleColumn ? 'graficos-container-single-column' : 'graficos-container-double-column'} `} >
              {indicadorJson.graficos !== undefined &&  indicadorJson.graficos.length > 0 ? (
                indicadorJson.graficos.map((grafico: DadosGrafico, index) => {
                  console.log(grafico)
                  const id: string = `grafico ${index}`
                  return (
                    <div className="grafico-card" key={index}>
                      <div className="grafico-card-titulo">{grafico.tituloGrafico}</div>
                      <div key={index} id={id} ref={(e) => {
                        if (e && !graficosRef.current.includes(e)) {
                          graficosRef.current.push(e)
                        }
                      }} className="grafico-card-wrap"//"dashboard-container"
                      >
                        <DashboardComponent
                          tipoGrafico={grafico.tipoGrafico}
                          dados={grafico.dados}
                          colunas={grafico.colunas}
                          tituloGrafico={grafico.tituloGrafico}
                          categorias={grafico.categoria}
                        />
                      </div>
                      <div id={id} style={{ display: 'none' }}></div>
                      {grafico.descricaoGrafico && (
                        <div className="grafico-card-descricao" style={{ borderLeft: `3px solid ${dimensoesCores123[dimensao as string]}` }}>
                          <p>{grafico.descricaoGrafico}</p>
                        </div>
                      )}
                      <div className="grafico-card-export">
                        <button
                          className="grafico-card-export-botao"
                          onClick={() => exportGrafico(grafico.tituloGrafico as string, index)}
                        >
                          Baixar gráfico (PNG)
                        </button>
                        <button
                          className="grafico-card-export-botao"
                          onClick={() => handleDownloadCSV(grafico)}
                        >
                          Baixar dados (CSV)
                        </button>
                      </div>

                    </div>
                  )
                })
              ) : (
                <div className="no-data">
                  <h3>Nenhum gráfico disponível para este indicador</h3>
                  <p>Novos dados serão adicionados em breve.</p>
                </div>
              )}

            </div>
            <div className="grafico-card card-meta">
              <div className="grafico-card-titulo">Fonte e Metodologia</div>
              <div style={{ marginTop: "1rem" }} className="grafico-card-grid">
                <div className="meta-block"><div className="grafico-card-grid-label">Fonte dos dados</div><div className="grafico-card-grid-valor"><a href="#" target="_blank" rel="noopener">{fonteEMetodologia.referenciaFonteDados}</a></div></div>
                <div className="meta-block"><div className="grafico-card-grid-label">Periodicidade</div><div className="grafico-card-grid-valor">{fonteEMetodologia.periodicidade}</div></div>
                <div className="meta-block"><div className="grafico-card-grid-label">Última atualização</div><div className="grafico-card-grid-valor">{fonteEMetodologia.ultimaAtualizacao}</div></div>
                <div className="meta-block"><div className="grafico-card-grid-label">Unidade de medida</div><div className="grafico-card-grid-valor">{fonteEMetodologia.unidadeMedida}</div></div>
                <div className="meta-block" style={{ gridColumn: "1/-1" }}><div className="grafico-card-grid-label">Metodologia</div><div className="grafico-card-grid-valor">{fonteEMetodologia.metodologia}</div></div>
              </div>
            </div>
             <div className="anterior-proximo-indicador" style={indicadoresProximoAnterior.anterior === false ? { justifyContent: 'flex-end' } : (indicadoresProximoAnterior.proximo === false ? { justifyContent: 'flex-start' } : {})} id="indNav">
          {indicadoresProximoAnterior.anterior !== false &&
            <a id="btnPrev" onClick={() => handleNavigateIndicador(indicadoresProximoAnterior.anterior, indicadoresOrdemAnterior, arrayIndicadoresProximoAnterior)} className="navegacao-indicador" style={indicadoresProximoAnterior.proximo === false ? { justifyContent: 'flex-start' } : {}}>
              <span className="navegacao-indicador-icone" style={{ color: `var(--${dimensoesCores123[dimensao as string]})` }}>←</span>
              <div>
                <div className="navegacao-indicador-label">Indicador anterior</div>
                <div className="navegacao-indicador-nome" id="prevName">{indicadoresProximoAnterior.anterior}</div>
              </div>
            </a>}
          {indicadoresProximoAnterior.proximo !== false &&
            <a id="btnNext" onClick={() => handleNavigateIndicador(indicadoresProximoAnterior.proximo, indicadoresOrdemProxima, arrayIndicadoresProximoAnterior)} className="navegacao-indicador" >
              <div>
                <div className="navegacao-indicador-label">Próximo indicador</div>
                <div className="navegacao-indicador-nome" id="nextName">{indicadoresProximoAnterior.proximo}</div>
              </div>
              <span className="navegacao-indicador-icone">→</span>
            </a>}
        </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default IndicadorComponent;
