export interface Contribuicao {
    id: number;
    nome?: string | null;
    email: string;
    telefone?: string | null;
    comentario?: string | null;
    fkDimensao: number;
}

