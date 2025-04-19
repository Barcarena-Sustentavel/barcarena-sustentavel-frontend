export interface KMLInterface {
  nome: string | undefined;
}

export interface CreateKML extends KMLInterface {
  arquivo: string | File;
}
