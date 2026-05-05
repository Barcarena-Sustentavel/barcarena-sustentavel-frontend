import { Grafico } from "./grafico.ts";
import { PizzaSeries } from "../../../../../../interfaces/indicador/dados_graficos_interface.tsx";
import { Options } from "../interfaces/options/options.ts";
export class Pizza extends Grafico implements Options{
    dadosGraficosPizza: PizzaSeries[] = [];
    constructor(colunas: string[], dados: number[][]) {
        super(colunas, dados);
    }

    gerarDados(): PizzaSeries[]{
        {
            for (let i = 0; i < this.dados.length; i++) {
                this.dadosGraficosPizza.push({
                    name: this.colunas[i],
                    y: this.dados[i][0],
                });
            } return this.dadosGraficosPizza;
        }
    }
    plotOptions(tipoGrafico: string, dados: any[], categorias: string[] | number[]): Record<string, any> {
        return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: ""
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
        },
      },
      series: [
        {
          name: "Valor",
          data: dados,
        },
      ],
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
          }
        }
      },
    }
    }
}