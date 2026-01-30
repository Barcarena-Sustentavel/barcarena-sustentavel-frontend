import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
//import 'highcharts/modules/exporting';
import '../../../utils/highcharts/heatmap.js';
import React, { FC, useRef } from "react";
import { DashboardProps } from "./interface/dashboard_interface.tsx";
import { MaterialReactTable } from "material-react-table";
import {
  PlotSeries,
  TreeMapSeries,
  PizzaSeries,
  ScatterProps
} from "./interface/dados_graficos_interface.tsx";
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

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
      exporting: {
        buttons: {
            contextButton: {
                menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
            }
        }
    },
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
      exporting: {
        buttons: {
            contextButton: {
                menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
            }
        }
    },
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

  if(dashboard.tipoGrafico === "scatter"){
    return{
      chart:{
        type: dashboard.tipoGrafico,
        zooming: {
                type: 'xy'
            }
      },
       title: {
        text: dashboard.tituloGrafico ?? "",
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
            },gridLineWidth: 1
        },
         legend: {
            enabled: true
        },
        series: dashboard.dados,
        exporting: {
        buttons: {
            contextButton: {
                menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
            }
        }
    },    }
  }
  return {
    chart: {
      type: dashboard.tipoGrafico,
    },
    title: {
      text: dashboard.tituloGrafico ?? "",
    },
    series: dashboard.dados,
    exporting: {
        buttons: {
            contextButton: {
                menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
            }
        }
    },
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

//Utilizada para gerar números inteiros para o rgb do rgba
const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min; 

//Utilizada para gerar o 'a' do rgba
const randomFloat = (min: number, max: number): number =>
  Math.random() * (max - min) + min; 


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
  const dadosGraficosScatter: ScatterProps[] = [];
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
  } 
  else if( tipoGrafico === "scatter"){
    for (let i = 0; i < dados.length; i++) {
      const r = randomInt(0,255)
      const g = randomInt(0,255)
      const b = randomInt(0,255)
      const a = Number(randomFloat(0.3, 1).toFixed(2)); 
      const color = `rgba(${r}, ${g}, ${b}, ${a})`;

      const dataScatter: number[][] = [];
      dados[i].forEach((_, index) => {
        dataScatter.push([dados[i][index], dados[i][index]]);
      })
      //dataScatter.push(dados[i]);

      dadosGraficosScatter.push({
        name: colunas[i],
        //id: colunas[i],
        color: color,
        //marker: {symbol: 'circle'},
        data: dataScatter,
      });
    }
    console.log(dadosGraficosScatter)
    finalDadosGraficos = dadosGraficosScatter;
  }
  else {
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

    for (let i = 0; i < dashboard.dados[0].data.length; i++) {
      const row: Record<string, string | number> = {};
      for (const coluna of colunas) {
        row[coluna] = ""; // inicializa vazio
      }
      tableData.push(row);
    }

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

    return React.createElement(MaterialReactTable, {
      columns: cols,
      data: tableData,
      enableColumnActions: false,
      enableColumnFilters: false,
      enablePagination: true,
      enableSorting: true,
      enableBottomToolbar: true,
      enableTopToolbar: true,
      enableFullScreenToggle: false,
      enableStickyHeader: true,
      localization: MRT_Localization_PT_BR,
      // Configuração visual padrão (sem a lógica complexa de tela cheia)
      muiTablePaperProps: {
        sx: {
          display: 'flex',
          flexDirection: 'column',
          height: '100%', // Ocupa a altura da div pai
          width: '100%',
          boxShadow: 'none', // Opcional: remove sombra se preferir visual "flat"
        },
      },

      // Área de dados com rolagem
      muiTableContainerProps: {
        sx: {
          flexGrow: 1,
          height: '0px',     // Mantém o truque para respeitar o flexbox do pai
          minHeight: '0px',
          overflow: 'auto',  // Barra de rolagem apenas nos dados
        },
      },

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
