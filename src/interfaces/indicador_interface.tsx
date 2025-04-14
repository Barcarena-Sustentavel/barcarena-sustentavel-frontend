export interface Indicador{
    nome: string,
}

export interface GraficosIndicador{
    arquivo: File
    descricaoGrafico: string,
    tituloGrafico: string,
    tipoGrafico: string
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



