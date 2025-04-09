import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FC, useRef } from 'react';

interface PlotSeries {
    name: string,
    data: number[]
}

interface DashboardProps {
    tipoGrafico: string 
    tituloGrafico: string | null
    dados: PlotSeries[]
    categorias: string[] | number[] 
}

const plotOptions = (dashboard:DashboardProps) => {
    return {
        chart:{
            type: dashboard.tipoGrafico,
        },
        title: {
            text: dashboard.tituloGrafico != null ? dashboard.tituloGrafico : '',
          },
        series: dashboard.dados,
        xAxis:{
            categories:dashboard.categorias
        },
        yAxis: {
            title: {
                text: 'Valores'
            }
        }
    }
}

export const DashboardComponent:FC<{tipoGrafico:string, dados: number[][], tituloGrafico: string | null, categorias: string[] | number[]}> = ({tipoGrafico,dados, tituloGrafico, categorias}) => {
    const chartComponentRef = useRef<HighchartsReact.HighchartsReactRefObject>(null);
    let dadosGrafico:PlotSeries[] = []

    dados.map((dado:number[], index:number=0) => {
        dadosGrafico.push({
            name: `Dado ${index+1}`,
            data: dado
        })
    })

    return(
        <HighchartsReact.HighchartsReact 
          highcharts = {Highcharts}
          options = {plotOptions({
                                tipoGrafico:tipoGrafico,
                                dados:dadosGrafico,
                                tituloGrafico:tituloGrafico,
                                categorias:categorias
                            })}
           ref = {chartComponentRef}/>
        )
}