import { FC } from "react";
import { useParams } from "react-router-dom";
import { CreateIndicador } from "./indicador/CreateIndicador.tsx";
import CreateReferencias from "./referencias/CreateReferência.tsx";
import CreateEstudosComplementares from "./estudos_complementares/createEstudosComplementares.tsx";
import CreateKml from "./kml/CreateKml.tsx";

const normalizeActiveTab = (value?: string) => {
  if (!value) {
    return undefined;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "referencias" || normalized === "referência" || normalized === "referências") {
    return "Referências";
  }

  if (normalized === "kmls" || normalized === "kml") {
    return "Kmls";
  }

  if (normalized === "indicadores" || normalized === "indicador") {
    return "Indicadores";
  }

  if (
    normalized === "estudoscomplementares" ||
    normalized === "estudos-complementares" ||
    normalized === "estudos complementares"
  ) {
    return "EstudosComplementares";
  }

  return value;
};

const CreatePage: FC = () => {
  const { dimensao, activeTab, elementName } = useParams();
  const normalizedActiveTab = normalizeActiveTab(activeTab);

  if (normalizedActiveTab === "Referências") {
    return <CreateReferencias dimensao={dimensao} referencia={elementName} />;
  }

  if (normalizedActiveTab === "Kmls") {
    return <CreateKml dimensao={dimensao} kml={elementName} />;
  }

  if (normalizedActiveTab === "Indicadores") {
    return <CreateIndicador dimensao={dimensao} indicadorNome={elementName} />;
  }

  if (normalizedActiveTab === "EstudosComplementares") {
    return <CreateEstudosComplementares dimensao={dimensao} estudoComplementarNome={elementName} />;
  }

  return null;
};

export default CreatePage;
