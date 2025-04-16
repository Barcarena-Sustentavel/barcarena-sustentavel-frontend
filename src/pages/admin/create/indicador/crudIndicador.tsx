import api from "../../../../api.tsx";
import {
  Indicador,
  GraficosIndicador,
} from "../../../../interfaces/indicador_interface.tsx";

export const postIndicador = async (
  dimensao: string | undefined,
  indicador: string,
  arrayGrafico: GraficosIndicador[],
) => {
  const Indicador: Indicador = {
    nome: indicador,
  };
  try {
    await api.post(`/admin/dimensoes/${dimensao}/indicador/`, Indicador);
  } catch (error) {
    console.log(error);
  }

  try {
    const endpoit = `/api/admin/dimensoes/${dimensao}/indicador/${indicador}/anexos/`;
    const formData = new FormData();
    for (let i = 0; i < arrayGrafico.length; i++) {
      formData.append("grafico", arrayGrafico[i].arquivo);
      formData.append("descricaoGrafico", arrayGrafico[i].descricaoGrafico);
      formData.append("tituloGrafico", arrayGrafico[i].tituloGrafico);
      formData.append("tipoGrafico", arrayGrafico[i].tipoGrafico);
      console.log(formData);
      await fetch(endpoit, {
        method: "POST",
        body: formData,
      }).catch((error) => {
        console.log(error);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const patchIndicador = async (
  dimensao: string | undefined,
  antigoIndicador: string,
  novoIndicador: string,
  tituloGrafico: string,
  arrayGrafico: GraficosIndicador[],
) => {
  try {
    const endpoit = `admin/dimensoes/${dimensao}/indicador/${antigoIndicador}/anexos/${tituloGrafico}/`;
    const formData = new FormData();
    const novoIndicadorBool: boolean = novoIndicador !== antigoIndicador;
    if (novoIndicadorBool) {
      formData.append("nome", novoIndicador);
    }
    for (let i = 0; i < arrayGrafico.length; i++) {
      formData.append("grafico", arrayGrafico[i].arquivo);
      formData.append("descricaoGrafico", arrayGrafico[i].descricaoGrafico);
      formData.append("tituloGrafico", arrayGrafico[i].tituloGrafico);
      formData.append("tipoGrafico", arrayGrafico[i].tipoGrafico);
      console.log(formData);
      await fetch(endpoit, {
        method: "PATCH",
        body: formData,
      }).catch((error) => {
        console.log(error);
      });
    }
  } catch (error) {
    console.log(error);
  }
};
