import {FC} from "react";
import "./style.css";
import { DimensaoTab } from "./components/DimensaoTab.tsx";
import { ArtigoTab } from "./components/ArtigoTab.tsx";
import { TabIndicadores } from "./components/TabIndicadores.tsx";
import { CommonTab } from "./components/commom/CommomTab.tsx";
import { ReferenciasTab } from "./components/Referencias.tsx";
import { EstudosComplementaresTab } from "./components/EstudosComplementares.tsx";

export const TabContentComponent: FC<{nomeDimensao:string, activeTab: string, novoNomeDimensao:(name:string) => void}> = ({
  nomeDimensao,
  activeTab,
  novoNomeDimensao
}) => {

  if (activeTab === "Dimensão") {
    return <DimensaoTab nomeDimensao={nomeDimensao} novoNomeDimensao={novoNomeDimensao}/>;
  } else if (activeTab === "Artigo") {
    return <ArtigoTab nomeDimensao={nomeDimensao}/>;
  } else if (activeTab === "Indicadores") {
    return <TabIndicadores nomeDimensao={nomeDimensao}/>
  } else if (activeTab === "Referências") {
    return <ReferenciasTab nomeDimensao={nomeDimensao}/>
  }
  //Retorna o estudosComplementares
  return <EstudosComplementaresTab nomeDimensao={nomeDimensao}/>
  
};
