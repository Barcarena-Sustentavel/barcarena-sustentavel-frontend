import api from "../../../../api.tsx";

export async function getArtigoDimensao(dimensaoNome: string): Promise<Blob> {
  try {
    const response = await api.get(
      `/admin/dimensoes/${dimensaoNome}/artigoDimensao`,
      { responseType: "blob" }, // necessário para arquivos binários
    );
    return response.data; // retorna o Blob do PDF
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
    return response.data.message;
  } catch (error: any) {
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
    return response.data.message;
  } catch (error: any) {
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
    return response.data.message;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Erro ao deletar artigo");
  }
}
