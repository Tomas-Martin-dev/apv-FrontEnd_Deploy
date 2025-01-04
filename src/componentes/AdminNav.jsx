import {Link} from 'react-router-dom'

const AdminNav = () => {
  return (
    <nav className=' flex gap-5'>
        <Link
        to="/admin/editar-password"
        className=' text-gray-600 hover:text-gray-800 font-semibold'
        > Cambiar Constraseña
        </Link>

        <Link
        to="/admin/perfil"
        className=' text-gray-600 hover:text-gray-800 font-semibold'
        >Perfil
        </Link>


    </nav>
)
}

export default AdminNav