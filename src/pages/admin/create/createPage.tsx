import { FC } from "react";
import { useParams } from "react-router-dom";
import { CreateIndicador } from "./indicador/CreateIndicador.tsx";
import CreateReferencias from "./referencias/CreateReferência.tsx";
import CreateEstudosComplementares from "./estudos_complementares/createEstudosComplementares.tsx";
import CreateKml from "./kml/CreateKml.tsx";
const CreatePage: FC = () => {
  const { dimensao, activeTab, elementName } = useParams();

  const tabDict: Record<string, string> = {
    indicador: "Indicadores",
    referencias: "Referências",
    estudosComplementares: "EstudosComplementares"
  }

  if(activeTab === undefined) return;

  if (tabDict[activeTab] === "Referências") {
    return <CreateReferencias dimensao={dimensao} referencia={elementName} />;
  }

  if (tabDict[activeTab] === "Kmls") {
    return <CreateKml dimensao={dimensao} kml={elementName} />;
  }

  if (tabDict[activeTab] === "Indicadores") {
    return <CreateIndicador dimensao={dimensao} indicadorNome={elementName} />;
  }

  if (tabDict[activeTab] == "EstudosComplementares") {
    return <CreateEstudosComplementares dimensao={dimensao} estudoComplementarNome={elementName} />
  }

};

export default CreatePage;
