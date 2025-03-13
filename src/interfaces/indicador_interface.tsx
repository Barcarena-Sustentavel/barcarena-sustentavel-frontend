export interface IndicadorResponse{
    graficos: GraficosIndicador[]
}

interface Indicador{
    nome: string,
}

export interface GraficosIndicador{
    arquivo: File //FormData | null 
    descricaoGrafico: string,
    tituloGrafico: string,
    tipoGrafico: string
}

