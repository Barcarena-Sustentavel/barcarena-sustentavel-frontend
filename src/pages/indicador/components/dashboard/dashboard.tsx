import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { FC, useRef } from "react";
import { DashboardProps } from "../../../../interfaces/indicador/dashboard_interface.tsx";
import { Treemap } from "./class/grafico/treemap.ts";
import { Scatter } from "./class/grafico/scatter.ts";
import { Pizza } from "./class/grafico/pizza.ts";
import { DemaisPlot } from "./class/grafico/demaisPlots.ts";
import { Tabela } from "./class/grafico/tabela.ts";
import { PlotOptionsPizza } from "./class/plotOptions/pizza.ts";
import { PlotOptionsXY } from "./class/plotOptions/xy.ts";
import { PlotOptionsScatter } from "./class/plotOptions/scatter.ts";
import { DemaisPlotsPlotOptions } from "./class/plotOptions/demaisPlotsPlotOptions.ts";

export const DashboardComponent: FC<{
  tipoGrafico: string;
  dados: number[][];
  colunas: string[];
  tituloGrafico: string | null;
  categorias: string[] | number[];
}> = ({ tipoGrafico, dados, tituloGrafico, categorias, colunas }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const plotOptions = (dashboard: DashboardProps) => {
    if (dashboard.tipoGrafico === "pie") {
      return new PlotOptionsPizza(dashboard.dados).gerarPlotOptions();
    }

    if (dashboard.tipoGrafico === "xy") {
      return new PlotOptionsXY(dashboard.dados, dashboard.categorias).gerarPlotOptions()
    };

    if (dashboard.tipoGrafico === "scatter") {
      return new PlotOptionsScatter(dashboard.tipoGrafico, dashboard.categorias).gerarPlotOptions()
    }
    return new DemaisPlotsPlotOptions(dashboard.tipoGrafico, dashboard.dados, dashboard.categorias).gerarPlotOptions();
  };

  const gerarTipoGrafico = (dados: number[][], colunas: string[]) => {
    if (tipoGrafico === "treemap") return new Treemap(colunas, dados).gerarGrafico();
    if (tipoGrafico === "pie") return new Pizza(colunas, dados).gerarGrafico();
    if (tipoGrafico === "scatter") return new Scatter(colunas, dados).gerarGrafico();
    return new DemaisPlot(colunas, dados).gerarGrafico();
  }

  if (tipoGrafico !== "tabela") {
    const finalDadosGraficos = gerarTipoGrafico(dados, colunas);
    const finalPlotOptions = plotOptions({
      tipoGrafico,
      dados: finalDadosGraficos,
      categorias,
    })
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={finalPlotOptions}
        ref={chartComponentRef}
      />
    );
  }
  const tabela = new Tabela(colunas, dados);
  return tabela.gerarGrafico();
};
