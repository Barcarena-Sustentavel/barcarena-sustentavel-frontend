export interface Indicador{
    nome: string,
}

export interface GraficosIndicador{
    id: number | null,
    arquivo: File //| string, //| null
    descricaoGrafico: string, //| null,
    tituloGrafico: string, //| undefined,
    tipoGrafico: string //| undefined
}

export interface IndicadorResponse{
    graficos: GraficosIndicador[]
}

export interface DadosGrafico{
    tituloGrafico: string | null,
    descricaoGrafico: string | null,
    tipoGrafico: string,
    dados: number[][],
    colunas: string[], 
    categoria: string[] | number[]
}

export interface IndicadorDadosGrafico extends Indicador{
    graficos: DadosGrafico[]
}



