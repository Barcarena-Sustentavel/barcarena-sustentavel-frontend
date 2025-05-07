export interface KMLInterface {
  nome: string | undefined;
  //nome: string 
}

export interface CreateKML extends KMLInterface {
  arquivo: string | File;
}
