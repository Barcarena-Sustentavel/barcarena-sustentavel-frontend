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
      "treemap": new Treemap(colunas, dados),
      "pie": new Pizza(colunas, dados),
      "scatter": new Scatter(colunas, dados),
    }
    const grafico:Grafico = tiposGraficos[tipoGrafico] !== undefined ? tiposGraficos[tipoGrafico] : new Grafico(colunas, dados);
    console.log("grafico", grafico)
    return grafico
  }

  if (tipoGrafico !== "tabela") {
    const grafico:Grafico = gerarGrafico();
    //console.log("grafico", grafico)
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
