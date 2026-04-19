export class PlotOptions{
    tipoGrafico: string;
    dados:any[]
    categorias: string[] | number[];

    constructor(tipoGrafico:string = '', dados:any[] = [], categorias: string[] | number[] = []){
        this.tipoGrafico = tipoGrafico;
        this.dados = dados;
        this.categorias = categorias;
    }

    gerarPlotOptions(){}
}