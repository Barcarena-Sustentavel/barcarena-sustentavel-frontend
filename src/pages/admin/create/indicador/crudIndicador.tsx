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
      /*
      const response = await api.put(
        `/admin/dimensoes/${dimensao}/indicador/${encodeURIComponent(antigoIndicador)}/`,
        { indicadorNovo: novoIndicador },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 200) {
        console.log("Indicador alterado com sucesso");
      } else {
        console.log("Erro ao alterar indicador");
      } */
      //Nome dos indicadores

      const formData = new FormData();
      const endpoint = `/api/admin/dimensoes/${dimensao}/indicador/${encodeURIComponent(antigoIndicador)}/`;
      formData.append("indicadorNovo", novoIndicador);
      const response = await fetch(endpoint, {
        method: "PUT",
        // headers: {
        //   "Content-Type": "multipart/form-data", // ← Content-Type correto
        // },
        body: formData,
      }).catch((error) => {
        console.log(error);
      });
      if (response) {
        console.log("Indicador alterado com sucesso");
      }
    } else {
      indicador.nome = antigoIndicador;
    }

    //Anexos
    if (arrayGrafico.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < arrayGrafico.length; i++) {
        const endpoit =
          arrayGrafico[i].id != null
            ? `/api/admin/dimensoes/${dimensao}/indicador/${indicador.nome}/anexos/${arrayGrafico[i].id}/`
            : `/api/admin/dimensoes/${dimensao}/indicador/${indicador.nome}/anexos/`;
        console.log(arrayGrafico[i].arquivo.size);
        if (arrayGrafico[i].arquivo.size !== undefined) {
          formData.append("grafico", arrayGrafico[i].arquivo);
        }
        formData.append("descricaoGrafico", arrayGrafico[i].descricaoGrafico);
        formData.append("tituloGrafico", arrayGrafico[i].tituloGrafico);
        formData.append("tipoGrafico", arrayGrafico[i].tipoGrafico);
        console.log(formData);
        await fetch(endpoit, {
          method: arrayGrafico[i].id != null ? "PATCH" : "POST",
          body: formData,
        }).catch((error) => {
          console.log(error);
        });
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
