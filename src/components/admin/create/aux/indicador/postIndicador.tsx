//import { error } from "highcharts";
<<<<<<< HEAD
import api from "../../../../../api"
import {Indicador, GraficosIndicador} from "../../../../../interfaces/indicador_interface"
=======
import api from "../../../../../api.tsx"
import {Indicador, GraficosIndicador} from "../../../../../interfaces/indicador_interface.tsx"
>>>>>>> 58089f24 (Dockerfile funcionand)

export const postIndicador = async (dimensao:string | undefined, indicador:string,arrayGrafico:GraficosIndicador[]) => {
    const Indicador:Indicador = {
        nome: indicador
    }

    try{
        await api.post(`/admin/dimensoes/${dimensao}/indicador/`, Indicador)
    }
    catch(error){
        console.log(error)
    }

    try{
        const endpoit = `http://0.0.0.0:8081/admin/dimensoes/${dimensao}/indicador/${indicador}/anexos/`
        const formData = new FormData()
        for(let i = 0; i < arrayGrafico.length; i++){
            formData.append('grafico', arrayGrafico[i].arquivo)
            formData.append('descricaoGrafico', arrayGrafico[i].descricaoGrafico)
            formData.append('tituloGrafico', arrayGrafico[i].tituloGrafico)
            formData.append('tipoGrafico', arrayGrafico[i].tipoGrafico)
            console.log(formData)
            await fetch(endpoit, {
                method: 'POST', 
                body: formData
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    catch(error){
        console.log(error)
    }
    //return dadosIndicador;
}