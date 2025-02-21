import api from "../../../../../api"
import { Indicador } from "../../../../../interfaces/indicador_interface"
import { Anexo } from "../../../../../interfaces/anexo_interface"
import { PostIndicadorInterface } from "../../../../../interfaces/admin_interfaces/post_indicador_interface"

export const postIndicador =  async (dimensao:string | undefined,indicador:string, pathAnexo: File | undefined, tipoGrafico: string|null, descricaoGrafico: string|null) => {
    const indicadorInterface:Indicador = {
        id: null,
        nome: indicador,
        fkDimensao: null
    }

    const anexoInterface:Anexo = {
        id: null,
        path: `./images/${pathAnexo?.name}`,
        tipoGrafico: tipoGrafico,
        descricaoGrafico: descricaoGrafico,
        fkIndicador: null,
        fkDimensao: null,
        fkKml: null,
        fkContribuicao: null
    }

    const data:PostIndicadorInterface= {
        dadosIndicador: indicadorInterface,
        dadosAnexo: anexoInterface
    }

    const responseIndicador = await api.post(`/dimensoes/${dimensao}/${indicador}/`, data)//.then((response) => {
    //).catch((error) => {
    //   console.log(error.response.data)
    //)

    return responseIndicador
}