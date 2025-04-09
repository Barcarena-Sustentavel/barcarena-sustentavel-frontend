import { FC } from "react"
import { useParams } from "react-router-dom"
import { CreateIndicador } from "./indicador/CreateIndicador.tsx";


const CreatePage: FC = () => {
    const { dimensao, activeTab } = useParams()

    if (activeTab === "Dimensão") {
        return (
            <div>
                <form>
                    <input type="text" placeholder="Nome da Dimensão" />
                    <input type="text" placeholder="Descrição" />
                    <button type="submit">Criar Dimensão</button>
                </form>
            </div>
        )
    }

    if (activeTab === "Referencias") {
        return (
            <div>
                <form>
                    <input type="text" placeholder="Título" />
                    <input type="text" placeholder="Link" />
                    <button type="submit">Adicionar Referência</button>
                </form>
            </div>
        )
    }

    if (activeTab === "Contribuições") {
        // Handle Contribuições tab creation
    }

    if (activeTab === "Kmls") {
        // Handle Kmls tab creation
    }

    if (activeTab === "Indicadores") {
        return (<CreateIndicador  dimensao={dimensao}/> )
    }


}

export default CreatePage