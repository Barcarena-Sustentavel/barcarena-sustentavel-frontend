import { FC, useState } from "react"
import { handleFileChange } from "../const"
import { postIndicador } from "./postIndicador";
import { Form } from "react-bootstrap";

interface CreateIndicadorProps {
    dimensao: string | undefined
}

export const CreateIndicador:FC<CreateIndicadorProps> = ({dimensao}) => {
    const [anexoArquivo, setAnexoArquivo] = useState<File>()
    const [indicador, setIndicador] = useState<string>("")
    const [descricao, setDescricao] = useState<string>("")
    const [tipoGrafico, setTipoGrafico] = useState<string>("")
    const coordinateChartTypes: { [key: string]: string } = {
        'Linha': 'line',
        'Linha Suave': 'spline',
        'Área': 'area',
        'Área Suave': 'areaspline',
        'Dispersão': 'scatter',
        'Coluna': 'column',
        'Barra': 'bar',
        'Bolha': 'bubble',
        'Intervalo de Área': 'arearange',
        'Intervalo de Coluna': 'columnrange',
        'Diagrama de Caixa': 'boxplot',
        'Mapa de Calor': 'heatmap',
        'Cascata': 'waterfall',
        'Funil': 'funnel',
        'Pirâmide': 'pyramid',
        'Mapa de Árvore': 'treemap',
        'Grafo de Rede': 'networkgraph',
        'Linha do Tempo': 'timeline'
    };
    return (
        <div>
            <form>
                <input type="text" placeholder="Nome do Indicador" onChange={(e) => setIndicador(e.target.value)} />
                <input
                    type="file"
                    onChange={(e) => handleFileChange(setAnexoArquivo,e)}
                    accept=".csv"
                />
                <input type="text" onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição do gráfico" />
                <Form.Select aria-label="Default select example" onChange={(e) => {setTipoGrafico(e.target.value)}}>
                    <option defaultValue={'Selecione o tipo de gráfico'} >Selecione o tipo de gráfico</option>
                    {Object.keys(coordinateChartTypes).map(key => (
                        <option key={coordinateChartTypes[key]} value={coordinateChartTypes[key]}>
                            {key}
                        </option>
                    ))}
                </Form.Select>
                <button type="button" onClick={() => postIndicador(dimensao, indicador, anexoArquivo, tipoGrafico, descricao)}>Criar Indicador</button>
            </form>
        </div>
    )
}