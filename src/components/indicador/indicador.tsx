import { FC,useEffect, useState } from "react";
import { Indicador } from "../../interfaces/indicador_interface";
import { Anexo } from "../../interfaces/anexo_interface";
import { DashboardComponent } from "./dashboard/dashboard";
import api from "../../api";

export const IndicadorComponent:FC<{dimensao:string,indicador:string}> = 
    ({dimensao,indicador}) => {
    const [url, setUrl] = useState<string>(`/dimensoes/${dimensao}/${indicador}/`);
    const [indicadorJson, setIndicador] = useState<Indicador | null>(null);
    const [anexo, setAnexo] = useState<Anexo | null>(null);
    const [tipoGrafico, setTipoGrafico] = useState<'line' | 'column' | 'bar' | 'pie' | 'scatter'>()
    
    useEffect(() => {
        api.get(url).then((response) => {
            setIndicador(response.data.indicador);
            setAnexo(response.data.anexo);
        })
    }, [url,dimensao,indicador])

    return(
        <DashboardComponent tipo={anexo?.tipoGrafico} dados={anexo?.dados} titulo={indicadorJson?.titulo}/>
    )
}