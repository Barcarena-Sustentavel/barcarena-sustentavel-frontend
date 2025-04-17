import api from "../../../../api.tsx"
import {Indicador, GraficosIndicador} from "../../../../interfaces/indicador_interface.tsx"

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
        const endpoit = `/api/admin/dimensoes/${dimensao}/indicador/${indicador}/anexos/`
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
}

export const patchIndicador = async (dimensao:string | undefined, antigoIndicador:string, novoIndicador: string, arrayGrafico:GraficosIndicador[]) => {
    const indicador:Indicador = {
        nome: ''
    }
    try {
        const novoIndicadorBool:boolean = novoIndicador !== antigoIndicador 
        if(novoIndicadorBool){
            indicador.nome = novoIndicador
            await api.patch(`/admin/dimensoes/${dimensao}/indicador/${antigoIndicador}`, {"indicadorNovo": indicador.nome})
        }
        else{
            indicador.nome = antigoIndicador
            
        }
    } catch (error) {
        console.log(error)  
    }
    
    try{
        const formData = new FormData()
        for(let i = 0; i < arrayGrafico.length; i++){
            const endpoit = `/api/admin/dimensoes/${dimensao}/indicador/${indicador.nome}/anexos/${arrayGrafico[i].id}/`;
            //void (arrayGrafico[i].arquivo !== '' ? formData.append('grafico', arrayGrafico[i].arquivo) : null) //formData.append('grafico', ))
            //void (arrayGrafico[i].descricaoGrafico !== '' ? formData.append('descricaoGrafico', arrayGrafico[i].descricaoGrafico) : null)//formData.append('descricaoGrafico', ''))
            //void (arrayGrafico[i].tituloGrafico !== '' ? formData.append('tituloGrafico', arrayGrafico[i].tituloGrafico) : null)//formData.append('tituloGrafico', ''))
            //void (arrayGrafico[i].tipoGrafico !== '' ? formData.append('tipoGrafico', arrayGrafico[i].tipoGrafico) : null) //formData.append('tipoGrafico', ''))
            //formData.append('grafico', arrayGrafico[i].arquivo)
            void (arrayGrafico[i].arquivo instanceof File ? formData.append('grafico', arrayGrafico[i].arquivo) : null)
            formData.append('descricaoGrafico', arrayGrafico[i].descricaoGrafico)
            formData.append('tituloGrafico', arrayGrafico[i].tituloGrafico)
            formData.append('tipoGrafico', arrayGrafico[i].tipoGrafico)
            console.log(formData)
            await fetch(endpoit, {
                method: 'PATCH', 
                body: formData
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    catch(error){
        console.log(error)
    }
}