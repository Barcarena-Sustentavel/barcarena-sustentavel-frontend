import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { RenderContentInterface } from '../../interfaces/admin_interfaces/render_content_interface.tsx'
import { deleteAll } from './cruds/deleteAll.tsx'

const AddDelete:FC<RenderContentInterface> = ({dimensao, activeTab, deleteElement}) => {

  const navigate = useNavigate()
  const handleAdd = () => {
    navigate(`/admin/dimensao/${dimensao}/create/${activeTab}/`)
  }

  const handleDelete = () => {
    console.log(deleteElement)
    if (deleteElement.length > 0) {
       deleteElement.forEach(element => {
        deleteAll(dimensao, activeTab,element)
       })
    }
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