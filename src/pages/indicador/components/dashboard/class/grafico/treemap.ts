import { Grafico } from "./grafico.ts";
import { TreeMapSeries } from "../../../../../../interfaces/indicador/dados_graficos_interface.tsx";
export class Treemap extends Grafico {
    dadosGraficosTrees: TreeMapSeries[] = [];
    constructor(colunas: string[], dados: number[][]) {
        super(colunas, dados);
    }
    gerarPlotOptions(){}
    gerarGrafico(): TreeMapSeries[] {
        for (let i = 0; i < this.dados.length; i++) {
            this.dadosGraficosTrees.push({
                name: this.colunas[i], //`Dado ${index + 1}`,
                value: this.dados[i][0],
                color: "#FF5733",
            });
        }
        return this.dadosGraficosTrees;
    }
}
