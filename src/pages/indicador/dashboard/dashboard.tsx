import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import { FC, useRef } from "react";

interface PlotSeries {
  name: string;
  data: number[];
}

interface TreeMapSeries {
  name: string;
  value: number;
}

interface DashboardProps {
  tipoGrafico: string;
  tituloGrafico: string | null;
  dados: PlotSeries[];
  categorias: string[] | number[];
}

const plotOptions = (dashboard: DashboardProps) => {
  const seriesDados =
    dashboard.tipoGrafico === "treemap"
      ? [
          {
            type: dashboard.tipoGrafico,
            layoutAlgorithm: "squarified",
            data: dashboard.dados,
          },
        ]
      : dashboard.dados;

  return {
    chart: {
      type: dashboard.tipoGrafico,
    },
    title: {
      text: dashboard.tituloGrafico ?? "",
    },
    //series: dashboard.dados,
    series: seriesDados,
    xAxis: {
      categories: dashboard.categorias,
    },
    yAxis: {
      title: {
        text: "Valores",
      },
    },
  };
};

export const DashboardComponent: FC<{
  tipoGrafico: string;
  dados: number[][];
  colunas: string[];
  tituloGrafico: string | null;
  categorias: string[] | number[];
}> = ({ tipoGrafico, dados, tituloGrafico, categorias, colunas }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const dadosGraficoPlots: PlotSeries[] = [];
  const dadosGraficosTrees: TreeMapSeries[] = [];
  let finalDadosGraficos: any[] = [];
  if (tipoGrafico === "treemap") {
    for (let i = 0; i < dados.length; i++) {
      dadosGraficosTrees.push({
        name: colunas[i], //`Dado ${index + 1}`,
        value: dados[i][0],
      });
    }
    finalDadosGraficos = dadosGraficosTrees;
  } else {
    dados.forEach((dado, index) => {
      dadosGraficoPlots.push({
        name: colunas[index], //`Dado ${index + 1}`,
        data: dado,
      });
    });
    finalDadosGraficos = dadosGraficoPlots;
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={plotOptions({
        tipoGrafico,
        dados: finalDadosGraficos,
        tituloGrafico,
        categorias,
      })}
      ref={chartComponentRef}
    />
  );
};
