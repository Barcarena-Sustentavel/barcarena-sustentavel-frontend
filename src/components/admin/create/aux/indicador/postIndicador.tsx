import api from "../../../../../api"
import {IndicadorResponse} from "../../../../../interfaces/indicador_interface"

export const postIndicador = async (dimensao:string|undefined, arrayGrafico:IndicadorResponse[]) => {

/*
export const postIndicador =  async (dimensao:string | undefined,indicador:string, pathAnexo: string, tipoGrafico: string, descricaoGrafico: string|undefined) => {

    const dadosIndicador:IndicadorResponse ={
        nome: indicador,
        arquivo: pathAnexo,
        descricaoGrafico: descricaoGrafico,
        tituloGrafico: indicador,
        tipoGrafico: tipoGrafico
    }
*/
    let responseArray:IndicadorResponse[]=[];

    for (let index = 0; index < arrayGrafico.length; index++) {
        await api.post(`/admin/dimensoes/${dimensao}/indicador/`, arrayGrafico[index]).then((response) => {
            responseArray.push(response.data)
        })
    }

    //const responseIndicador = await api.post(`/admin/dimensoes/${dimensao}/indicador/`, dadosIndicador)//.then((response) => {

    return responseArray
}