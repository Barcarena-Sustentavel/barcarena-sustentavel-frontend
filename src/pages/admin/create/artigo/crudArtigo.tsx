import api from "../../../../api.tsx";
import Swal from "sweetalert2";
export async function getArtigoDimensao(dimensaoNome: string): Promise<void> {
  try {
    await api
      .get(
        `/admin/dimensoes/${dimensaoNome}/artigoDimensao`,
        { responseType: "blob" }, // necessário para arquivos binários
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.download = `${dimensaoNome}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Erro ao buscar artigo");
  }
}

// Função POST - cria novo artigo
export async function uploadArtigoDimensao(
  dimensaoNome: string,
  file: File,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post(
      `/dimensoes/${dimensaoNome}/artigoDimensao`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    showSuccessAlert(`Novo artigo: ${file.name}`, "Artigo enviado com sucesso");
    return response.data.message;
  } catch (error: any) {
    showErrorAlert(
      `Erro ao enviar artigo: ${file.name}`,
      "Falha no envio do artigo",
    );
    throw new Error(error.response?.data?.detail || "Erro ao enviar artigo");
  }
}

// Função PATCH - atualiza artigo existente
export async function updateArtigoDimensao(
  dimensaoNome: string,
  file: File,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.patch(
      `/dimensoes/${dimensaoNome}/artigoDimensao`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    showSuccessAlert(`Novo artigo: ${file.name}`, "Atualização bem sucedida");
    return response.data.message;
  } catch (error: any) {
    showErrorAlert(
      `Erro ao atualizar artigo: ${file.name}`,
      "Falha na atualização",
    );
    throw new Error(error.response?.data?.detail || "Erro ao atualizar artigo");
  }
}

// Função DELETE - remove artigo
export async function deleteArtigoDimensao(
  dimensaoNome: string,
): Promise<string> {
  try {
    const response = await api.delete(
      `/dimensoes/${dimensaoNome}/artigoDimensao`,
    );
    showSuccessAlert("", "Artigo Deletado com sucesso");
    return response.data.message;
  } catch (error: any) {
    showSuccessAlert("", "Falha ao deletar artigo");
    throw new Error(error.response?.data?.detail || "Erro ao deletar artigo");
  }
}

const showSuccessAlert = (message: string, titulo: string) => {
  Swal.fire({
    title: titulo,
    text: message,
    icon: "success",
  });
};

const showErrorAlert = (message: string, titulo: string) => {
  Swal.fire({
    icon: "error",
    title: titulo,
    text: message,
    footer: '<a href="#">Why do I have this issue?</a>',
  });
};
