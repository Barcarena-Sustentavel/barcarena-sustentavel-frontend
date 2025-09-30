import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Referencia } from "../../interfaces/referencia_interface.tsx";
import { Dimensao } from "../../interfaces/dimensao_interface.tsx";
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import "@assets/styles/index.css";
import "./dimensao.css";
import api from "../../api.tsx";
import Footer from "../../components/layout/footer/footer.tsx";
import SubmenuDimensao from "./components/submenuDimensao.tsx";
import FormContribuicao from "./components/formContribuicao.tsx";
//import HTMLFileIframe from "../kml/mapa/map4.tsx";
import Map2 from "../kml/map2.tsx";
const NODE_ENV = import.meta.env.VITE_NODE_ENV;

const DimensaoComponent: FC = () => {
  const { dimensao } = useParams();
  const [indicadores, setIndicadores] = useState<string[]>([]);
  const [referencias, setReferencias] = useState<Referencia[]>([]);
  const [dimensaoJson, setDimensao] = useState<Dimensao | null>(null);
  const url: string = `/dimensoes/${dimensao}/`;
  const navigate = useNavigate();
  const coresBordas = [
    "var(--secondary-green)",
    "var(--primary-blue)",
    "var(--secondary-darkblue)",
    "var(--secondary-light-blue)",
    "var(--secondary-orange)",
  ];

  // Contador global de elementos
  let contadorGlobal = 0;

  // Função para obter a cor sequencial
  const getProximaCor = () => {
    const cor = coresBordas[contadorGlobal % coresBordas.length];
    contadorGlobal++;
    return cor;
  };

  const mockData = {
    dimensao: {
      id: 1,
      nome: "Educação",
      descricao: "Indicadores relacionados ao sistema educacional brasileiro",
    },
    indicadores: [
      "Taxa de alfabetização",
      "Anos médios de estudo",
      "Investimento em educação (% do PIB)",
    ],
    referencias: [
      {
        id: 1,
        nome: "IBGE - Educação",
        link: "https://www.ibge.gov.br/educacao",
        fkDimensao: "1",
      },
      {
        id: 2,
        nome: "INEP - Indicadores Educacionais",
        link: "https://www.inep.gov.br/indicadores",
        fkDimensao: "2",
      },
    ],
  };

  const handleNavigate = (indicador: string) => {
    const url = encodeURI(`/${dimensao}/${indicador}/`);
    navigate(url);
  };
  //const pathHtml =
  //"/home/marrior/Desktop/projects/testeMapa/odsb_escolas/index.html/";
  const [pathHtml, setPathHtml] = useState<string>("");
  const mapasConectividade = ["Cobertura", "Escola", "Saúde"];
  const [botaoConectividade, setBotaoConectividade] = useState<string>("");
  console.log(botaoConectividade);
  console.log(pathHtml);
  const handleOnCick = (event: any) => {
    setBotaoConectividade(event.target.value);
  };
  useEffect(() => {
    if (dimensao === "Segurança") {
      setPathHtml("https://victorsantiago.github.io/odsb_kmls/");
    } else if (dimensao === "Conectividade") {
      if (botaoConectividade === "Escola") {
        setPathHtml("https://victorsantiago.github.io/odsb_escolas/");
      } else if (botaoConectividade === "Cobertura") {
        setPathHtml("https://victorsantiago.github.io/odsb_cobertura/");
      } else if (botaoConectividade === "Saúde") {
        setPathHtml("https://victorsantiago.github.io/odsb_saude/");
      } else {
        setPathHtml("https://victorsantiago.github.io/odsb_escolas/");
      }
    } else {
      setPathHtml("");
    }
    if (NODE_ENV == "development") {
      setDimensao(mockData.dimensao);
      setIndicadores(mockData.indicadores);
      setReferencias(mockData.referencias);
    } else {
      api.get(url).then((response) => {
        setDimensao(response.data.dimensao);
        setIndicadores(response.data.indicadores);
        setReferencias(response.data.referencias);
      });
    }
  }, [url, dimensao, botaoConectividade]);

  return (
    <div className="home-container">
      <NavbarComponent />
      <SubmenuDimensao dimensaoAtiva={dimensaoJson?.nome || ""} />
      <div className="container dimension-details-container">
        <div className="descricao">
          <p style={{ borderLeft: `5px solid ${getProximaCor()}` }}>
            {dimensaoJson?.descricao}
          </p>
        </div>
      </div>
      <div className="container dimension-details-container">
        <h1>Indicadores</h1>
        <ul className="indicadores">
          {indicadores.length > 0 &&
            indicadores.map((indicador) => (
              <li style={{ borderLeft: `5px solid ${getProximaCor()}` }}>
                <button
                  className="button-as-link"
                  onClick={() => handleNavigate(indicador)}
                >
                  {indicador}
                </button>
              </li>
            ))}
        </ul>
      </div>
      {/* <div className="container dimension-details-container mt-5 d-flex flex-column"> */}
      <div className="container dimension-details-container d-flex flex-column">
        <h1 style={{ borderBottom: "solid 1px #ddd" }}>Referências</h1>
        {referencias.length > 0 &&
          referencias.map((referencia) => (
            // <ul className="referencias mt-5">
            <ul className="referencias">
              {/* <li style={{ borderLeft: `5px solid ${getProximaCor()}` }}> */}
              <li>
                <a
                  className="custom-link-tooplate-gotto-job"
                  href={`${referencia?.link}`}
                  target="_blank"
                >{`${referencia?.nome}`}</a>
              </li>
            </ul>
          ))}
      </div>
      {/*pathHtml !== "" && (
        <div style={{ margin: "0 auto", width: "70%" }}>
          {dimensao === "Conectividade" && (
            <div
              style={{
                margin: "10px auto 5px auto",
                width: "30%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {mapasConectividade.map((mapa) => {
                return (
                  <button
                    style={{
                      padding: "10px",
                      border: "1px solid",
                      borderRadius: "8px",
                      backgroundColor: "var(--primary-blue)",
                    }}
                    value={mapa}
                    onClick={(event: any) => handleOnCick(event)}
                  >
                    {mapa}
                  </button>
                );
              })}
            </div>
          )}
          <HTMLFileIframe htmlFilePath={pathHtml} />
        </div>
      )*/}
      {
        <div className="divMapa">
          <Map2 dimensao={dimensao} />
        </div>
      }
      <FormContribuicao
        dimensaoId={0}
        formStyle={{ borderLeft: `5px solid ${getProximaCor()}` }}
      />
      <Footer />
    </div>
  );
};

export default DimensaoComponent;
