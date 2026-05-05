import { Grafico } from "./grafico.ts";
import { TreeMapSeries } from "../../../../../../interfaces/indicador/dados_graficos_interface.tsx";
import { Options } from "../interfaces/options/options.ts";
export class Treemap extends Grafico implements Options{
    dadosGraficosTrees: TreeMapSeries[] = [];
    constructor(colunas: string[], dados: number[][]) {
        super(colunas, dados);
    }
    gerarDados(): TreeMapSeries[] {
        for (let i = 0; i < this.dados.length; i++) {
            this.dadosGraficosTrees.push({
                name: this.colunas[i], //`Dado ${index + 1}`,
                value: this.dados[i][0],
                color: "#FF5733",
            });
        }
        return this.dadosGraficosTrees;
    }
    plotOptions(tipoGrafico: string, dados: any[], categorias: string[] | number[]): Record<string, any> {
        return {
            chart: {
                type: tipoGrafico,
            },

            title: {
                text: ""//dashboard.tituloGrafico ?? "",
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: "pointer",
                },
            },
            series: dados,
            exporting: {
                buttons: {
                    contextButton: {
                        menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
                    }
                }
            },
            xAxis: {
                categories: categorias,
            },
            yAxis: {
                title: {
                    text: ""//"Valores",
                },
            },
        };
    }
}
