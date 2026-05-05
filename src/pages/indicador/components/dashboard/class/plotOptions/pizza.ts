import { PlotOptions } from "./plotOptions.ts";
export class PlotOptionsPizza extends PlotOptions{
    constructor(dados:any[]){
        super("",dados,[]);
    }

    gerarPlotOptions(){return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: ""
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
          data: this.dados,
        },
      ],
      exporting: {
        buttons: {
          contextButton: {
            menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
          }
        }
      },
    };}
}