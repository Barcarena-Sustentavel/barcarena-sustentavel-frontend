import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import dimensoes from '../const.tsx'
import './css/dimensaoAdmin.css'

const DimensaoAdmin: FC = () => {
  const navigate = useNavigate()
  const handleClick = (dimensao: string) => {
    navigate(`/admin/dimensao/${dimensao}/`);
  }

  return (
    <div className="home-container">
      <div className="admin-header">
        <h1>Administração de Dimensões</h1>
      </div>
      
      <div className="dimensoes-grid">
        <div className="dimensoes-column">
          {Object.entries(dimensoes.dimensoesColumn1).map(([key, value]) => (
            <div className="dimensao-card" key={key}>
              <button 
                className="dimensao-button" 
                onClick={() => handleClick(key)}
              >
                <div className="dimensao-icon">
                  {/* You could add icons here if available */}
                </div>
                <h3>{key}</h3>
                <img src={value} style={{width: '100px', height: '100px'}}/>
              </button>
            </div>
          ))}
        </div>
        
        <div className="dimensoes-column">
          {Object.entries(dimensoes.dimensoesColumn2).map(([key, value]) => (
            <div className="dimensao-card" key={key}>
              <button 
                className="dimensao-button" 
                onClick={() => handleClick(key)}
              >
                <div className="dimensao-icon">
                  {/* You could add icons here if available */}
                </div>
                <h3>{key}</h3>
                <img src={value} style={{width: '100px', height: '100px'}}/>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DimensaoAdmin
