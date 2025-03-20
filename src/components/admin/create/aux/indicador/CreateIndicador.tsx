import React, { FC, useState } from "react"
<<<<<<< HEAD
import { postIndicador } from "./postIndicador";
import { Form } from "react-bootstrap";
import { GraficosIndicador } from "../../../../../interfaces/indicador_interface";
=======
import { postIndicador } from "./postIndicador.tsx";
import { Form } from "react-bootstrap";
import { GraficosIndicador } from "../../../../../interfaces/indicador_interface.tsx";
>>>>>>> 58089f24 (Dockerfile funcionand)

interface CreateIndicadorProps {
    dimensao: string | undefined
}

interface GraficoComponentProps {
    chaveValorGraficos: { [key: string]: string };
}

let arrayIndicadorResponse: GraficosIndicador[] = []

export const CreateIndicador:FC<CreateIndicadorProps> = ({dimensao}) => {
    const [indicador, setIndicador] = useState<string>("")
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
    const [graficoNode, setGraficoNode] = useState<React.ReactElement[]>([<GraficoComponent 
        chaveValorGraficos={chaveValorGraficos}
         />])
   

    const addGrafico = () =>{
        setGraficoNode([...graficoNode, <GraficoComponent chaveValorGraficos={chaveValorGraficos}/>
        ]
        )
    }

    return (
        <div>
            <form>
                <label htmlFor="nomeIndicador">Nome</label>
                <input type="text" placeholder="Nome do Indicador" id="idIndicador" name="nomeIndicador" onChange={(e) => setIndicador(e.target.value)} />
                
            <div id="graficos">

            {graficoNode.map((grafico) => grafico)}
            </div>          
                <button id="criarGrafico" onClick={addGrafico}>Adicionar Gráfico</button>
                <button type="button" onClick={(e) => { e.preventDefault();
                                                        postIndicador(dimensao,indicador,arrayIndicadorResponse)}}>
                                                        Criar Indicador</button>
            </form>
        </div>
    )
}

const GraficoComponent:FC<GraficoComponentProps> = ({/*arrayIndicadorResponse,*/ chaveValorGraficos}) => {
    const [graficoAdicionado, setGraficoAdicionado] = useState<boolean>(false)
    const [newIndicadorResponse, setNewIndicadorResponse] = useState<GraficosIndicador>({
<<<<<<< HEAD
        arquivo: ,
=======
        arquivo: new File([], ''),
>>>>>>> 58089f24 (Dockerfile funcionand)
        descricaoGrafico: '', 
        tituloGrafico: '',
        tipoGrafico: ''
    })
    const [cacheIndicadorResponse, setCacheIndicadorResponse] = useState<GraficosIndicador | undefined>(undefined)

    return(
        <div>
        <label htmlFor="tituloGrafico">Titulo do gráfico</label>
        <input type="text" id="tituloGrafico" name="tituloGrafico" placeholder="Titulo do gráfico" onChange={(e) => 
                                            setNewIndicadorResponse(prevState => ({...prevState, tituloGrafico: e.target.value})) 
            } />
        <label htmlFor="csvGrafico">Dados do gráfico</label>
                <input required
                    id="csvGrafico"
                    name="csvGrafico"
                    type="file"
                    onChange={(e) => 
                        {   
                            //const formArquivo = new FormData();
                            //formArquivo.append('arquivo', e.target.files![0]);
                            //setNewIndicadorResponse(prevState => ({...prevState, arquivo:formArquivo}))
                            setNewIndicadorResponse(prevState => ({...prevState, arquivo:e.target.files![0]}))
                        }
                    }
                    /*accept=".csv"*/
                />
        <label htmlFor="descricaoGrafico">Descrição do gráfico</label>
        <input type="text" id="descricaoGrafico" name="descricaoGrafico" onChange={(e) => setNewIndicadorResponse(prevState => ({...prevState, descricaoGrafico: e.target.value}))} placeholder="Descrição do gráfico" />
        <label htmlFor="">Tipo Gráfico</label>
        <Form.Select aria-label="Default select example" onChange={(e) => setNewIndicadorResponse(prevState => ({...prevState, tipoGrafico: e.target.value}))}>
            <option defaultValue={'Selecione o tipo de gráfico'} >Selecione o tipo de gráfico</option>
            {Object.keys(chaveValorGraficos).map(key => (
                <option key={chaveValorGraficos[key]} value={chaveValorGraficos[key]}>
                    {key}
                </option>
            ))}
        </Form.Select>
        <button type="button" onClick={() => {
            if (graficoAdicionado === true){
                arrayIndicadorResponse.map(indicador => {
                    if(indicador === cacheIndicadorResponse){
                        indicador = newIndicadorResponse
                        setCacheIndicadorResponse(newIndicadorResponse)
                        setGraficoAdicionado(true)
                        return
                    }
                })
            }
            else{
                setCacheIndicadorResponse(newIndicadorResponse)
                arrayIndicadorResponse.push(newIndicadorResponse)
                setGraficoAdicionado(true)
            }
                }}
                >Aplicar</button>
        </div>
    )

}