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
import BackButton from "../../components/layout/backButton/backButton.tsx";
import HTMLFileIframe from "../kml/mapa/map4.tsx";
import dimensoes from "../../utils/const.tsx";
const NODE_ENV = import.meta.env.VITE_NODE_ENV;

const DimensaoComponent: FC = () => {
  const { dimensao } = useParams();
  const { dimensoesCores123 } = dimensoes.GetAllConst();
  const contadorIndicadoresCores = [
    {corLetra: '#2c3e7d', corBackground: '#2c3e7d22', corBorda: '#2c3e7d44'},
    {corLetra: '#148f77', corBackground: '#148f7722', corBorda: '#148f7744'},
    {corLetra: '#1B4F9B', corBackground: '#1B4F9B22', corBorda: '#1B4F9B44'},
    {corLetra: '#27ae60', corBackground: '#27ae6022', corBorda: '#27ae6044'},
    {corLetra: '#1e8449', corBackground: '#1e844922', corBorda: '#1e844944'},
    {corLetra: '#922b21', corBackground: '#922b2122', corBorda: '#922b2144'},
    {corLetra: '#c0392b', corBackground: '#c0392b22', corBorda: '#c0392b44'},
    {corLetra: '#d35400', corBackground: '#d3540022', corBorda: '#d3540044'},
    {corLetra: '#b7950b', corBackground: '#b7950b22', corBorda: '#b7950b44'},
  ]

  const dimensoesNomes:string[] = Object.keys(dimensoesCores123)
  console.log(dimensoesNomes)
  const [dimensaoIndicadorContador, setDimensaoIndicadorContador] = useState<Record<string,any>>({})
  const [indicadores, setIndicadores] = useState<
    Array<Record<string, string | number | null>>
  >([]);
  const [indicadoresNomes, setIndicadoresNomes] = useState<
    Array<string>
  >([]);
  const [referencias, setReferencias] = useState<Referencia[]>([]);
  const [dimensaoJson, setDimensao] = useState<Dimensao | null>(null);
  const [estudosComplementares, setEstudosComplementares] = useState<string[]>(
    [],
  );
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

  const handleNavigateIndicador = (indicador: string, ordem: number, arrayIndicadores: string[]) => {
    const url = encodeURI(`/${dimensao}/${indicador}/${ordem}`);
    navigate(url, {
      state: arrayIndicadores
    });
  };
  //--------------------------------------------------------------------------
  /*
  Variáveis utilizadas junto com o iframe para carregar os mapas de conectividade  */
  const [pathHtml, setPathHtml] = useState<string>("");
  const handleOnCick = (event: any) => {
    setBotaoConectividade(event.target.value);
  };
  const mapasConectividade = ["Cobertura Móvel", "Conectividade na Educação", "Conectividade na Saúde"];
  const [botaoConectividade, setBotaoConectividade] = useState<string>("Cobertura Móvel");
  //--------------------------------------------------------------------------
  const handleDownloadEstudo = (estudo: string) => {
    const url = `api/dimensoes/${dimensao}/estudo_complementar/${estudo}/anexo/`;
    window.open(url, "_blank");
  };
  //--------------------------------------------------------------------------
  //useEffect para carregar os dados da dimensão para o iFrame
  useEffect(() => {
    if (dimensao === "Segurança") {
      setPathHtml("https://victorsantiago.github.io/odsb_kmls/");
    } else if (dimensao === "Conectividade") {
      if (botaoConectividade === "Conectividade na Educação") {
        setPathHtml("https://victorsantiago.github.io/odsb_escolas/");
      } else if (botaoConectividade === "Cobertura Móvel") {
        setPathHtml("https://victorsantiago.github.io/odsb_cobertura/");
      } else if (botaoConectividade === "Conectividade na Saúde") {
        setPathHtml("https://victorsantiago.github.io/odsb_saude/");
      } else {
        setPathHtml("https://victorsantiago.github.io/odsb_escolas/");
      }
    } else if (dimensao === "Ordenamento Territorial") {
      setPathHtml("https://victorsantiago.github.io/odsb_ordenamento/");

    } else {
      setPathHtml("");
    }
    api.get(url).then((response) => {
      setIndicadores([...response.data.indicadores].sort((a: any, b: any) => a.posicao - b.posicao));
      setDimensao(response.data.dimensao);
      setReferencias(response.data.referencias);
      setEstudosComplementares(response.data.estudos_complementares);
    });
    //}
  }, [url, dimensao, botaoConectividade]);
  useEffect(() => {
    setIndicadoresNomes(indicadores.map((indicador) => indicador.nome as string))
  }, [indicadores])
  //--------------------------------------------------------------------------
  useEffect(() =>{
  const chavesDimensaoIndicadorContador = Object.keys(dimensaoIndicadorContador)
  console.log(chavesDimensaoIndicadorContador)
  if (chavesDimensaoIndicadorContador.length > 0) return

  const dimensaoIndicadorContadorTemp:Record<string,any> = {}
  dimensoesNomes.map((_,index:number) => {
    console.log(dimensoesNomes[index])
    return dimensaoIndicadorContadorTemp[dimensoesNomes[index]] = contadorIndicadoresCores[index]}) 
  setDimensaoIndicadorContador(dimensaoIndicadorContadorTemp)
  },[dimensoesNomes])
  console.log(dimensaoIndicadorContador)
  return (
    <div className="home-container">
      <NavbarComponent />
      <SubmenuDimensao dimensaoAtiva={dimensaoJson?.nome || ""} />
      <div className="dimensao-container">
        <div className="descricao" style={{ borderLeft: `5px solid ${dimensoesCores123[dimensao as string]}` }}>
          <p>
            {dimensaoJson?.descricao}
          </p>
        </div>
        {pathHtml !== "" && (
          <div className="mx-auto" style={{
            width: "100%",
            height: "41rem",
            marginBottom: dimensao === "Conectividade" ? "6rem" : "0",
            marginTop: dimensao === "Conectividade" ? "0" : "21px"
          }}>
            {dimensao === "Conectividade" && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "2rem",
                  marginBottom: "1rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <select
                  className="form-select"
                  style={{
                    background: 'var(--primary-dark)',
                    border: 'none',
                    fontFamily: 'Sora,sans-serif',
                    borderRadius:'8px'
                  }}
                  onChange={(e) => handleOnCick(e)}
                  defaultValue={mapasConectividade[0]}
                >
                  {mapasConectividade.map((mapa) => (
                    <option key={mapa} value={mapa}>{mapa}</option>
                  ))}
                </select>
                {/* {mapasConectividade.map((mapa) => {
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
              })} */}
              </div>
            )}
            <HTMLFileIframe htmlFilePath={pathHtml} />
          </div>
        )}
        <div className="header-indicadores">
          <h2>Indicadores</h2>
          {dimensaoIndicadorContador[dimensao as string] !== undefined && <span className="contador-indicadores" style={{color: dimensaoIndicadorContador[dimensao as string]["corLetra"]!, 
                                                         backgroundColor:dimensaoIndicadorContador[dimensao as string]["corBackground"]!,
                                                         borderColor:dimensaoIndicadorContador[dimensao as string]["corBorda"]!}}
          >{indicadores.length} indicadores</span>}
        </div>
        <div className="indicadores-grid">
          {indicadores.length > 0 &&
            indicadores.map((indicador, index) => (
              <div
                className="indicadores-grid-card"
                style={{ borderTop: `3px solid ${dimensoesCores123[dimensao as string]}` }}
                onClick={() =>
                  handleNavigateIndicador(indicador.nome as string, index + 1, indicadoresNomes)
                }
              >
                <div className="indicadores-grid-card-numero" style={{ color: `${dimensoesCores123[dimensao as string]}` }}>Indicador {index + 1}</div>
                <div className="indicadores-grid-card-nome">{indicador.nome}</div>
                <div className="ind-card-arrow">→</div>
              </div>

            ))}
        </div>
        {estudosComplementares.length != 0 &&
          (<div className="secao-ref-estudoComplementar">
            <h2>Estudos Complementares</h2>
            <div className="secao-ref-estudoComplementar-lista">
              {estudosComplementares.length > 0 &&
                estudosComplementares.map((estudoComplementar) => (
                  <button
                    className="button-as-link"
                    onClick={() => handleDownloadEstudo(estudoComplementar)}
                  >
                    {estudoComplementar}
                  </button>
                ))}
            </div>
          </div>)}
        
          {referencias.length > 0 &&
          <div className="secao-ref-estudoComplementar">
          <h2>Referências</h2>
            {referencias.map((referencia) => (
              <ul className="secao-ref-estudoComplementar-lista-ul">
                <li>
                  {referencia?.link !== "" ? <a
                    href={`${referencia?.link}`}
                    target="_blank"
                  >{`${referencia?.nome}`}</a> :
                    <p className="custom-link-tooplate-gotto-job">{`${referencia?.nome}`}</p>
                  }
                </li>
              </ul>

            ))}
          </div>
          }
        <FormContribuicao
            dimensaoId={0}
            formStyle={{ borderLeft: `5px solid ${dimensoesCores123[dimensao as string]}` }}
          />
      </div>

      {/* {dimensao === "Conectividade" &&
        <div className="divMapa">
          <MapaConectividade dimensao={dimensao} />
        </div>}
      {dimensao === "Ordenamento Territorial" && 
        <div className="divMapa">
          <MapaOrdenamento dimensao={dimensao}/>
        </div>}
      {dimensao === "Segurança" && 
        <div className="divMapa" style={{ margin: "2rem auto", width: "61%" }}>
          <HTMLFileIframe htmlFilePath={pathHtml}/>
        </div>} */}

      <Footer />
    </div>
  );
};

export default DimensaoComponent;