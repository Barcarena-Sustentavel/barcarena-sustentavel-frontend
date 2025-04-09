import { FC, useState} from 'react'
import { useParams } from 'react-router-dom'
import { TabContentComponent } from '../tab/TabContentComponent.tsx'
import '../css/dimensaoPage.css'

const DimensaoPageComponent:FC = () => {
  const {dimensao} = useParams()
  const [activeTab, setActiveTab] = useState<string>('Dimensão')
  return (
    <div className="home-container">
      <div className="admin-header">
        <h1>Administração de {dimensao}</h1>
      </div>
      
      <div className="admin-tabs-container">
        <nav className="admin-tabs-nav">
          <button 
            className={`admin-tab-button ${activeTab === 'Dimensão' ? 'active' : ''}`}
            onClick={() => setActiveTab('Dimensão')}
          >
            Dimensão
          </button>
          <button 
            className={`admin-tab-button ${activeTab === 'Indicadores' ? 'active' : ''}`}
            onClick={() => setActiveTab('Indicadores')}
          >
            Indicadores
          </button>

          <button
            className={`admin-tab-button ${activeTab === 'Referências' ? 'active' : ''}`}
            onClick={() => setActiveTab('Referências')}
          >
            Referências
          </button>

          <button
            className={`admin-tab-button ${activeTab === 'Contribuições' ? 'active' : ''}`}
            onClick={() => setActiveTab('Contribuições')}
          >
            Contribuições
          </button>

          <button
            className={`admin-tab-button ${activeTab === 'Kmls' ? 'active' : ''}`}
            onClick={() => setActiveTab('Kmls')}
          >
            Kmls
          </button>
        </nav>
        
        <div className="admin-tab-content">
          <TabContentComponent dimensao={dimensao} activeTab={activeTab}/>
        </div>
      </div>
    </div>
  )
}

export default DimensaoPageComponent
