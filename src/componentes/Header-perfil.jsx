import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const HeaderPerfil = () => {
  const {cerrarSession} = useAuth();
  
    return (
    <header className='py-10 bg-indigo-600'>
        <div className=' container mx-auto flex flex-col lg:flex-row justify-between items-center'>
            <h1 className='font-bold text-indigo-100 text-2xl text-center'> Administrador de Pacientes
                <span className='text-white font-bold'> Veterinaria </span>
            </h1>

            <nav className='flex flex-col lg:flex-row items-center gap-4 mt-5 lg:mt-0'>
                <Link to="/admin" className='text-white text-xl'>Pacientes</Link>
                <Link to="/admin/perfil" className='text-white text-xl font-semibold'>Perfil</Link>
                <button 
                    className='text-white text-xl font-bold'
                    onClick={cerrarSession}
                >
                Cerrar Session
                </button>
            </nav>
        </div>
    </header>
  )
}

export default HeaderPerfil