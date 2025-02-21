import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FC, useRef } from 'react';

interface DashboardProps {
    tipo: 'line' | 'column' | 'bar' | 'pie' | 'scatter'
    dados: number[][],
    titulo: string
}

const plotOptions = (dashboard:DashboardProps) => {
    return {
        title: {
            text: dashboard.titulo
          },
          series: [{
            type: dashboard.tipo,
            data: dashboard.dados
        }]
    }
}

export const DashboardComponent:FC<DashboardProps> = ({tipo,dados, titulo}) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    return(
        <HighchartsReact 
          highcharts = {Highcharts}
          options = {plotOptions({
                                tipo:tipo,
                                dados:dados,
                                titulo:titulo})}
           ref = {chartComponentRef}/>
        )
}