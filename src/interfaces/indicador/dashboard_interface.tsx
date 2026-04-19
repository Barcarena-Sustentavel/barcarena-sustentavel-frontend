export interface DashboardProps {
    tipoGrafico: string;
    dados: any[];
    categorias: string[] | number[];
  }

export interface ColunaCsv {
  name: string,
  data: number[],
  type: string
}