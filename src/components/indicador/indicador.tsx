import { FC,useEffect, useState } from "react";
import { IndicadorDadosGrafico, DadosGrafico } from "../../interfaces/indicador_interface.tsx";
import { DashboardComponent } from "./dashboard/dashboard.tsx";
import api from "../../api.tsx";
import { useParams } from "react-router-dom";

const IndicadorComponent:FC = () => {
    const {dimensao, indicador} = useParams()
    const url:string = `/dimensoes/${dimensao}/indicador/${indicador}/`
    const [indicadorJson, setIndicadorJson] = useState<IndicadorDadosGrafico>({
        nome: '',
        graficos: []
    })

    useEffect(() => {
        api.get(url).then((response) => {
            setIndicadorJson(response.data)
        })
        console.log(indicadorJson)
    }, [url])

    return(
        <div>
            <h1>{indicadorJson.nome}</h1>
            {indicadorJson.graficos.map((grafico:DadosGrafico) => {
                return(
                    <div>
                        <div>
                        <DashboardComponent tipoGrafico={grafico.tipoGrafico} dados={grafico.dados} tituloGrafico={grafico.tituloGrafico} categorias={grafico.categoria}/>
                        <p>{grafico.descricaoGrafico != null ? grafico.descricaoGrafico:''}</p>
                    </div>
                    </div>
                )
            })}
        </div>
        
    )
}

export default IndicadorComponent