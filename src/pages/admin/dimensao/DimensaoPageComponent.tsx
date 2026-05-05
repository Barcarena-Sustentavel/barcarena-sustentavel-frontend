import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TabContentComponent } from "../tab/TabContentComponent.tsx";
import "../dimensao/style.css";
import dimensoes from "../../../utils/const.tsx";
import DimensaoPageHeader from "../components/headers/components/dimensaoPageHeader.tsx";
import SidebarAdmin from "../sidebar/sidebarAdmin.tsx";
import api from "../../../adapters/api.tsx";
import { getCor } from "../components/headers/script/getCor.tsx";

const DimensaoPageComponent: FC = () => {
  const { dimensao } = useParams();
  const [nomeDimensao, setNomeDimensao] = useState<string>(dimensao as string);
  const [activeTab, setActiveTab] = useState<string>("Dimensão");
  const [dimensoesList, setDimensoesList] = useState<string[]>([""])
  // botão para voltar página
  const navigate = useNavigate();


  useEffect(() => {
    api.get("/dimensoes/").then((response) => {
      setDimensoesList(response.data.dimensoes);
      console.log(response.data.dimensoes);
    });
  }, []);

  const returnTabName = (tabName: string) => {
    return tabName === "EstudosComplementares" ? "Estudos Complementares" : tabName;
  };
  
  function reloadPage(novoNomeDimensao: string) {
    setNomeDimensao(novoNomeDimensao);
    navigate(`/admin/dimensao/${novoNomeDimensao}`);
  }
  if(!dimensao) return;
  return (
    <div className="div-wrapper d-flex">
      <SidebarAdmin 
        selectedDimensao={nomeDimensao}
        dimensoes={dimensoesList}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        navigateNovaDimensao={reloadPage}
        />
      <div className="home-container" style={{height:'100vh'}}>
        <DimensaoPageHeader dimensao={dimensao} />

        <div className="admin-tabs-container">
          <h2 className="admin-content__title" style={{borderBottom: `1px solid ${getCor(dimensao)}`}}>{returnTabName(activeTab)}</h2>
          <div className="admin-tab-content">
            <TabContentComponent nomeDimensao={nomeDimensao} activeTab={activeTab} novoNomeDimensao={reloadPage} />
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default DimensaoPageComponent;
