import api from "../../../../api.tsx"
import {Indicador, GraficosIndicador} from "../../../../interfaces/indicador_interface.tsx"
import Swal from "sweetalert2"

export const postIndicador = async (dimensao:string | undefined, indicador:string,arrayGrafico:GraficosIndicador[]) => {
    const Indicador:Indicador = {
        nome: indicador
    }
    try{
        await api.post(`/admin/dimensoes/${dimensao}/indicador/`, Indicador)
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
        await Swal.fire({
                        title: 'Sucesso!',
                        text: 'Indicador adicionado com sucesso.',
                        icon: 'success',
                        confirmButtonColor: 'var(--primary-color)',
                      });
    }
    catch(error){
        console.error('Error submitting reference:', error);
                await Swal.fire({
                    title: 'Erro!',
                    text: 'Ocorreu um erro ao adicionar o indicador. Por favor, tente novamente.',
                    icon: 'error',
                    confirmButtonColor: 'var(--primary-color)',
                });
        console.log(error)
    }
}

export const patchIndicador = async (dimensao:string | undefined, antigoIndicador:string, novoIndicador: string, arrayGrafico:GraficosIndicador[]) => {
    const indicador:Indicador = {
        nome: ''
    }
    
    try{
        const novoIndicadorBool:boolean = novoIndicador !== antigoIndicador 
        if(novoIndicadorBool){
            indicador.nome = novoIndicador
            await api.patch(`/admin/dimensoes/${dimensao}/indicador/${antigoIndicador}`, {"indicadorNovo": indicador.nome})
        }
        else{
            indicador.nome = antigoIndicador
            
        }
        const formData = new FormData()
        for(let i = 0; i < arrayGrafico.length; i++){
            const endpoit = `/api/admin/dimensoes/${dimensao}/indicador/${indicador.nome}/anexos/${arrayGrafico[i].id}/`;
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
        await Swal.fire({
            title: 'Sucesso!',
            text: 'Indicador modificado com sucesso.',
            icon: 'success',
            confirmButtonColor: 'var(--primary-color)',
          });
    }
    catch(error){
        console.error('Error submitting reference:', error);
                await Swal.fire({
                    title: 'Erro!',
                    text: 'Ocorreu um erro ao adicionar o indicador. Por favor, tente novamente.',
                    icon: 'error',
                    confirmButtonColor: 'var(--primary-color)',
                });
        console.log(error)
    }
}