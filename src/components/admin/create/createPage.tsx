import { FC,useState } from "react"
import { useParams } from "react-router-dom"
import { postIndicador } from "./aux/handleSubmits"
import { Form } from "react-bootstrap";


const CreatePage:FC = () => {
    //Tipos de gráficos que podem ser utilizados
    const coordinateChartTypes:Array<string> = [
        'line',
        'spline',
        'area',
        'areaspline',
        'scatter',
        'column',
        'bar',
        'bubble',
        'arearange',
        'columnrange',
        'boxplot',
        'heatmap',
        'waterfall',
        'funnel',
        'pyramid',
        'treemap',
        'networkgraph',
        'timeline'
    ];
    const {dimensao,activeTab} = useParams()
    const [indicador, setIndicador] = useState<string>("")
    //const [anexo, setAnexo] = useState<Anexo>()
    const [anexoArquivo, setAnexoArquivo] = useState<File>()
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
            setAnexoArquivo(e.target.files[0])
        }
    }

    if (activeTab === "Dimensão") {
        return(
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
        )    }

    if (activeTab === "Contribuições") {
        // Handle Contribuições tab creation
    }

    if (activeTab === "Kmls") {
        // Handle Kmls tab creation
    }

    if (activeTab === "Indicadores") {
        return (
            <div>
                <form>
                    <input type="text" placeholder="Nome do Indicador" onChange={(e) => setIndicador(e.target.value)}/>
                    <input  
                        type="file" 
                        onChange={handleFileChange}
                        accept=".csv"
                    />
                    <Form.Select aria-label="Default select example">
                        <option selected >Selecione o tipo de gráfico</option>
                        {coordinateChartTypes.map(element => {
                           return (<option value={element}>{element}</option>)
                        })};
                    </Form.Select>                    
                    <button type="submit" onClick={() => postIndicador(dimensao, indicador, anexoArquivo)}>Criar Indicador</button>
                </form>
            </div>
        )    
    }

    
    }

export default CreatePage