export interface Indicador{
    id: number | null,
    nome: string,
    fkDimensao: number| null
}

export interface IndicadorResponse{
    nome:string,
    arquivo:string,
    descricaoGrafico: string | undefined,
    tituloGrafico: string,
    tipoGrafico: string
}

