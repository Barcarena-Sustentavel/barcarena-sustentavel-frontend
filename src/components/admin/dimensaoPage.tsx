import { FC , useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api'
import SideBar from './sideBar'
import {Dimensao} from '../../interfaces/dimensao_interface'
import {Indicador} from '../../interfaces/indicador_interface'

const DimensaoPage:FC = () => {
  const { dimensao } = useParams()
  const [dimensaoJson, setDimensao] = useState<Dimensao>()
  const [indicadores, setIndicadores] = useState<Indicador[]>([])

  useEffect(() => {
    api.get(`/dimensao/${dimensao}/`)
      .then(response => {
        setDimensao(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [dimensao])
  return (
    <div>
        <SideBar/>
        <div>
          <label>ID</label>
          <input type="text" placeholder={dimensaoJson?.id.toString()}/>
          <label>Nome</label>
          <input type="text" value={dimensaoJson?.nome}/>
          <label>Descrilção</label>
          <input type="text" value={dimensaoJson?.descricao}/>
        </div>
    </div>
  )
}

export default DimensaoPage