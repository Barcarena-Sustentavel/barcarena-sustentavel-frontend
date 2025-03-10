import api from "../../../../../api"
import {IndicadorResponse, GraficosIndicador} from "../../../../../interfaces/indicador_interface"

export const postIndicador = async (dimensao:string | undefined, indicador:string,arrayGrafico:GraficosIndicador[]) => {
    //console.log(arrayGrafico[0].arquivo?)
    let dadosIndicador:IndicadorResponse;
    dadosIndicador = {
            nome: indicador,
            graficos: arrayGrafico
        }
    console.log(dadosIndicador)
    const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Content-Type': 'application/json'
            }
        };
    await api.post(`/admin/dimensoes/${dimensao}/indicador/`, dadosIndicador, config)

    return dadosIndicador;
}