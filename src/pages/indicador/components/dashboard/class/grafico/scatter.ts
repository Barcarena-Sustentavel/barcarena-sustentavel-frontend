import { Grafico } from "./grafico.ts";
import { ScatterProps } from "../../../../../../interfaces/indicador/dados_graficos_interface.tsx";
import { Options } from "../interfaces/options/options.ts";
export class Scatter extends Grafico implements Options{
  dadosGraficosScatter: ScatterProps[] = []; // Substitua 'any' pela sua interface de Series do Scatter

  constructor(colunas: string[], dados: number[][]) {
    super(colunas, dados);
  }

  gerarDados(): ScatterProps[] {
    const randomInt = (min: number, max: number): number =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const randomFloat = (min: number, max: number): number =>
      Math.random() * (max - min) + min;
    for (let i = 0; i < this.dados.length; i++) {
      // Geração de cores aleatórias
      const r = randomInt(0, 255);
      const g = randomInt(0, 255);
      const b = randomInt(0, 255);
      const a = Number(randomFloat(0.3, 1).toFixed(2));
      const color = `rgba(${r}, ${g}, ${b}, ${a})`;

      const dataScatter: number[][] = [];

      // Transformando os dados para o formato [x, y]
      this.dados[i].forEach((valor, index) => {
        // Usamos o index como X para espalhar os pontos horizontalmente
        dataScatter.push([index, valor]);
      });

      this.dadosGraficosScatter.push({
        name: this.colunas[i],
        color: color,
        data: dataScatter,
      });
    }

    return this.dadosGraficosScatter;
  }

  plotOptions(tipoGrafico: string, dados: any[], categorias: string[] | number[]): Record<string, any> {
    return{
      chart: {
                type: tipoGrafico,
                zooming: {
                    type: 'xy'
                }
            },

            title: {
                text: ""//dashboard.tituloGrafico ?? "",
            },
            xAxis: {
                title: {
                    text: 'y'
                },
                gridLineWidth: 1,
            },
            yAxis: {
                title: {
                    text: 'x'
                }, gridLineWidth: 1
            },
            legend: {
                enabled: true
            },
            series: this.dados,
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