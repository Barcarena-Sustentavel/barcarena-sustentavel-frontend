import { error } from "highcharts";
import api from "../../../../../api"
import {IndicadorResponse, GraficosIndicador} from "../../../../../interfaces/indicador_interface"

export const postIndicador = async (dimensao:string | undefined, indicador:string,arrayGrafico:GraficosIndicador[]) => {

    try{
        await api.post(`/admin/dimensoes/${dimensao}/indicador/`, {indicadorNovo:indicador})
    }
    catch(error){
        console.log(error)
    }

    try{
        const endpoit = `http://0.0.0.0:8081/admin/dimensoes/${dimensao}/indicador/${indicador}/anexos/`
        const formData = new FormData()
        for(let i = 0; i < arrayGrafico.length; i++){
            formData.append('arquivo', arrayGrafico[i].arquivo)
            formData.append('descricaoGrafico', arrayGrafico[i].descricaoGrafico)
            formData.append('tituloGrafico', arrayGrafico[i].tituloGrafico)
            formData.append('tipoGrafico', arrayGrafico[i].tipoGrafico)
            
            await fetch(endpoit, {
                method: 'POST', 
                headers:{
                    'Content-Type': 'multipart/form-data'
                },
                body: arrayGrafico[i].arquivo
            })
        }
    }
    catch(error){
        console.log(error)
    }

    //try{
        //await api.post(`/admin/dimensoes/${dimensao}/indicador/`, dadosIndicador)
        //const formData = new FormData();
        const endpoit = `http://0.0.0.0:8081/admin/dimensoes/${dimensao}/indicador/`
        const response = await fetch(endpoit,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosIndicador)
        }).catch((error) => {
            console.log(error)
        })
    //}
    //catch(error){
    //    console.log(error)
    //}
    return dadosIndicador;
}