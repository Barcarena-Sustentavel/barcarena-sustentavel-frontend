//Gráficos de linhas e colunas no geral
export interface PlotSeries {
    name: string;
    data: number[];
  }
  
 export interface TreeMapSeries {
    name: string;
    value: number;
    color: string;
  }

  export interface PizzaSeries {
    name: string;
    y: number
  }