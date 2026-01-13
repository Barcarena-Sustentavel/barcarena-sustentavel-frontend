export interface DashboardProps {
    tipoGrafico: string;
    tituloGrafico: string | null;
    dados: any[];
    categorias: string[] | number[];
  }