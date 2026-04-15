import { FC, useEffect, useState, useRef } from "react";
import {
  IndicadorDadosGrafico,
  DadosGrafico,
} from "../../interfaces/indicador_interface.tsx";
import { DashboardComponent } from "./dashboard/dashboard.tsx";
import api from "../../api.tsx";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import "./indicador.css";
import Footer from "../../components/layout/footer/footer.tsx";
import BackButton from "../../components/layout/backButton/backButton.tsx";
import Location from "../../components/layout/location/location.tsx";
import { DashboardProps } from "./dashboard/interface/dashboard_interface.tsx";
import html2canvas from 'html2canvas';
import dimensoes from '../../utils/const.tsx'
import { LucideGitPullRequestCreateArrow } from "lucide-react";
const IndicadorComponent: FC = () => {
  const { dimensao, indicador, ordem } = useParams();
  const { dimensoesColumn1, dimensoesColumn2, dimensoesColumn3, dimensoesCores123 } = dimensoes.GetAllConst();
  const todasAsDimensoes = { ...dimensoesColumn1, ...dimensoesColumn2, ...dimensoesColumn3 }
  const icone = todasAsDimensoes[dimensao as string]
  const url: string = `/dimensoes/${dimensao}/indicador/${indicador}/`;
  const [indicadorJson, setIndicadorJson] = useState<IndicadorDadosGrafico>({
    nome: "",
    graficos: [],
  });
  const [referenciaFonteDados, setReferenciaFonteDados] = useState<string>("")
  const [periodicidade, setPeriodicidade] = useState<string>("")
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<string>("")
  const [unidadeMedida, setUnidadeMedida] = useState<string>("")
  const [metodologia, setMetodologia] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true);
  const [singleColumn, setSingleConlumn] = useState<boolean>(true);
  //guarda a referência dos graficos
  const graficosRef = useRef<Array<HTMLDivElement | null>>([]);
  const navigate = useNavigate()
  const location = useLocation()
  const arrayIndicadores = location.state
  const indicadorIndex = arrayIndicadores.findIndex(
    (indicadorAtual: string) => indicadorAtual === indicador
  );
  const ordemAnterior = parseInt(ordem as string) - 1
  const ordemProxima = parseInt(ordem as string) + 1
  console.log(ordemProxima)
  const indicadores = {
    proximo: arrayIndicadores[indicadorIndex + 1] !== undefined && arrayIndicadores[indicadorIndex + 1],
    anterior: arrayIndicadores[indicadorIndex - 1] !== undefined && arrayIndicadores[indicadorIndex - 1]
  }
  console.log(indicadores)
  useEffect(() => {
    const getIndicador = async () => {
      const response = await api.get(url)
      setIndicadorJson((prev) => {
          const responseData = response.data;
          return responseData.graficos.sort((a: any, b: any) => a.posicao - b.posicao);
        });
        setIndicadorJson(response.data);
        setReferenciaFonteDados(response.data.fonteDeDados)
        setPeriodicidade(response.data.periodicidade)
        setUltimaAtualizacao(response.data.ultimaAtualizacao)
        setUnidadeMedida(response.data.unidadeMedida)
        setMetodologia(response.data.metodologia)
        setLoading(false);
    }
    getIndicador()
  }, [url]);

  const handleNavigateIndicador = (indicador: string, ordem: number, arrayIndicadores: string[]) => {
    const url = encodeURI(`/${dimensao}/${indicador}/${ordem}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(url, {
      state: arrayIndicadores
    });
  };

  const cartaoMetodologia = (dimensao: string) => {
    const cartao = dimensao === "Economia e Mercado de Trabalho" ? {
      fonteDados: "IBGE — Sistema de Contas Regionais",
      link: "https://www.ibge.gov.br/",
      periodicidade: "Anual",
      ultAtualizacao: "2024 — competência 2022",
      unidadeMedida: "R$ milhões / R$ per capita",
      metodologia: "O PIB municipal é calculado pelo IBGE com base no valor adicionado bruto de todos os setores produtivos do município, acrescido dos impostos, menos os subsídios sobre produtos. O PIB per capita divide o PIB pelo total da população estimada no ano.",
    } : (dimensao === "Meio Ambiente e Saneamento") ? {
      fonteDados: "SNIS — Sistema Nacional de Informações sobre Saneamento",
      link: "https://www.gov.br/mdr/acl_users/credentials_cookie_auth/require_login?came_from=https%3A//www.gov.br/mdr/pt-br/assuntos/saneamento/snis",
      periodicidade: "Anual",
      ultAtualizacao: "2024 — competência 2023",
      unidadeMedida: "Percentual (%)",
      metodologia: "O índice de atendimento urbano é calculado pelo SNIS como a razão entre a população urbana atendida com abastecimento de água e a população urbana total. O índice total inclui a estimativa da população rural atendida.",
    } : (dimensao === "Educação, Cultura, Esporte e Lazer") ? {
      fonteDados: "INEP — Instituto Nacional de Estudos e Pesquisas Educacionais",
      link: "https://www.gov.br/inep/pt-br",
      periodicidade: "Bienal",
      ultAtualizacao: "2024 — competência 2023",
      unidadeMedida: "Escala de 0 a 10",
      metodologia: "O IDEB é calculado com base no fluxo escolar (taxa de aprovação) e no desempenho dos estudantes na Prova Brasil (SAEB). O índice varia de 0 a 10, com metas progressivas estabelecidas pelo MEC para cada rede de ensino.",
    } : (dimensao === "Mobilidade") ? {
      fonteDados: "SENATRAN — Secretaria Nacional de Trânsito / DETRAN-PA",
      link: "https://www.gov.br/senatran/pt-br",
      periodicidade: "Mensal (agregado anual)",
      ultAtualizacao: "2025 — competência 2024",
      unidadeMedida: "Número de veículos",
      metodologia: "Os dados de frota são extraídos do Sistema Nacional de Estatística de Trânsito (SINET) do SENATRAN, com base nos registros de licenciamento do DETRAN estadual. Considera todos os veículos com licenciamento ativo no município.",
    } : (dimensao === "Ordenamento Territorial e Habitação") ? {
      fonteDados: "FJP — Fundação João Pinheiro / Censo Demográfico IBGE 2022",
      link: "https://www.ibge.gov.br/",
      periodicidade: "Trienal / Censo",
      ultAtualizacao: "2023 — competência 2022",
      unidadeMedida: "Número de domicílios e percentual",
      metodologia: "O déficit habitacional é estimado pela FJP com base na metodologia de habitações inadequadas e família sem domicílio, contemplando quatro componentes: habitação precária, coabitação familiar, ônus excessivo com aluguel urbano e adensamento excessivo em domicílios alugados.",
    } : (dimensao === "Segurança") ? {
      fonteDados: "SINESP — Sistema Nacional de Informações de Segurança Pública / SEJUSP-PA",
      link: "https://www.gov.br/mj/pt-br/assuntos/sua-seguranca/seguranca-publica/sinesp-1",
      periodicidade: "Mensal (agregado anual)",
      ultAtualizacao: "2024 — competência 2023",
      unidadeMedida: "Óbitos por 100 mil habitantes",
      metodologia: "A taxa de homicídios é calculada dividindo o número de homicídios dolosos registrados pela população estimada do município, multiplicado por 100.000. Os dados são consolidados a partir dos Boletins de Ocorrência registrados nas delegacias de polícia.",
    } : (dimensao === "Saúde") ? {
      fonteDados: "SINASC / SIM — DATASUS / Ministério da Saúde",
      link: "https://datasus.saude.gov.br/",
      periodicidade: "Anual",
      ultAtualizacao: "2024 — competência 2023",
      unidadeMedida: "Óbitos por mil nascidos vivos",
      metodologia: "A taxa de mortalidade infantil é calculada como o quociente entre o número de óbitos de menores de um ano e o número de nascidos vivos no mesmo ano e local, multiplicado por 1.000. Fontes: SIM (Sistema de Informações sobre Mortalidade) e SINASC (Sistema de Informações sobre Nascidos Vivos).",
    } : (dimensao === "Conectividade") ? {
      fonteDados: "ANATEL — Agência Nacional de Telecomunicações",
      link: "https://www.gov.br/anatel/pt-br",
      periodicidade: "Anual",
      ultAtualizacao: "2025 — competência 2024",
      unidadeMedida: "Índice de 0 a 1",
      metodologia: "O Índice Brasileiro de Conectividade (IBC) é calculado pela ANATEL a partir de dados de acessos de banda larga fixa, móvel e telefonia, ponderados pela população do município. O índice varia de 0 (sem conectividade) a 1 (conectividade máxima observada no Brasil).",
    } : {
      fonteDados: "FIRJAN — Federação das Indústrias do Estado do Rio de Janeiro",
      link: "https://siconfi.tesouro.gov.br/siconfi/index.jsf",
      periodicidade: "Anual",
      ultAtualizacao: "2023 — competência 2022",
      unidadeMedida: "Índice de 0 a 1",
      metodologia: "O IFDM é elaborado pela FIRJAN com base em dados oficiais do governo federal. A dimensão Gestão Fiscal avalia cinco aspectos: autonomia financeira, gasto com pessoal, investimento funcional, liquidez e custo da dívida.",
    }
    return cartao

  }



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
    let csvContent = grafico.colunas.join(",") + "\n";
    csvContent = "Ano," + csvContent;
    let categoria;
    let row = "";

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

  const exportGrafico = async (nome: string, index: number) => {
    const canvas = await html2canvas(graficosRef.current[index])
    const dataUrl = canvas.toDataURL("image/png");
    // Optional: Trigger an automatic download
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${nome}.png`
    link.click();
  }
  console.log(indicadorJson)
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
              <a className="indicador-hero-resumo">
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
              {indicadorJson.graficos.length > 0 ? (
                indicadorJson.graficos.map((grafico: DadosGrafico, index) => {
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
                <div className="meta-block"><div className="grafico-card-grid-label">Fonte dos dados</div><div className="grafico-card-grid-valor"><a href={cartaoMetodologia(dimensao as string).link} target="_blank" rel="noopener">{referenciaFonteDados}</a></div></div>
                <div className="meta-block"><div className="grafico-card-grid-label">Periodicidade</div><div className="grafico-card-grid-valor">{periodicidade}</div></div>
                <div className="meta-block"><div className="grafico-card-grid-label">Última atualização</div><div className="grafico-card-grid-valor">{ultimaAtualizacao}</div></div>
                <div className="meta-block"><div className="grafico-card-grid-label">Unidade de medida</div><div className="grafico-card-grid-valor">{unidadeMedida}</div></div>
                <div className="meta-block" style={{ gridColumn: "1/-1" }}><div className="grafico-card-grid-label">Metodologia</div><div className="grafico-card-grid-valor">{metodologia}</div></div>
              </div>
            </div>
            <div className="anterior-proximo-indicador" style={indicadores.anterior === false ? { justifyContent: 'flex-end' } : (indicadores.proximo === false ? { justifyContent: 'flex-start' } : {})} id="indNav">
              {indicadores.anterior !== false &&
                <a id="btnPrev" onClick={() => handleNavigateIndicador(indicadores.anterior, ordemAnterior, arrayIndicadores)} className="navegacao-indicador" style={indicadores.proximo === false ? { justifyContent: 'flex-start' } : {}}>
                  <span className="navegacao-indicador-icone" style={{ color: `var(--${dimensoesCores123[dimensao as string]})` }}>←</span>
                  <div>
                    <div className="navegacao-indicador-label">Indicador anterior</div>
                    <div className="navegacao-indicador-nome" id="prevName">{indicadores.anterior}</div>
                  </div>
                </a>}
              {indicadores.proximo !== false &&
                <a id="btnNext" onClick={() => handleNavigateIndicador(indicadores.proximo, ordemProxima, arrayIndicadores)} className="navegacao-indicador" >
                  <div>
                    <div className="navegacao-indicador-label">Próximo indicador</div>
                    <div className="navegacao-indicador-nome" id="nextName">{indicadores.proximo}</div>
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
