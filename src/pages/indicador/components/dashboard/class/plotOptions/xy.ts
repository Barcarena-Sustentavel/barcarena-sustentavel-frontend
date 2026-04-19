import { PlotOptions } from "./plotOptions.ts";
import { ColunaCsv } from "../../../../../../interfaces/indicador/dashboard_interface.tsx";

export class PlotOptionsXY extends PlotOptions{
    constructor(dados:any[],categorias: string[] | number[] = []){
        super('',dados,categorias)
    }   

    analisarNecessidadeMultiplosEixos = (series: ColunaCsv[]) => {    
      const maxRanges = series.map(serie => {
        return Math.max(...serie.data)
      })
    
      const razaoMaxRanges = Math.max(...maxRanges) / Math.min(...maxRanges);
    
      if (razaoMaxRanges > 1000) {
        return {
          necessidade: true,
          maxRanges: maxRanges
        };
      }
    
      return {
        necessidade: false,
        maxRanges: maxRanges
      };
    }


    gerarPlotOptions(){
        const multiplosEixos = this.analisarNecessidadeMultiplosEixos(this.dados);
        if (multiplosEixos.necessidade) {
      // const dadosLinha = dashboard.dados.map(dados => {

      // })
      let dadosLinha: any[] = [];
      let dadosColuna: any[] = [];
      const maxValue = Math.max(...multiplosEixos.maxRanges);

      for (let index = 0; index < this.dados.length; index++) {
        if (maxValue / multiplosEixos.maxRanges[index] < 1000) {
          dadosLinha.push(this.dados[index]);
        } else {
          dadosColuna.push(this.dados[index]);
        }
      }

      for (let index = 0; index < dadosLinha.length; index++) {
        dadosLinha[index].type = "line";
        dadosColuna[index].yAxis = 0;
      }

      for (let index = 0; index < dadosColuna.length; index++) {
        dadosColuna[index].type = "column";
        dadosColuna[index].yAxis = 1;
      }
      return {
        chart: {
          zooming: {
            type: "xy",
          },
        },

        title: {
          text: "" //dashboard.tituloGrafico ?? "",
        },
        series: [
          ...dadosLinha,
          ...dadosColuna
        ],
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
        yAxis: [
          { // Eixo 0 - Esquerda (Linha)
            title: {
              text: "Linha",
            },
          },
          { // Eixo 1 - Direita (Coluna)
            title: {
              text: "Coluna",
            },
            opposite: true, // Coloca à direita
          }
        ],
      };
    };
        const dadoColuna = {
      name: this.dados[0].name,
      data: this.dados[0].data,
      type: "spline",
    }; //Salva somente o primeiro array para que este seja a linha
    this.dados.splice(0, 1); //Remove o primeiro array, e modifica permanentemente o array original
    const dadosLinha = this.dados;
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
        text: "" //dashboard.tituloGrafico ?? "",
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