export interface EscolaBarcarena {
  "Nome Escola": string;
  Dependência: string;
  "Código INEP": string;
  Localização: string;
  Matrículas: number;
  "Matrículas maior turno": number;
  "Matrículas - Diurno": number | null;
  "Matrículas - Noturno": number | null;
  Internet: string; // "Sim" | "Não"
  "Uso Internet Alunos": string; // "Sim" | "Não"
  "Banda Larga": string; // "Sim" | "Não"
  "Laboratório de Informática": string; // "Sim" | "Não"
  "Uso Internet Administrativo": string; // "Sim" | "Não"
  "Uso Internet Processo de Aprendizagem": string; // "Sim" | "Não"
  "Prestadora PBLE-CER": string;
  "Tecnologia PBLE-CER": string;
  Latitude: number;
  Longitude: number;
}

export interface UnidadeSaude {
  CNES: number; // código numérico
  "Nome Fantasia": string;
  "Tipo Unidade": string;
  Gestão: string;
  Internet: string; // "Sim" | "Não"
  Latitude: number;
  Longitude: number;
}
