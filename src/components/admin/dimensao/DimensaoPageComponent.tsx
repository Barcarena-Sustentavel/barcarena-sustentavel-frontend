import { FC, useState} from 'react'
import { useParams } from 'react-router-dom'
import SideBar from '../sideBar/SideBarComponent'
import { TabContentComponent } from '../tab/TabContentComponent'

const DimensaoPage:FC = () => {
  const {dimensao} = useParams()
  const [activeTab, setActiveTab] = useState<string>('Dimensao')
  
  return (
    <div>
      <SideBar/>
      <nav /*style={styles.navbar}*/>
        <button 
          onClick={() => setActiveTab('Dimensão')}
        >
          Dimensão
        </button>
        <button 
          onClick={() => setActiveTab('Indicadores')}
        >
          Indicadores
        </button>

        <button
          onClick={() => setActiveTab('Referências')}
        >
          Referências
        </button>

        <button
        onClick={() => setActiveTab('Contribuições')}
        >
          Contribuições
        </button>

        <button
        onClick={() => setActiveTab('Kmls')}
        >
          Kmls
        </button>
      </nav>
      <TabContentComponent dimensao={dimensao} activeTab={activeTab}/>
    </div>
  )
}

export default DimensaoPage