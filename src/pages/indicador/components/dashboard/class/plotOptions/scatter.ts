import { PlotOptions } from "./plotOptions.ts";

export class PlotOptionsScatter extends PlotOptions {
    constructor(tipoGrafico: string, dados: any[]) {
        super(tipoGrafico, dados, [])
    }
    gerarPlotOptions() {
        return {
            chart: {
                type: this.tipoGrafico,
                zooming: {
                    type: 'xy'
                }
            },

            title: {
                text: ""//dashboard.tituloGrafico ?? "",
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
                }, gridLineWidth: 1
            },
            legend: {
                enabled: true
            },
            series: this.dados,
            exporting: {
                buttons: {
                    contextButton: {
                        menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
                    }
                }
            },
        }
    }
}