import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FC, useRef } from 'react';

interface PlotSeries {
    name: string;
    data: number[];
}

interface DashboardProps {
    tipoGrafico: string;
    tituloGrafico: string | null;
    dados: PlotSeries[];
    categorias: string[] | number[];
}

const plotOptions = (dashboard: DashboardProps) => {
    return {
        chart: {
            type: dashboard.tipoGrafico,
        },
        title: {
            text: dashboard.tituloGrafico ?? '',
        },
        series: dashboard.dados,
        xAxis: {
            categories: dashboard.categorias,
        },
        yAxis: {
            title: {
                text: 'Valores',
            },
        },
    };
};

export const DashboardComponent: FC<{
    tipoGrafico: string;
    dados: number[][];
    tituloGrafico: string | null;
    categorias: string[] | number[];
}> = ({ tipoGrafico, dados, tituloGrafico, categorias }) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    const dadosGrafico: PlotSeries[] = [];
    dados.forEach((dado, index) => {
        dadosGrafico.push({
            name: `Dado ${index + 1}`,
            data: dado,
        });
    });

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={plotOptions({
                tipoGrafico,
                dados: dadosGrafico,
                tituloGrafico,
                categorias,
            })}
            ref={chartComponentRef}
        />
    );
};