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
  const url = `/admin/dimensoes/${dimensao}/${dictionary[activeTab]}/`;
  const response = await api.delete(url,{params:{nome:nome}});
  return response;
};
