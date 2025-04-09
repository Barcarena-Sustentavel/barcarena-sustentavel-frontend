import { FC,useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { Referencia } from "../../interfaces/referencia_interface.tsx";
import { Dimensao } from "../../interfaces/dimensao_interface.tsx";
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import '@assets/styles/index.css'
import './dimensao.css'
import api from "../../api.tsx";
import Footer from "../../components/layout/footer/footer.tsx";
import SubmenuDimensao from "./components/submenuDimensao.tsx";
import FormContribuicao from "./components/formContribuicao.tsx";
import Swal from "sweetalert2";
const NODE_ENV = import.meta.env.VITE_NODE_ENV

const DimensaoComponent:FC = () => {
    const { dimensao } = useParams();
    const [indicadores, setIndicadores] = useState<string[]>([]);
    const [referencias, setReferencias] = useState<Referencia[]>([]);
    const [dimensaoJson, setDimensao] = useState<Dimensao | null>(null);
    const url:string = `/dimensoes/${dimensao}/`;
    const navigate = useNavigate();
    const coresBordas = [
        'var(--secondary-green)',
        'var(--primary-blue)',
        'var(--secondary-darkblue)',
        'var(--secondary-light-blue)',
        'var(--secondary-orange)'
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
            descricao: "Indicadores relacionados ao sistema educacional brasileiro"
        },
        indicadores: [
          "Taxa de alfabetização",
          "Anos médios de estudo",
          "Investimento em educação (% do PIB)"
        ],
        referencias: [
          {
            id: 1,
            nome: "IBGE - Educação",
            link: "https://www.ibge.gov.br/educacao",
            fkDimensao: "1"
          },
          {
            id:2,
            nome: "INEP - Indicadores Educacionais",
            link: "https://www.inep.gov.br/indicadores",
            fkDimensao: "2"
          }
        ]
      };
      

    const handleNavigate = (indicador:string) => {
        navigate(`/${dimensao}/${indicador}/`)
    }
    
    
    useEffect(() => {
        if(NODE_ENV=="development"){
            setDimensao(mockData.dimensao);
            setIndicadores(mockData.indicadores);
            setReferencias(mockData.referencias);
        }else{api.get(url).then((response) => {
            setDimensao(response.data.dimensao);
            setIndicadores(response.data.indicadores);
            setReferencias(response.data.referencias);
        })}
    }, [url,dimensao])

    return(
        <div className="home-container">
            <NavbarComponent/>
            <SubmenuDimensao dimensaoAtiva={dimensaoJson?.nome || ""}/>
            <div className="container dimension-details-container">
                <h1>{dimensaoJson?.nome}</h1>
                <div className="descricao">
                    <p style={{ borderLeft: `5px solid ${getProximaCor()}` }}>{dimensaoJson?.descricao}</p>
                </div>
                <h1 className="mt-2">Indicadores mais importantes</h1>
                <div className="descricao">
                {indicadores.length > 0 && (
                    <p style={{ borderLeft: `5px solid ${getProximaCor()}` }}>
                        {indicadores.reduce((acc, indicador) => acc ? `${acc}; ${indicador}` : indicador, '')}
                    </p>
                )}
                </div>
            </div>
            <div className="container dimension-details-container">
                <h1>Dados Levantados</h1>
                <ul className="indicadores">
                {indicadores.length > 0 && indicadores.map((indicador) => (
                    <li style={{ borderLeft: `5px solid ${getProximaCor()}` }}>
                        <button className="button-as-link" onClick={() => handleNavigate(indicador)}>{indicador}</button>
                    </li>
                ))}
                </ul>
            </div>
            <div className="container dimension-details-container mt-5 d-flex flex-column">
                <h1>Referências</h1>
                {referencias.length > 0 && referencias.map((referencia) => (                
                    <ul className="referencias mt-5">
                        <li style={{ borderLeft: `5px solid ${getProximaCor()}` }}><a className="custom-link-tooplate-gotto-job" href={`${referencia?.link}`} target="_blank">{`${referencia?.nome}`}</a></li>
                    </ul>
                ))}
            </div>
            <FormContribuicao dimensaoId={0} formStyle ={{borderLeft: `5px solid ${getProximaCor()}`}}/>
            <Footer/>
        </div>
    )
}

export default DimensaoComponent