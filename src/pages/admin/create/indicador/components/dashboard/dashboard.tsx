import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { FC, useRef } from "react";
import { DashboardProps } from "../../../../../indicador/dashboard/interface/dashboard_interface.tsx";
import { MaterialReactTable } from "material-react-table";
import {
  PlotSeries,
  PizzaSeries,
  TreeMapSeries,
} from "../../../../../indicador/dashboard/interface/dados_graficos_interface.tsx";

const plotOptions = (dashboard: DashboardProps) => {
  if (dashboard.tipoGrafico === "pie") {
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: dashboard.tituloGrafico ?? "",
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
          data: dashboard.dados,
        },
      ],
    };
  }

  if (dashboard.tipoGrafico === "xy") {
    const dadoColuna = {
      name: dashboard.dados[0].name,
      data: dashboard.dados[0].data,
      type: "spline",
    }; //Salva somente o primeiro array para que este seja a linha
    dashboard.dados.splice(0, 1); //Remove o primeiro array, e modifica permanentemente o array original
    const dadosLinha = dashboard.dados;
    for (let index = 0; index < dadosLinha.length; index++) {
      dadosLinha[index].type = "column";
    }
    const dadosSeries = [dadoColuna, ...dadosLinha];
    return {
      chart: {
        zooming: {
          type: "xy",
        },
      },
      title: {
        text: dashboard.tituloGrafico ?? "",
      },
      series: dadosSeries,
      xAxis: {
        categories: dashboard.categorias,
      },
      yAxis: {
        title: {
          text: "Valores",
        },
      },
    };
  }

  return {
    chart: {
      type: dashboard.tipoGrafico,
    },
    title: {
      text: dashboard.tituloGrafico ?? "",
    },
    series: dashboard.dados,
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

export const DashboardComponentPreview: FC<{
  tipoGrafico: string;
}> = ({ tipoGrafico }) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const dadosGraficoPlots: PlotSeries[] = [];
  const dadosGraficosTrees: TreeMapSeries[] = [];
  const dadosGraficosPizza: PizzaSeries[] = [];
  let finalDadosGraficos: any[] = [];
  const tituloGrafico = "Grafico Exemplo";
  const colunas: string[] = ["ex1, ex2, ex3, exx4"];
  const categorias: string[] | number[] = [
    "categoria1",
    "categoria2",
    "categoria3",
    "categoria4",
  ];
  const dados: number[][] = [
    [10, 20, 30, 40],
    [15, 25, 35, 45],
    [20, 30, 40, 50],
    [25, 35, 45, 55],
  ];
  if (tipoGrafico === "treemap") {
    for (let i = 0; i < dados.length; i++) {
      dadosGraficosTrees.push({
        name: colunas[i], //`Dado ${index + 1}`,
        value: dados[i][0],
        color: "#FF5733",
      });
    }
    finalDadosGraficos = dadosGraficosTrees;
  } else if (tipoGrafico === "pie") {
    for (let i = 0; i < dados.length; i++) {
      dadosGraficosPizza.push({
        name: colunas[i],
        y: dados[i][0],
      });
    }
    finalDadosGraficos = dadosGraficosPizza;
  } else {
    dados.forEach((dado, index) => {
      dadosGraficoPlots.push({
        name: colunas[index], //`Dado ${index + 1}`,
        data: dado,
      });
    });
    finalDadosGraficos = dadosGraficoPlots;
  }
  const dashboard: DashboardProps = {
    tipoGrafico: tipoGrafico,
    dados: finalDadosGraficos,
    tituloGrafico,
    categorias,
  };
  if (dashboard.tipoGrafico === "tabela") {
    const cols = colunas.map((categoria) => ({
      header: categoria,
      accessorKey: "data",
    }));

    const employeeData = dashboard.dados.map((dado, index) => ({
      id: index + 1,
      ...dado,
    }));

    return React.createElement(MaterialReactTable, {
      columns: cols,
      data: employeeData,
      enableColumnActions: false,
      enableColumnFilters: false,
      enablePagination: true,
      enableSorting: true,
      enableBottomToolbar: true,
      enableTopToolbar: true,
      muiTableBodyRowProps: ({ row }) => ({
        sx: {
          cursor: "pointer",
          backgroundColor: row.index % 2 === 0 ? "#f5f5f5" : "white",
        },
      }),
    });
  }
  if (dashboard.tipoGrafico === "") {
    return;
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
