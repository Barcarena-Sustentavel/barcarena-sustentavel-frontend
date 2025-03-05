import {FC} from 'react'
import { useNavigate } from 'react-router-dom'
import dimensoes  from '../const'
//import AddDelete from './addDelete'

const DimensaoAdmin:FC = () => {     
    const navigate = useNavigate()
    const handleClick = (dimensao:string) => {
        navigate(`/admin/dimensao/${dimensao}/`);
    }

        return (
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
  )
}

export default DimensaoAdmin