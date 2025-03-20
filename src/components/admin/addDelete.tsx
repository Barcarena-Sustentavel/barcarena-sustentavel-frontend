import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { RenderContentInterface } from '../../interfaces/admin_interfaces/render_content_interface.tsx'

const AddDelete:FC<RenderContentInterface> = ({dimensao, activeTab}) => {

  const navigate = useNavigate()
  const handleAdd = () => {
    navigate(`/admin/dimensao/${dimensao}/create/${activeTab}/`)
  }

  const handleDelete = () => {
    navigate(`/admin/dimensao/${dimensao}/delete/${activeTab}/`)
  }
  return (
    <div>
        <span>
        <button onClick={handleAdd}><p>Adicionar</p></button>
        <button onClick={handleDelete}><p>Deletar</p></button>    
        </span>
    </div>
  )
}

export default AddDelete