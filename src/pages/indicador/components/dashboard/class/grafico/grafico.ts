export class Grafico {
    colunas: string[];
    dados: number[][];

    constructor(colunas: string[], dados: number[][])//, tipoGrafico:string)
    {
        this.colunas = colunas;
        this.dados = dados;
    }
    gerarGrafico(){}
}