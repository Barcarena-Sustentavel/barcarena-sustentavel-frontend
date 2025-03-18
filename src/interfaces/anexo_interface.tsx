export interface Anexo{
    id: number | null,
    path: string,
    descricaoGrafico: string | null,
    tipoGrafico: string | null,
    fkIndicador: number | null,
    fkDimensao: number | null,
    fkKml: number | null,
    fkContribuicao: number | null,
}

