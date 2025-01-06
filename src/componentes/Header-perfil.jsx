import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import logo from "../assets/logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldCat } from '@fortawesome/free-solid-svg-icons'


const HeaderPerfil = () => {
    const { cerrarSession } = useAuth();

    return (
        <header className='py-11 md:py-8 px-5 bg-indigo-600 select-none'>
            <div className=' container mx-auto flex flex-col lg:flex-row justify-between items-center'>
                <div className='flex items-center gap-2 w-full justify-center lg:w-auto '>
                    <FontAwesomeIcon icon={faShieldCat} size="3x" style={{color: "#ffffff",}} className=' absolute top-1 left-1 md:relative md:top-0 md:left-0' />               
                    <h1 className='font-bold text-white text-2xl text-center'> Administrador de Pacientes
                    <span className='text-amber-200  font-bold'> Veterinaria </span>
                    </h1>
                </div>

                <nav className='flex flex-col lg:flex-row items-center gap-4 mt-5 lg:mt-0'>
                    <Link to="/admin" className='text-white text-xl hover:text-amber-200 transition-colors'>Pacientes</Link>
                    <Link to="/admin/perfil" className='text-white text-xl hover:text-amber-200 transition-colors'>Perfil</Link>
                    <button
                        className='text-white text-xl font-bold hover:text-amber-200 transition-colors'
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