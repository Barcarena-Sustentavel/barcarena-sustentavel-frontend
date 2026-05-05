import { Key } from "lucide-react";
import api from "../adapters/api.tsx";
import {
  Indicador,
  GraficosIndicador,
} from "../interfaces/indicador/indicador_interface.tsx";
import Swal from "sweetalert2";

export const postIndicador = async (
  dimensao: string | undefined,
  indicador: string,
  referencia: string,
  periodicidade: string,
  ultimaAtualizacao: string,
  unidadeMedida: string,
  metodologia: string,
  arrayGrafico: GraficosIndicador[],
) => {
  try {
    await api.post(`/admin/dimensoes/${dimensao}/indicador/`, null, {
      params: {
        indicadorNome: indicador,
        referenciaNome: referencia,
        periodicidade,
        ultimaAtualizacao,
        unidadeMedida,
        metodologia,
      },
    });
    const endpoint = `/admin/dimensoes/${dimensao}/indicador/${indicador}/anexos/`;
    let formData = new FormData();
    for (let i = 0; i < arrayGrafico.length; i++) {
      formData.append("grafico", arrayGrafico[i].arquivo);
      formData.append("descricaoGrafico", arrayGrafico[i].descricaoGrafico);
      formData.append("tituloGrafico", arrayGrafico[i].tituloGrafico);
      formData.append("tipoGrafico", arrayGrafico[i].tipoGrafico);
      formData.append("posicaoGrafico", arrayGrafico[i].posicao.toString());
      console.log(formData);

      await api.post(endpoint, formData);

      formData = new FormData();
    }
    await Swal.fire({
      title: "Sucesso!",
      text: "Indicador adicionado com sucesso.",
      icon: "success",
      confirmButtonColor: "var(--primary-color)",
    });
  } catch (error) {
    console.error("Error submitting reference:", error);
    await Swal.fire({
      title: "Erro!",
      text: "Ocorreu um erro ao adicionar o indicador. Por favor, tente novamente.",
      icon: "error",
      confirmButtonColor: "var(--primary-color)",
    });
    console.log(error);
  }
};

export const patchIndicador = async (
  dimensao: string | undefined,
  antigoIndicador: string,
  novoIndicador: string = "",
  referencia: string = "",
  periodicidade: string = "",
  ultimaAtualizacao: string = "",
  unidadeMedida: string = "",
  metodologia: string = "",
  arrayGrafico: GraficosIndicador[],
) => {
  const indicador: Indicador = {
    nome: novoIndicador,
  };

  try {
    const endpoint = `/admin/dimensoes/${dimensao}/indicador/${encodeURIComponent(antigoIndicador)}/`;
    const formData = new FormData();
    const novoIndicadorBool: boolean = novoIndicador !== antigoIndicador;
    if (novoIndicadorBool) {
      indicador.nome = novoIndicador;
      formData.append("indicadorNovo", novoIndicador);
    } else {
      indicador.nome = antigoIndicador;
    }
    const formDataBody:Record<string, any> = {
     "fonteDeDados": referencia,
     "periodicidade":periodicidade,
     "ultimaAtualizacao":ultimaAtualizacao,
     "unidadeMedida":unidadeMedida,
     "metodologia":metodologia 
    }

    Object.entries(formDataBody).forEach(([Key,value]) => {
      if(value !== "") {
        formData.append(Key, value);
      }
    })
    await api.patch(endpoint, formData).then(res =>{
        if(res.status === 200){
            console.log("Indicador alterado com sucesso");
        }else{
          console.log("erro")
        }
      })
    console.log(arrayGrafico)
    //Anexos
    if (arrayGrafico.length > 0) {
      let formData = new FormData();
      for (let i = 0; i < arrayGrafico.length; i++) {
        console.log((arrayGrafico[i].arquivo as File).size);
        if ((arrayGrafico[i].arquivo as File).size !== undefined) {
          formData.append("grafico", arrayGrafico[i].arquivo);
        }
        formData.append("descricaoGrafico", arrayGrafico[i].descricaoGrafico);
        formData.append("tituloGrafico", arrayGrafico[i].tituloGrafico);
        formData.append("tipoGrafico", arrayGrafico[i].tipoGrafico);
        formData.append("posicaoGrafico", arrayGrafico[i].posicao.toString());
        console.log(formData)
        const method: string =
          arrayGrafico[i].id! < 0 || arrayGrafico[i].id! === null
            ? "POST"
            : "PATCH";
        const endpoint =
          method === "PATCH"
            ? `/admin/dimensoes/${dimensao}/indicador/${indicador.nome}/anexos/${arrayGrafico[i].id}/`
            : `/admin/dimensoes/${dimensao}/indicador/${indicador.nome}/anexos/`;
        if(method === "POST"){
          await api.post(endpoint, formData);  
        }
        else{
          await api.patch(endpoint, formData);
        }

        formData = new FormData();
      }
    }
    await Swal.fire({
      title: "Sucesso!",
      text: "Indicador modificado com sucesso.",
      icon: "success",
      confirmButtonColor: "var(--primary-color)",
    });
  } catch (error) {
    console.error("Error submitting reference:", error);
    await Swal.fire({
      title: "Erro!",
      text: "Ocorreu um erro ao adicionar o indicador. Por favor, tente novamente.",
      icon: "error",
      confirmButtonColor: "var(--primary-color)",
    });
    console.log(error);
  }
};