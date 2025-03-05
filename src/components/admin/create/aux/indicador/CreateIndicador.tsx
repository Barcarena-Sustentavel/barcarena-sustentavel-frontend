import React, { FC, useState } from "react"
import { handleFileChange } from "../const"
import { postIndicador } from "./postIndicador";
import { Form } from "react-bootstrap";
import { IndicadorResponse } from "../../../../../interfaces/indicador_interface";

interface CreateIndicadorProps {
    dimensao: string | undefined
}

interface GraficoComponentProps {
    anexoArquivo: string;
    setAnexoArquivo: React.Dispatch<React.SetStateAction<string>>//(value: string) => void;
    titulo: string;
    setTitulo: React.Dispatch<React.SetStateAction<string>>//(value: string) => void;
    descricao: string;
    setDescricao: React.Dispatch<React.SetStateAction<string>>//(value: string) => void;
    tipoGrafico: string;
    setTipoGrafico: React.Dispatch<React.SetStateAction<string>>//(value: string) => void;
    chaveValorGraficos: { [key: string]: string };
    setArrayIndicadorResponse: React.Dispatch<React.SetStateAction<IndicadorResponse[]>>//(value: IndicadorResponse[]) => void;
}


export const CreateIndicador:FC<CreateIndicadorProps> = ({dimensao}) => {
    const [anexoArquivo, setAnexoArquivo] = useState<string>("")
    const [titulo, setTitulo] = useState<string>("")
    const [indicador, setIndicador] = useState<string>("")
    const [descricao, setDescricao] = useState<string>("")
    const [tipoGrafico, setTipoGrafico] = useState<string>("")
    const [arrayIndicadorResponse, setArrayIndicadorResponse] = useState<IndicadorResponse[]>([])
    const chaveValorGraficos: { [key: string]: string } = {
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
                <label htmlFor="nomeIndicador">Nome</label>
                <input type="text" placeholder="Nome do Indicador" id="idIndicador" name="nomeIndicador" onChange={(e) => setIndicador(e.target.value)} />
                <GraficoComponent anexoArquivo={anexoArquivo} 
                                  setAnexoArquivo={setAnexoArquivo} 
                                  titulo={titulo} 
                                  setTitulo={setTitulo} 
                                  descricao={descricao} 
                                  setDescricao={setDescricao}
                                  tipoGrafico={tipoGrafico} 
                                  setTipoGrafico={setTipoGrafico} 
                                  chaveValorGraficos={chaveValorGraficos}
                                  setArrayIndicadorResponse={setArrayIndicadorResponse}
                                   />
                {}
                {/*<input type="text" placeholder="Titulo do gráfico" onChange={} />
                <input required
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
                </Form.Select>*/}
                {/*<button type="button" onClick={() => postIndicador(dimensao, indicador, anexoArquivo, tipoGrafico, descricao)}>Criar Indicador</button>*/}
                <button type="button" onClick={() => postIndicador(dimensao,arrayIndicadorResponse)}>Criar Indicador</button>
            </form>
        </div>
    )
}

const GraficoComponent:FC<GraficoComponentProps> = ({anexoArquivo, setAnexoArquivo, titulo, setTitulo, descricao, setDescricao, tipoGrafico, setTipoGrafico, setArrayIndicadorResponse,chaveValorGraficos}) => {
    return(
        <div>
        <input type="text" placeholder="Titulo do gráfico" onChange={(e) => setTitulo(e.target.value)
            } />
                <input required
                    type="file"
                    onChange={(e) => handleFileChange(setAnexoArquivo,e)}
                    accept=".csv"
                />
                <input type="text" onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição do gráfico" />
                <Form.Select aria-label="Default select example" onChange={(e) => {setTipoGrafico(e.target.value)}}>
                    <option defaultValue={'Selecione o tipo de gráfico'} >Selecione o tipo de gráfico</option>
                    {Object.keys(chaveValorGraficos).map(key => (
                        <option key={chaveValorGraficos[key]} value={chaveValorGraficos[key]}>
                            {key}
                        </option>
                    ))}
                </Form.Select>
                <button onClick={(e) => setArrayIndicadorResponse(noe)}></button>
        </div>
    )

}