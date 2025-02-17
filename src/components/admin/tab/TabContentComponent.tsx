import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dimensao } from '../../../interfaces/dimensao_interface';
import { RenderContentInterface } from '../../../interfaces/admin_interfaces/render_content_interface';
import api from '../../../api';
import AddDelete from '../addDelete'; 

export const TabContentComponent:FC<RenderContentInterface> = ({dimensao, activeTab}) => {
    const [dimensaoJson, setDimensao] = useState<Dimensao>()
    const [indicadores, setIndicadores] = useState<string[]>([])
    const [referencias, setReferencias] = useState<string[]>([])
    const [contribuicoes, setContribuicoes] = useState<string[]>([])
    const [kmls, setKmls] = useState<string[]>([])
    let activeTabDict:any = {
      'Indicadores': indicadores,
      'Referências': referencias,
      'Contribuições': contribuicoes,
      'Kmls': kmls
    }
    const urls:string[] = [`/dimensoes/${dimensao}/`, `/dimensoesAdmin/${dimensao}/`]
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
      urls.forEach(url => {api.get(url)
        .then(response => {
          if (url === `/dimensoes/${dimensao}/`){
            setDimensao(response.data.dimensao)
            for (let i = 0; i < response.data.indicadores.length; i++) {
              setIndicadores(indicadores => [...indicadores, response.data.indicadores[i].nome])
            }
            for (let i = 0; i < response.data.referencias.length; i++) {
              setReferencias(referencias => [...referencias, response.data.referencias[i].nome])
            }
          }
          else if (`/dimensoesAdmin/${dimensao}/`){
            setContribuicoes(response.data.contribuicoes)
            setKmls(response.data.kmls)
          }
        }).catch(error => {
          if (url === `/dimensoes/${dimensao}/`) {
            setDimensao(undefined)
            setIndicadores([])
            setReferencias([])
          }
          else if (url === `/dimensoesAdmin/${dimensao}/`) {
            setContribuicoes([])
            setKmls([])
          }
          console.log(error)
        })
      });
    })

    if (activeTab === 'Dimensão') {
      return (
        <div>
          <label>ID</label>
          <input type="text" placeholder={dimensaoJson?.id.toString()} disabled />
          
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
          <AddDelete />
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
  
