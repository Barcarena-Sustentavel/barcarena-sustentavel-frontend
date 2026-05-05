import { PlotSeries } from "../../../../../../interfaces/indicador/dados_graficos_interface.tsx";
import { Options } from "../interfaces/options/options.ts";
import { ColunaCsv } from "../../../../../../interfaces/indicador/dashboard_interface.tsx";
export class Grafico implements Options {
    colunas: string[];
    dados: number[][];

    constructor(colunas: string[], dados: number[][]) {
        this.colunas = colunas;
        this.dados = dados;
    }

    gerarDados(): any {
        const dadosGraficoPlots: PlotSeries[] = [];
        this.dados.forEach((dado, index) => {
            dadosGraficoPlots.push({
                name: this.colunas[index], //`Dado ${index + 1}`,
                data: dado,
            });
        });
        return dadosGraficoPlots;
    }

    plotOptions(tipoGrafico: string, dados: any[], categorias: string[] | number[]): Record<string, any> {
        const analisarNecessidadeMultiplosEixos = (series: ColunaCsv[]) => {
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
        
        if (tipoGrafico === "xy") {
            const multiplosEixos = analisarNecessidadeMultiplosEixos(dados);
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
                        categories: categorias,
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
                name: dados[0].name,
                data: dados[0].data,
                type: "spline",
            }; //Salva somente o primeiro array para que este seja a linha
            dados.splice(0, 1); //Remove o primeiro array, e modifica permanentemente o array original
            const dadosLinha = dados;
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
                    categories: categorias,
                },
                yAxis: {
                    title: {
                        text: ""//"Valores",
                    },
                },
            };

        }


        return {
            chart: {
                type: tipoGrafico,
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
            series: dados,
            exporting: {
                buttons: {
                    contextButton: {
                        menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG']
                    }
                }
            },
            xAxis: {
                categories: categorias,
            },
            yAxis: {
                title: {
                    text: ""//"Valores",
                },
            },
        };
    }
}