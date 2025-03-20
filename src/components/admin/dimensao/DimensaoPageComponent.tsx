import { FC, useState} from 'react'
import { useParams } from 'react-router-dom'
import { TabContentComponent } from '../tab/TabContentComponent.tsx'


const DimensaoPageComponent:FC = () => {
  const {dimensao} = useParams()
  const [activeTab, setActiveTab] = useState<string>('Dimensão')
  return (
    <div>
      <nav>
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

export default DimensaoPageComponent