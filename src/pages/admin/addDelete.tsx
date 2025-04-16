import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { RenderContentInterface } from '../../interfaces/admin_interfaces/render_content_interface.tsx'
import { deleteAll } from './cruds/deleteAll.tsx'
import Swal from 'sweetalert2'
const AddDelete:FC<RenderContentInterface> = ({dimensao, activeTab, deleteElement}) => {

  const navigate = useNavigate()
  const handleAdd = () => {
    navigate(`/admin/dimensao/${dimensao}/create/${activeTab}/`)
  }

  const handleDelete = async () =>{
    if (deleteElement.length > 0) {
        try{
        //executa todas as promessas em paralelo e espera até que todas sejam concluídas
        await Promise.all(
          deleteElement.map(element => deleteAll(dimensao, activeTab,element))
        )

        await Swal.fire({
                title: 'Sucesso!',
                text: `${activeTab} deletados(as) com sucesso.`,
                icon: 'success',
                confirmButtonColor: 'var(--primary-color)',
              });
        navigate(0)
    }
    catch (error) {
          console.error('Error submitting reference:', error);
          Swal.fire({
            title: 'Erro!',
            text: `Ocorreu um erro ao tentar deletar os ${activeTab}. Por favor, tente novamente.`,
            icon: 'error',
            confirmButtonColor: 'var(--primary-color)',
          });
        } 
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