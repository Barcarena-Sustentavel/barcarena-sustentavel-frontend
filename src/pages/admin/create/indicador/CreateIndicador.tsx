import React, { FC, useState } from "react"
import { postIndicador } from "./postIndicador.tsx";
import { Form } from "react-bootstrap";
import { GraficosIndicador } from "../../../../interfaces/indicador_interface.tsx";
import "../../css/createIndicador.css";

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
  const [graficoNode, setGraficoNode] = useState<React.ReactElement[]>([
    <GraficoComponent chaveValorGraficos={chaveValorGraficos} />
  ]);

  const addGrafico = (e: React.MouseEvent) => {
    e.preventDefault();
    setGraficoNode([
      ...graficoNode, 
      <GraficoComponent chaveValorGraficos={chaveValorGraficos} />
    ]);
  }

  return (
    <div className="create-indicador-container">
      <h2 className="create-indicador-title">Criar Novo Indicador</h2>
      <form className="create-indicador-form">
        <div className="form-group">
          <label htmlFor="nomeIndicador">Nome do Indicador</label>
          <input 
            type="text" 
            placeholder="Nome do Indicador" 
            id="idIndicador" 
            name="nomeIndicador" 
            onChange={(e) => setIndicador(e.target.value)} 
          />
        </div>
        
        <h3>Gráficos</h3>
        <div id="graficos">
          {graficoNode.map((grafico, index) => (
            <div key={index} className="grafico-component">
              <h3>Gráfico {index + 1}</h3>
              {grafico}
            </div>
          ))}
        </div>
        
        <button 
          className="btn btn-add btn-primary" 
          onClick={addGrafico}
        >
          <span>+</span> Adicionar Gráfico
        </button>
        
        <button 
          type="button" 
          className="btn btn-success"
          onClick={(e) => { 
            e.preventDefault();
            postIndicador(dimensao, indicador, arrayIndicadorResponse)
          }}
        >
          Criar Indicador
        </button>
      </form>
    </div>
  )
}

const GraficoComponent:FC<GraficoComponentProps> = ({chaveValorGraficos}) => {
  const [graficoAdicionado, setGraficoAdicionado] = useState<boolean>(false)
  const [newIndicadorResponse, setNewIndicadorResponse] = useState<GraficosIndicador>({
    arquivo: new File([], ''),
    descricaoGrafico: '',
    tituloGrafico: '',
    tipoGrafico: ''
  })
  const [cacheIndicadorResponse, setCacheIndicadorResponse] = useState<GraficosIndicador | undefined>(undefined)

  return(
    <div>
      <div className="form-group">
        <label htmlFor="tituloGrafico">Título do gráfico</label>
        <input 
          type="text" 
          id="tituloGrafico" 
          name="tituloGrafico" 
          placeholder="Título do gráfico" 
          onChange={(e) => setNewIndicadorResponse(prevState => ({...prevState, tituloGrafico: e.target.value}))} 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="csvGrafico">Dados do gráfico</label>
        <input 
          required
          id="csvGrafico"
          name="csvGrafico"
          type="file"
          onChange={(e) => {
            setNewIndicadorResponse(prevState => ({...prevState, arquivo:e.target.files![0]}))
          }}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="descricaoGrafico">Descrição do gráfico</label>
        <input 
          type="text" 
          id="descricaoGrafico" 
          name="descricaoGrafico" 
          onChange={(e) => setNewIndicadorResponse(prevState => ({...prevState, descricaoGrafico: e.target.value}))} 
          placeholder="Descrição do gráfico" 
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="tipoGrafico">Tipo de Gráfico</label>
        <Form.Select 
          className="form-select"
          aria-label="Tipo de gráfico" 
          onChange={(e) => setNewIndicadorResponse(prevState => ({...prevState, tipoGrafico: e.target.value}))}
        >
          <option value="">Selecione o tipo de gráfico</option>
          {Object.keys(chaveValorGraficos).map(key => (
            <option key={chaveValorGraficos[key]} value={chaveValorGraficos[key]}>
              {key}
            </option>
          ))}
        </Form.Select>
      </div>
      
      <button 
        type="button" 
        className={`btn ${graficoAdicionado ? 'btn-success' : 'btn-apply'}`}
        onClick={() => {
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
      >
        {graficoAdicionado ? 'Atualizar' : 'Aplicar'}
      </button>
    </div>
  )
}
