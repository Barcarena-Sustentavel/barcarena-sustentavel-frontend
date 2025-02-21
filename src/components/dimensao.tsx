import { FC,useEffect, useState } from "react";
import { Referencia } from "../interfaces/referencia_interface";
import { Dimensao } from "../interfaces/dimensao_interface";
import { Link } from "react-router-dom";
import api from "../api";

export const DimensaoComponent:FC<{dimensao:string}> = ({dimensao}) => {
    const [url, setUrl] = useState<string>(`/dimensoes/${dimensao}/`);
    const [indicadores, setIndicadores] = useState<string[]>([]);
    const [referencias, setReferencias] = useState<Referencia[]>([]);
    const [dimensaoJson, setDimensao] = useState<Dimensao | null>(null);

    useEffect(() => {
        api.get(url).then((response) => {
            setDimensao(response.data.dimensao);
            setIndicadores(response.data.indicadores);
            setReferencias(response.data.referencias);
        })
    }, [url,dimensao])

    return(
        <div>
            <h1>{dimensaoJson?.nome}</h1>
            <h2>{dimensaoJson?.descricao}</h2>
            {indicadores.length > 0 && indicadores.map((indicador) => (
                <div>
                    <Link to={`/${dimensao}/${indicador}/`}> <h3>{indicador}</h3></Link>
                </div>
            ))}

            {referencias.length > 0 && referencias.map((referencia) => (
                <div>
                    <a href={`${referencia.link}`}></a> <h3>{referencia.nome}</h3>
                </div>
            ))}
        </div>
    )


}