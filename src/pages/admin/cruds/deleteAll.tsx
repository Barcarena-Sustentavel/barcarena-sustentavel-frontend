import api from "../../../api.tsx";

export const deleteAll = async (
  dimensao: string | undefined,
  activeTab: string,
  nome: string,
) => {
  const dictionary: { [key: string]: string } = {
    Referências: "referencias",
    Kmls: "kml",
    Contribuições: "contribuicao",
    Indicadores: "indicador",
    Anexos: "anexos",
    EstudosComplementares: "estudo_complementar",
  };
  const nomeEncoded = encodeURIComponent(nome);
  const url = `/admin/dimensoes/${dimensao}/${dictionary[activeTab]}/${nomeEncoded}/`;
  console.log(url)
  const response = await api.delete(url);
  return response;
};
