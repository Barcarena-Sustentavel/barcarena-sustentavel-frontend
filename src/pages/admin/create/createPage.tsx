import { FC } from "react";
import { useParams } from "react-router-dom";
import { CreateIndicador } from "./indicador/CreateIndicador.tsx";
import CreateReferencias from "./referencias/CreateReferência.tsx";
import CreateEstudosComplementares from "./estudos_complementares/createEstudosComplementares.tsx";
import CreateKml from "./kml/CreateKml.tsx";
const CreatePage: FC = () => {
  const { dimensao, activeTab, elementName } = useParams();

  const tabDict: Record<string, string> = {
    indicadores: "Indicadores",
    indicador: "Indicadores",
    referencias: "Referências",
    estudoscomplementares: "EstudosComplementares"
  }

  const returnTabDict = (tabName: string) => {
    const tabNameNormalizado = tabName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return tabDict[tabNameNormalizado];
  }

  if(activeTab === undefined) return;

  if (returnTabDict(activeTab) === "Referências") {
    return <CreateReferencias dimensao={dimensao} referencia={elementName} />;
  }

  if (returnTabDict(activeTab) === "Kmls") {
    return <CreateKml dimensao={dimensao} kml={elementName} />;
  }

  if (returnTabDict(activeTab) === "Indicadores") {
    return <CreateIndicador dimensao={dimensao} indicadorNome={elementName} />;
  }

  if (returnTabDict(activeTab) == "EstudosComplementares") {
    return <CreateEstudosComplementares dimensao={dimensao} estudoComplementarNome={elementName} />
  }

};

export default CreatePage;
