import api from "../../../../api.tsx";
import {
  Indicador,
  GraficosIndicador,
} from "../../../../interfaces/indicador_interface.tsx";
import Swal from "sweetalert2";

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
  novoIndicador: string,
  arrayGrafico: GraficosIndicador[],
) => {
  const indicador: Indicador = {
    nome: novoIndicador,
  };

  try {
    const novoIndicadorBool: boolean = novoIndicador !== antigoIndicador;
    if (novoIndicadorBool) {
      indicador.nome = novoIndicador;
      const formData = new FormData();
      const endpoint = `/admin/dimensoes/${dimensao}/indicador/${encodeURIComponent(antigoIndicador)}/`;
      formData.append("indicadorNovo", novoIndicador);
      await api.patch(endpoint, formData).then(res =>{
        if(res.status === 200){
            console.log("Indicador alterado com sucesso");
        }else{
          console.log("erro")
        }
      })
    } else {
      indicador.nome = antigoIndicador;
    }

    //Anexos
    if (arrayGrafico.length > 0) {
      let formData = new FormData();
      for (let i = 0; i < arrayGrafico.length; i++) {
        console.log(arrayGrafico[i].arquivo.size);
        if (arrayGrafico[i].arquivo.size !== undefined) {
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