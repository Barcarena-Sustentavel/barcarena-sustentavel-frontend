import { DashboardProps } from "../dashboard/interface/dashboard_interface.tsx";
import { Highcharts } from "@highcharts/dashboards/es-modules/Dashboards/Plugins/HighchartsTypes.js";
export const plotOptions = (dashboard: DashboardProps) => {
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