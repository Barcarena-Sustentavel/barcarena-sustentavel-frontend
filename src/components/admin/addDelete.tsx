import { FC } from 'react'
import { Link } from 'react-router-dom'

const AddDelete:FC = () => {
  return (
    <div>
        <span>
        <Link to='/admin/dimensao/create/'><p>Adicionar</p></Link>
        <button><p>Deletar</p></button>    
        </span>
    </div>
  )
}

export default AddDelete