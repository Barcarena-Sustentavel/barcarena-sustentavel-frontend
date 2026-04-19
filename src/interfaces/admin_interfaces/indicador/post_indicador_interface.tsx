import { Anexo } from "../../anexo/anexo_interface.tsx";
import { Indicador } from "../../indicador/indicador_interface.js";

export interface PostIndicadorInterface {
    dadosIndicador: Indicador
    dadosAnexo: Anexo
}