import { Grafico } from "./grafico.ts";
import { ScatterProps } from "../../../../../../../interfaces/indicador/dados_graficos_interface.tsx";
export class Scatter extends Grafico {
  dadosGraficosScatter: ScatterProps[] = []; // Substitua 'any' pela sua interface de Series do Scatter

  constructor(colunas: string[], dados: number[][]) {
    super(colunas, dados);
  }

  randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min; 

  randomFloat = (min: number, max: number): number =>
  Math.random() * (max - min) + min; 

  gerarGrafico(): ScatterProps[] {
    for (let i = 0; i < this.dados.length; i++) {
      // Geração de cores aleatórias
      const r = this.randomInt(0, 255);
      const g = this.randomInt(0, 255);
      const b = this.randomInt(0, 255);
      const a = Number(this.randomFloat(0.3, 1).toFixed(2));
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
}