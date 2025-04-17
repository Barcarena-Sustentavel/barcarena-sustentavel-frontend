import React, { FC, useState } from "react"
import { GraficosIndicador } from "../../../../../interfaces/indicador_interface.tsx"
import { Form } from "react-bootstrap";

interface GraficoComponentProps {
  chaveValorGraficos: { [key: string]: string };
  grafico: GraficosIndicador | undefined;
  arrayIndicadorResponse: GraficosIndicador[] 
}
export const GraficoComponent:FC<GraficoComponentProps> = ({chaveValorGraficos, grafico, arrayIndicadorResponse}) => {
    const [graficoModificado, setGraficoModificado] = useState<GraficosIndicador>({ 
        id: null,
        arquivo: new File([], ''),
        descricaoGrafico: '',
        tituloGrafico: '',
        tipoGrafico: ''})

    const [graficoAdicionado, setGraficoAdicionado] = useState<boolean>(false)
    const [newIndicadorResponse, setNewIndicadorResponse] = useState<GraficosIndicador>(grafico === undefined ? {
        id: null,
        arquivo: new File([], ''),
        descricaoGrafico: '',
        tituloGrafico: '',
        tipoGrafico: ''
    } : grafico)
    const [cacheIndicadorResponse, setCacheIndicadorResponse] = useState<GraficosIndicador | undefined>(undefined)
    
    if(grafico !== undefined){
    setGraficoModificado(prevState => ({
        ...prevState,
        id: grafico.id
    }));
}

    return(
        <div>
            <div className="form-group">
            <label htmlFor="tituloGrafico">Título do gráfico</label>
            <input 
            type="text" 
            id="tituloGrafico" 
            name="tituloGrafico" 
            placeholder="Título do gráfico" 
            value={newIndicadorResponse.tituloGrafico !== '' ? newIndicadorResponse.tituloGrafico : ''}
            onChange={(e) => {
                if(grafico !== undefined){
                    setGraficoModificado(prevState => ({
                        ...prevState,
                        tituloGrafico: e.target.value
                    }));
                }else{
                    setNewIndicadorResponse(prevState => ({...prevState, tituloGrafico: e.target.value} 
                    ))}
            }} 
            />
        </div>
        
        <div className="form-group">
            <label htmlFor="csvGrafico">Dados do gráfico</label>
            {newIndicadorResponse.arquivo !== '' && ( <div>
                <p>{`Arquivo atual: ${newIndicadorResponse.arquivo}`}</p>
            </div> )}
            <input 
            required
            id="csvGrafico"
            name="csvGrafico"
            type="file"
            onChange={(e) => {
                if(grafico !== undefined){
                    setGraficoModificado(prevState => ({
                        ...prevState,
                        arquivo: e.target.files![0]
                    }));
                }else{
                    setNewIndicadorResponse(prevState => ({...prevState, arquivo:e.target.files![0]}))
                }
            }}
            />
        </div>
        
        <div className="form-group">
            <label htmlFor="descricaoGrafico">Descrição do gráfico</label>
            <input 
                type="text" 
                id="descricaoGrafico" 
                name="descricaoGrafico" 
                value={newIndicadorResponse.descricaoGrafico !== '' ? newIndicadorResponse.descricaoGrafico : ''}
                onChange={(e) => {
                    if(grafico !== undefined){
                        setGraficoModificado(prevState => ({
                            ...prevState,
                            descricaoGrafico: e.target.value
                        }));
                    }else{
                        setNewIndicadorResponse(prevState => ({...prevState, descricaoGrafico: e.target.value}))
                        }
                    } 
                }
                placeholder="Descrição do gráfico" 
            />
        </div>
        
        <div className="form-group">
            <label htmlFor="tipoGrafico">Tipo de Gráfico</label>
            <Form.Select 
            className="form-select"
            aria-label="Tipo de gráfico" 
            value={newIndicadorResponse.tipoGrafico !== '' ? newIndicadorResponse.tipoGrafico : ''}
            onChange={(e) => {
                if(grafico !== undefined){
                    setGraficoModificado(prevState => ({
                        ...prevState,
                        tipoGrafico: e.target.value
                    }));
                }else{
                    setNewIndicadorResponse(prevState => ({...prevState, tipoGrafico: e.target.value}))}
                }
            }
            >
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
                        if(grafico !== undefined){
                            setCacheIndicadorResponse(indicador)
                        }
                        else{
                            indicador = newIndicadorResponse
                            setCacheIndicadorResponse(newIndicadorResponse)
                            
                        }
                        setGraficoAdicionado(true)
                        return
                    }
                    })
            }
            else{

                if(grafico !== undefined){
                    setCacheIndicadorResponse(graficoModificado)
                    arrayIndicadorResponse.push(graficoModificado)
                }
                else{
                    setCacheIndicadorResponse(newIndicadorResponse)
                    arrayIndicadorResponse.push(newIndicadorResponse)
                }
                setGraficoAdicionado(true)
                console.log(arrayIndicadorResponse)
            }
            }}
        >
            {graficoAdicionado ? 'Atualizar' : 'Aplicar'}
        </button>
        </div>
    )
}  