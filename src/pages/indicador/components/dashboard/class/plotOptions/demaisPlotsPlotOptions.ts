import { PlotOptions } from "./plotOptions.ts";

export class DemaisPlotsPlotOptions extends PlotOptions{
    constructor(tipoGrafico: string,
    dados: any[],
    categorias: string[] | number[]){
        super(tipoGrafico, dados, categorias)
    }

    gerarPlotOptions(){
        return {
    chart: {
      type: this.tipoGrafico,
    },

    title: {
      text: ""//dashboard.tituloGrafico ?? "",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
      },
    },
    series: this.dados,
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
        }
      }
    },
    xAxis: {
      categories: this.categorias,
    },
    yAxis: {
      title: {
        text: ""//"Valores",
      },
    },
  };
    }
}