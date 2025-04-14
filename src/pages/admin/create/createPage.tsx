import { FC } from "react"
import { useParams } from "react-router-dom"
import { CreateIndicador } from "./indicador/CreateIndicador.tsx";
import CreateReferencias from "./referencias/CreateReferência.tsx";

const CreatePage: FC = () => {
    const { dimensao, activeTab } = useParams()

    if (activeTab === "Referências") {
        return (
            //<div>
            //    <form>
            //        <input type="text" placeholder="Título" />
            //        <input type="text" placeholder="Link" />
            //        <button type="submit">Adicionar Referência</button>
            //    </form>
            //</div>
            <CreateReferencias dimensao={dimensao}/>
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
        return (<CreateIndicador  dimensao={dimensao}/> )
    }


}

export default CreatePage