import { FC } from "react"
import { useParams } from "react-router-dom"
import { CreateIndicador } from "./indicador/CreateIndicador.tsx";
import CreateReferencias from "./referencias/CreateReferência.tsx";

const CreatePage: FC = () => {
    const { dimensao, activeTab, elementName } = useParams()
    
    if (activeTab === "Referências") {
        return (
            <CreateReferencias dimensao={dimensao} referencia={elementName}/>
        )
    }

    if (activeTab === "Kmls") {
        return (
            <div>
                <form>
                    <input type="text" placeholder="Título" />
                    <input type="file" placeholder="Arquivo" />
                    <button type="submit">Adicionar Kml</button>
                </form>
            </div>
        )
    }

    if (activeTab === "Indicadores") {
        return (<CreateIndicador  dimensao={dimensao} indicadorNome={elementName}/> )
    }


}

export default CreatePage