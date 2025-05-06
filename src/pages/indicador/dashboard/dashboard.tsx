import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { FC, useRef } from "react";
import { DashboardProps } from "./interface/dashboard_interface.tsx";
import { PlotSeries, TreeMapSeries, PizzaSeries } from "./interface/dados_graficos_interface.tsx";

const plotOptions = (dashboard: DashboardProps) => {
  
  if (dashboard.tipoGrafico === "pie"){
    console.log(dashboard.dados)
    return  {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: dashboard.tituloGrafico ?? ""
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer'
          }
      },
      series: [{
          name: 'Valor',
          data: dashboard.dados
      }]
  }
  }

  if (dashboard.tipoGrafico === "xy") {
    console.log(dashboard.dados);
    const dadoColuna =  {
      name: dashboard.dados[0].name,
      data: dashboard.dados[0].data,
      type: "spline",
    }//Salva somente o primeiro array para que este seja a linha
    dashboard.dados.splice(0, 1);//Remove o primeiro array, e modifica permanentemente o array original
    const dadosLinha = dashboard.dados
    for (let index = 0; index < dadosLinha.length; index++) {
      dadosLinha[index].type = "column"
    }
    const dadosSeries = [dadoColuna, ...dadosLinha]
    return {
      chart: {
        zooming: {
          type: "xy",
        }
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
  } 
  
  else if (tipoGrafico === "pie") {
    for (let i = 0; i < dados.length; i++) {
      dadosGraficosPizza.push({
        name: colunas[i], 
        y: dados[i][0],
      });
    }
    finalDadosGraficos = dadosGraficosPizza;
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
