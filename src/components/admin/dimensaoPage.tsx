import { FC , useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api'
import SideBar from './sideBar'
import {Dimensao} from '../../interfaces/dimensao_interface'
import {Indicador} from '../../interfaces/indicador_interface'
import { Referencia } from '../../interfaces/referencia_interface'

const DimensaoPage:FC = () => {
  const { dimensao } = useParams()
  //Dados da dimensão
  const [dimensaoJson, setDimensao] = useState<Dimensao>()
  //Lista de dados dos indicadores relacionados a dimensão
  const [indicadores, setIndicadores] = useState<Indicador[]>([])
  const [referencias, setReferencias] = useState<Referencia[]>([])
  const [activeTab, setActiveTab] = useState('Dimensao')
  //Dados dos formulário para serem entregues
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

  //Função para enviar os dados do formulário
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

  //Função para mostrar os indicadores relacionados a dimensão 
  useEffect(() => {
    api.get(`/dimensoes/${dimensao}/`)
      .then(response => {
        setDimensao(response.data.dimensao)
        setIndicadores(response.data.indicadores)
        setReferencias(response.data.referencias)
        console.log(indicadores)
        console.log(referencias)

      })
      .catch(error => {
        console.log(error)
      })
    }, [dimensao])
  
  
  const renderContent = () => {
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

    if (activeTab === 'Indicadores') {
      return (
        <div>
          <h2>Lista de Indicadores</h2>
          {indicadores.map(indicador => (
            <div key={indicador.id}>
              <p>Nome: {indicador.nome}</p>            
            </div>
          ))}
        </div>
      )
    }

    if (activeTab === 'Referências'){
      return(
        <div>
          {referencias.map(referencia => (
            <div>
              <p>{referencia.nome}</p>
              <p>{referencia.link}</p>
            </div>
          )
          )}

        </div>
      )
    }
  }

  return (
    <div>
      <SideBar/>
      <nav /*style={styles.navbar}*/>
        <button 
          //style={activeTab === 'dimensao' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('Dimensão')}
        >
          Dimensão
        </button>
        <button 
          /*style={activeTab === 'indicadores' ? styles.activeTab : styles.tab}*/
          onClick={() => setActiveTab('Indicadores')}
        >
          Indicadores
        </button>

        <button

          onClick={() => setActiveTab('Referências')}
        >
          Referências
        </button>
      </nav>
      {renderContent()}
    </div>
  )
}

export default DimensaoPage