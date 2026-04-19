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

  export interface ScatterProps{
    name: string;
    //id: string;
    color: string;
    //marker:{symbol:string};
    data: number[][];
  }