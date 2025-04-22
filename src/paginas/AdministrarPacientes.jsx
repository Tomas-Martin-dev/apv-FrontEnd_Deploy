import { useState } from "react"
import Formulario from "../componentes/Formulario"
import ListadoPacientes from "../componentes/ListadoPacientes"

const AdministrarPacientes = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  

  return (
    <div className='flex flex-col md:flex-row gap-2 px-2'>
      <button 
      type="button"
      className="bg-indigo-600 text-white font-bold rounded-md uppercase mx-10 p-3 mb-10 md:hidden"
      onClick={()=> setMostrarFormulario(!mostrarFormulario)}
      >{!mostrarFormulario ? "Mostrar Formulario" : "Ocultar Formulario"}
      </button>
      
      <div className={`${ mostrarFormulario ? "flex" : "hidden" } md:flex md:w-1/2 lg:w-2/5 flex-col gap-10`}>
        <Formulario/>
      </div>

      <div className="md:w-1/2 lg:w-3/5 flex flex-col gap-10">
        <ListadoPacientes setMostrarFormulario={setMostrarFormulario} />
      </div>
    </div>


  )
}

export default AdministrarPacientes
