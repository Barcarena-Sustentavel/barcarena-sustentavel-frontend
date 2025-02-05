import {FC} from 'react'
import SideBar from './sideBar'
import { useNavigate } from 'react-router-dom'
import dimensoes  from '../const'

const DimensaoAdmin:FC = () => {     
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