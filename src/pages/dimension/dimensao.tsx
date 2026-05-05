import { FC, useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Referencia } from "../../interfaces/referencia/referencia_interface.tsx";
import { Dimensao } from "../../interfaces/dimensao/dimensao_interface.js";
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import "@assets/styles/index.css";
import "./style.css";
import api from "../../adapters/api.tsx";
import Footer from "../../components/layout/footer/footer.tsx";
import SubmenuDimensao from "./components/subMenuDimensao/submenuDimensao.tsx";
import FormContribuicao from "./components/formContribuicao/formContribuicao.tsx";
import HTMLFileIframe from "../kml/mapa/map4.tsx";
import { ConstContext, ConstContextType } from "../../context/const/script/ConstContext.ts";
const NODE_ENV = import.meta.env.VITE_NODE_ENV;

const DimensaoComponent: FC = () => {
  const { dimensao } = useParams();
  const { dimensoesCores } = useContext<ConstContextType>(ConstContext)
  const contadorIndicadoresCores = [
    {corLetra: '#c0392b', corBackground: '#c0392b22', corBorda: '#c0392b44'},
    {corLetra: '#27ae60', corBackground: '#27ae6022', corBorda: '#27ae6044'},
    {corLetra: '#2c3e7d', corBackground: '#2c3e7d22', corBorda: '#2c3e7d44'},
    {corLetra: '#b7950b', corBackground: '#b7950b22', corBorda: '#b7950b44'},
    {corLetra: '#148f77', corBackground: '#148f7722', corBorda: '#148f7744'},
    {corLetra: '#1e8449', corBackground: '#1e844922', corBorda: '#1e844944'},
    {corLetra: '#922b21', corBackground: '#922b2122', corBorda: '#922b2144'},
    {corLetra: '#1B4F9B', corBackground: '#1B4F9B22', corBorda: '#1B4F9B44'},
    {corLetra: '#d35400', corBackground: '#d3540022', corBorda: '#d3540044'},
  ]

  const dimensoesNomes: string[] = Object.keys(dimensoesCores)
  console.log(dimensoesNomes)
  const [dimensaoIndicadorContador, setDimensaoIndicadorContador] = useState<Record<string, any>>({})
  const [indicadores, setIndicadores] = useState<
    Array<Record<string, string | number | null>>
  >([]);
  const [referencias, setReferencias] = useState<Referencia[]>([]);
  const [dimensaoJson, setDimensao] = useState<Dimensao | null>(null);
  const [estudosComplementares, setEstudosComplementares] = useState<string[]>(
    [],
  );
  const url: string = `/dimensoes/${dimensao}/`;
  const navigate = useNavigate();


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
  const getPathHTML = () => {
    const mapasURL: Record<string, string> = {
      "Segurança": "https://victorsantiago.github.io/odsb_kmls/",
      "Ordenamento Territorial": "https://victorsantiago.github.io/odsb_ordenamento/"
    }
    const mapasURLConectividade: Record<string, string> = {
      "Cobertura Móvel": "https://victorsantiago.github.io/odsb_cobertura/",
      "Conectividade na Educação": "https://victorsantiago.github.io/odsb_escolas/",
      "Conectividade na Saúde": "https://victorsantiago.github.io/odsb_saude/"
    }
      if (dimensao === "Conectividade") {
        setPathHtml(mapasURLConectividade[botaoConectividade]);
      }
      else{
        setPathHtml(mapasURL[dimensao as string]);
      }
    }
  //--------------------------------------------------------------------------
  //useEffect para carregar os dados da dimensão para o iFrame

  //Utilizado quando a página é carregada pela primeira vez
  useEffect(() => {
    const getDimensao = async () => {
      const response = await api.get(url)
      setIndicadores([...response.data.indicadores].sort((a: any, b: any) => a.posicao - b.posicao));
      setDimensao(response.data.dimensao);
      setReferencias(response.data.referencias);
      setEstudosComplementares(response.data.estudos_complementares);
    }
    getDimensao()
    getPathHTML()
  },[])

  useEffect(() => {
    //
    //console.log(proximosIndicadoresNomes)
  }, [indicadores])
  //--------------------------------------------------------------------------
  useEffect(() => {
    const chavesDimensaoIndicadorContador = Object.keys(dimensaoIndicadorContador)
    if (chavesDimensaoIndicadorContador.length > 0) return

    const dimensaoIndicadorContadorTemp: Record<string, any> = {}
    dimensoesNomes.map((_, index: number) => {
      return dimensaoIndicadorContadorTemp[dimensoesNomes[index]] = contadorIndicadoresCores[index]
    })
    setDimensaoIndicadorContador(dimensaoIndicadorContadorTemp)
  }, [])

  useEffect(() => {
    getPathHTML()
  },[botaoConectividade])
  return (
    <div className="home-container">
      <NavbarComponent />
      <SubmenuDimensao dimensaoAtiva={dimensaoJson?.nome || ""} />
      <div className="dimensao-container">
        <div className="descricao" style={{ borderLeft: `5px solid ${dimensoesCores[dimensao as string]}` }}>
          <p>
            {dimensaoJson?.descricao}
          </p>
        </div>
        {pathHtml !== undefined && (
          <div className="mx-auto" style={{
            width: "100%",
            height: "41rem",
            marginBottom: dimensao === "Conectividade" ? "6rem" : "0",
            marginTop: dimensao === "Conectividade" ? "0" : "21px"
          }}>
            {dimensao === "Conectividade" && (
              <div className="mapasConectividade"
              >
                 {mapasConectividade.map((mapa) => {
                return (
                  <button
                  className={`${mapa === botaoConectividade ? "ativo" : ""}`}
                    value={mapa}
                    onClick={(event: any) => handleOnCick(event)}
                  >
                    {mapa}
                  </button>
                );
              })} 
              </div>
            )}
            {<HTMLFileIframe htmlFilePath={pathHtml}/>}
          </div>
        )}
        <div className="header-indicadores">
          <h2>Indicadores</h2>
          {dimensaoIndicadorContador[dimensao as string] !== undefined && <span className="contador-indicadores" style={{
            color: dimensaoIndicadorContador[dimensao as string]["corLetra"]!,
            backgroundColor: dimensaoIndicadorContador[dimensao as string]["corBackground"]!,
            borderColor: dimensaoIndicadorContador[dimensao as string]["corBorda"]!
          }}
          >{indicadores.length} indicadores</span>}
        </div>
        <div className="indicadores-grid">
          {indicadores.length > 0 &&
            indicadores.map((indicador, index) => (
              <div
                className="indicadores-grid-card"
                style={{ borderTop: `3px solid ${dimensoesCores[dimensao as string]}` }}
                onClick={() =>
                  {
                    let proximosIndicadoresNomes: string[] = []
                    indicadores.map((indicador) => proximosIndicadoresNomes.push(indicador.nome as string))
                    handleNavigateIndicador(indicador.nome as string, index + 1, proximosIndicadoresNomes)}
                }
              >
                <div className="indicadores-grid-card-numero" style={{ color: `${dimensoesCores[dimensao as string]}` }}>Indicador {index + 1}</div>
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
                estudosComplementares.map((estudoComplementar, indice) => (
                  <button
                    className="button-as-link"
                    style={indice === 0 ? { borderTop: "0" } : undefined}
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
            {referencias.map((referencia, indice) => (
              <ul className="secao-ref-estudoComplementar-lista-ul">
                <li style={indice === 0 ? {borderTop: "0"}: undefined}>
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
          formStyle={{ borderLeft: `5px solid ${dimensoesCores[dimensao as string]}` }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default DimensaoComponent;