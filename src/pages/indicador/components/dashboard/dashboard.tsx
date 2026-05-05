import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { FC, useRef } from "react";
import { Treemap } from "./class/grafico/treemap.ts";
import { Scatter } from "./class/grafico/scatter.ts";
import { Pizza } from "./class/grafico/pizza.ts";
import { Tabela } from "./class/grafico/tabela.ts";
import { Grafico } from "./class/grafico/grafico.ts";

export const DashboardComponent: FC<{
  tipoGrafico: string;
  dados: number[][];
  colunas: string[];
  tituloGrafico: string | null;
  categorias: string[] | number[];
}> = ({ tipoGrafico, dados, categorias, colunas }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const gerarGrafico = ():Grafico => {
    const tiposGraficos:Record<string,any> = {
      "treemap": new Treemap(colunas, dados).gerarDados(),
      "pie": new Pizza(colunas, dados).gerarDados(),
      "scatter": new Scatter(colunas, dados).gerarDados(),
    }
    const grafico:Grafico = tiposGraficos[tipoGrafico] !== undefined ? tiposGraficos[tipoGrafico] : new Grafico(colunas, dados);

    return grafico
  }

  if (tipoGrafico !== "tabela") {
    const grafico:Grafico = gerarGrafico();
    const dadosGrafico = grafico.gerarDados();
    const plotOptions = grafico.plotOptions(tipoGrafico, dadosGrafico, categorias);
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={plotOptions}
        ref={chartComponentRef}
      />
    );
  }


  const tabela = new Tabela(colunas, dados);
  return tabela.gerarDados();
};
