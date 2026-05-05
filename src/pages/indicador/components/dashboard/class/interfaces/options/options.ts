export interface Options {
  plotOptions(tipoGrafico:string, dados:any[], categorias: string[] | number[] ):Record<string, any>; 
}