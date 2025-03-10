export interface IndicadorResponse extends Indicador{
    graficos: GraficosIndicador[]
}

//export interface Indicador{
interface Indicador{
    //id: number | null,
    nome: string,
    //fkDimensao: number| null
}

export interface GraficosIndicador{
    //arquivo: string,
    arquivo: File | undefined,
    descricaoGrafico: string | null,
    tituloGrafico: string,
    tipoGrafico: string
}

