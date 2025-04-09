import { FC,useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { Referencia } from "../../interfaces/referencia_interface.tsx";
import { Dimensao } from "../../interfaces/dimensao_interface.tsx";
import NavbarComponent from "../../components/layout/navbar/navbar.tsx";
import '@assets/styles/index.css'
import api from "../../api.tsx";
import Footer from "../../components/layout/footer/footer.tsx";
import SubmenuDimensao from "./components/submenuDimensao.tsx";

const DimensaoComponent:FC = () => {
    const { dimensao } = useParams();
    const [indicadores, setIndicadores] = useState<string[]>([]);
    const [referencias, setReferencias] = useState<Referencia[]>([]);
    const [dimensaoJson, setDimensao] = useState<Dimensao | null>(null);
    const url:string = `/dimensoes/${dimensao}/`;
    const navigate = useNavigate();

    const handleNavigate = (indicador:string) => {
        navigate(`/${dimensao}/${indicador}/`)
    }

    useEffect(() => {
        api.get(url).then((response) => {
            setDimensao(response.data.dimensao);
            setIndicadores(response.data.indicadores);
            setReferencias(response.data.referencias);
        })
    }, [url,dimensao])

    return(
        <div className="home-container">
            <NavbarComponent/>
            <SubmenuDimensao dimensaoAtiva={dimensaoJson?.nome || ""}/>
            <h1>{dimensaoJson?.nome}</h1>
            <h2>{dimensaoJson?.descricao}</h2>
            <ul>
            {indicadores.length > 0 && indicadores.map((indicador) => (
                <li>
                    <button onClick={() => handleNavigate(indicador)}>{indicador}</button>
                </li>
            ))}
            </ul>   
            {referencias.length > 0 && referencias.map((referencia) => (
                <div>
                    <a href={`${referencia.link}`}></a> <h3>{referencia.nome}</h3>
                </div>
            ))}
            <Footer/>
        </div>
    )
}

export default DimensaoComponent