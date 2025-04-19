import api from "../../../../api.tsx";
import { KMLInterface } from "../../../../interfaces/kml_interface.tsx";
import Swal from "sweetalert2";

export const postKML = async (
  dimensao: string | undefined,
  kml: string | undefined,
  kml_arquivo: File | string,
) => {
  const kmlNovo: KMLInterface = {
    nome: kml,
  };
  try {
    await api.post(`/admin/dimensoes/${dimensao}/kml/`, kmlNovo);
    const endpoit = `/api/admin/dimensoes/${dimensao}/kml/${kml}/anexos/`;
    const formData = new FormData();
    formData.append("arquivoKml", kml_arquivo);
    console.log(formData);
    await fetch(endpoit, {
      method: "POST",
      body: formData,
    }).catch((error) => {
      console.log(error);
    });

    await Swal.fire({
      title: "Sucesso!",
      text: "Kml adicionado com sucesso.",
      icon: "success",
      confirmButtonColor: "var(--primary-color)",
    });
  } catch (error) {
    console.error("Erro ao adicionar o KMl:", error);
    await Swal.fire({
      title: "Erro!",
      text: "Ocorreu um erro ao adicionar o KMl. Por favor, tente novamente.",
      icon: "error",
      confirmButtonColor: "var(--primary-color)",
    });
    console.log(error);
  }
};
export const patchKML = async (
  dimensao: string | undefined,
  antigoKML: string | undefined,
  novoKML: string,
  kml_arquivo: File | string,
) => {
  try {
    const kmlUpdate: KMLInterface = {
      nome: "",
    };
    const novoKMLBool: boolean = novoKML !== antigoKML;
    if (novoKMLBool) {
      kmlUpdate.nome = novoKML;
      console.log(kmlUpdate.nome);
      await api
        .patch(`/admin/dimensoes/${dimensao}/kml/${antigoKML}/`, kmlUpdate)
        .then((response) => console.log(response.data));
    } else {
      kmlUpdate.nome = antigoKML;
    }

    // Update the file if provided
    if (kml_arquivo instanceof File) {
      const endpoit = `/api/admin/dimensoes/${dimensao}/kml/${kmlUpdate.nome}/anexos/`;
      const formData = new FormData();
      formData.append("arquivoKml", kml_arquivo);
      console.log(formData);
      await fetch(endpoit, {
        method: "PATCH",
        body: formData,
      }).catch((error) => {
        console.log(error);
      });
    }

    await Swal.fire({
      title: "Sucesso!",
      text: "KML modificado com sucesso.",
      icon: "success",
      confirmButtonColor: "var(--primary-color)",
    });
  } catch (error) {
    console.error("Error updating KML:", error);
    await Swal.fire({
      title: "Erro!",
      text: "Ocorreu um erro ao modificar o KML. Por favor, tente novamente.",
      icon: "error",
      confirmButtonColor: "var(--primary-color)",
    });
    console.log(error);
  }
};
