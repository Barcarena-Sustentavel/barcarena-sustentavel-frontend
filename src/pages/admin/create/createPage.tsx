import { FC } from "react";
import { useParams } from "react-router-dom";
import { CreateIndicador } from "./indicador/CreateIndicador.tsx";
import CreateReferencias from "./referencias/CreateReferência.tsx";
import CreateKml from "./kml/CreateKml.tsx";
const CreatePage: FC = () => {
  const { dimensao, activeTab, elementName } = useParams();

  if (activeTab === "Referências") {
    return <CreateReferencias dimensao={dimensao} referencia={elementName} />;
  }

  if (activeTab === "Kmls") {
    return <CreateKml dimensao={dimensao} kml={elementName} />;
  }

  if (activeTab === "Indicadores") {
    return <CreateIndicador dimensao={dimensao} indicadorNome={elementName} />;
  }
};

export default CreatePage;
