import { Grafico } from "./grafico.ts";
import { PlotSeries } from "../../../../../../interfaces/indicador/dados_graficos_interface.tsx";

export class DemaisPlot extends Grafico {
    constructor(colunas: string[], dados: number[][]) {
        super(colunas, dados);
    }

    gerarGrafico(): PlotSeries[] {
        const dadosGraficoPlots: PlotSeries[] = [];
        this.dados.forEach((dado, index) => {
            dadosGraficoPlots.push({
                name: this.colunas[index], //`Dado ${index + 1}`,
                data: dado,
            });
        });
        return dadosGraficoPlots;
    }
}