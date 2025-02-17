import {FC} from 'react'
import { Link } from 'react-router-dom'

const SideBar:FC = () => {
  const adminPage:string = "/admin/dimensao/" 

  return (
    <div className=''>
      <div>
        <h2>Administração</h2>
        <div>
            <Link to={adminPage}>
            <h3>Dimensão</h3>
            </Link> 
            <Link to={adminPage}>
            <h3>Contribuição</h3>
            </Link>
            
        </div>
      </div>
    </div>
  )
}

export default SideBar