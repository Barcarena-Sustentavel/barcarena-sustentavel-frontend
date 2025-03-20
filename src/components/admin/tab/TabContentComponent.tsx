import React, { FC, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Dimensao } from '../../../interfaces/dimensao_interface.tsx';
import { RenderContentInterface } from '../../../interfaces/admin_interfaces/render_content_interface.tsx';
import api from '../../../api.tsx';
import AddDelete from '../addDelete.tsx'; 


export const TabContentComponent:FC<RenderContentInterface> = ({dimensao, activeTab}) => {
    const [dimensaoJson, setDimensao] = useState<Dimensao>()
    const [nomeIndicadores, setNomeIndicadores] = useState<string[]>([])
    const [nomeReferencias, setNomeReferencias] = useState<string[]>([])
    const [nomeContribuicoes, setNomeContribuicoes] = useState<string[]>([])
    const [nomeKmls, setNomeKmls] = useState<string[]>([])
    const url:string = `/admin/dimensoes/${dimensao}/`
    const activeTabDict:{[key: string]: string[]} = {
      'Indicadores': nomeIndicadores,
      'Referências': nomeReferencias,
      'Contribuições': nomeContribuicoes,
      'Kmls': nomeKmls
    }
    

    //Lista de dados dos indicadores relacionados a dimensão
    const [formData, setFormData] = useState({
        nome: '',
        descricao: ''
      })
    //Função para atualizar o estado do formulário
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Desestruturação do evento em nome e valor do input
        const { name, value } = e.target
        //Atualiza o estado do formulário
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
      }

    const handleSubmit = async () => {
      try {
        const response = await api.put(`/dimensoes/${dimensaoJson?.id}/`, {
          nome: formData.nome,
          descricao: formData.descricao
        })
        setDimensao(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
        api.get(url).then(response => {
            setDimensao(response.data.dimensao)
            setNomeIndicadores(indicadores => [...indicadores, response.data.indicadores])
            setNomeReferencias(referencias => [...referencias, response.data.referencias])
            setNomeContribuicoes(contribuicoes => [...contribuicoes, response.data.contribuicoes])
            setNomeKmls(kmls => [...kmls, response.data.kmls])
        }).catch(error => {
            setDimensao(undefined)
            setNomeIndicadores([])
            setNomeReferencias([])
          
            setNomeContribuicoes([])
            setNomeKmls([])
          console.log(error)
        })
      }, [url, dimensao])

    if (activeTab === 'Dimensão') {
      return (
        <div>  
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            placeholder={dimensaoJson?.nome.toString()}
            onChange={handleInputChange}
          />
          
          <label>Descrição</label>
          <input
            type="text"
            name="descricao"
            value={formData.descricao}
            placeholder={dimensaoJson?.descricao.toString()}
            onChange={handleInputChange}
          />

          <button onClick={handleSubmit}>Salvar Alterações</button>
        </div>
      )
    }

    else{
        return (<div>
          <AddDelete dimensao={dimensao} activeTab={activeTab} />
        <div>
        {activeTabDict[activeTab].map((elementName:string) => {
          return (
            <Link to={`/dimensoes/${dimensao}/${elementName}`}>
              <p>{elementName}</p>
            </Link>
          )
        })}
        </div>
        </div>)
    }
  }
  
