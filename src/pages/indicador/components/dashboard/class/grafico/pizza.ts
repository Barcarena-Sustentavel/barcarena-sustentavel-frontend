import { Grafico } from "./grafico.ts";
import { PizzaSeries } from "../../../../../../../interfaces/indicador/dados_graficos_interface.tsx";
export class Pizza extends Grafico {
    dadosGraficosPizza: PizzaSeries[] = [];
    constructor(colunas: string[], dados: number[][]) {
        super(colunas, dados);
    }

    gerarGrafico(): PizzaSeries[]{
        {
            for (let i = 0; i < this.dados.length; i++) {
                this.dadosGraficosPizza.push({
                    name: this.colunas[i],
                    y: this.dados[i][0],
                });
            } return this.dadosGraficosPizza;
        }
    }
}