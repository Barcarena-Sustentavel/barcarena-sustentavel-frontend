import {FC} from 'react'
import SideBar from './sideBar'
import { useNavigate } from 'react-router-dom'

const DimensaoAdmin:FC = () => {
    /*const dimensoes = [
        "Segurança",
        "Mobilidade",
        "Saúde",
        "Ordenamento Territorial",
        "Meio Ambiente",
        "Instituições",
        "Emprego",
        "Educação",
        "Conectividade"
    ]*/
    const dimensoes = ["Social", "Economica", "Ambiental"]
        
    const navigate = useNavigate()
    const handleClick = (dimensao:string) => {
        navigate(`/admin/dimensao/${dimensao}`);
    }

        return (
    <div>
        <SideBar/>
        <div>
            {dimensoes.map((dimensao) => (
                <ul key={dimensao}>
                    <li> 
                        <button onClick={() => handleClick(dimensao)}> 
                            <h3>{dimensao}</h3>
                        </button>
                    </li>
                </ul> 
            ))}
        </div>
    </div>
  )
}

export default DimensaoAdmin