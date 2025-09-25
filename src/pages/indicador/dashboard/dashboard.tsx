import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { FC, useRef } from "react";
import { DashboardProps } from "./interface/dashboard_interface.tsx";
import { MaterialReactTable } from "material-react-table";
import {
  PlotSeries,
  TreeMapSeries,
  PizzaSeries,
} from "./interface/dados_graficos_interface.tsx";

const plotOptions = (dashboard: DashboardProps) => {
  if (dashboard.tipoGrafico === "pie") {
    console.log(dashboard.dados);
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
    console.log(dashboard.dados);
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
  const dadosGraficosPizza: PizzaSeries[] = [];
  let finalDadosGraficos: any[] = [];

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
    const cols = dashboard.dados.map((coluna) => ({
      header: coluna.name,
      accessorKey: coluna.name,
    }));
    const tableData: Array<Record<string, string | number>> = [];
    const tableDataCols: Record<string, string | number> = {};
    colunas.map((coluna: string) => {
      tableDataCols[coluna] = "";
    });
    // for (let i = 0; i < dashboard.dados[0].data.length; i++) {
    //   tableData.push(tableDataCols);
    // }
    // cria objetos novos a cada iteração
    for (let i = 0; i < dashboard.dados[0].data.length; i++) {
      const row: Record<string, string | number> = {};
      for (const coluna of colunas) {
        row[coluna] = ""; // inicializa vazio
      }
      tableData.push(row);
    }

    /*
    const tableDataCopy: Array<Record<string, string | number>> = colunas.map(
      (obj, index) => {
        const name: string = obj;
        dashboard.dados[index].data.map(
          (dado: string | number, indexDentro: number) => {
            console.log(indexDentro);
            console.log(dado);
            console.log(name);
            tableData[indexDentro][name] = dado;
            console.log(tableData[indexDentro][name]);
          },
        );
      },
      ); */
    for (let index = 0; index < colunas.length; index++) {
      const name: string = colunas[index];

      for (
        let indexDentro = 0;
        indexDentro < dashboard.dados[index].data.length;
        indexDentro++
      ) {
        const dado: string | number = dashboard.dados[index].data[indexDentro];

        console.log(indexDentro);
        console.log(dado);
        console.log(name);

        tableData[indexDentro][name] = dado;

        console.log(tableData[indexDentro][name]);
      }
    }

    console.log(tableData);
    return React.createElement(MaterialReactTable, {
      columns: cols,
      data: tableData,
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
