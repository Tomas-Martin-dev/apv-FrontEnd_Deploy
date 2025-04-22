import usePaciente from "../hooks/usePaciente"
import Paciente from "./Paciente";

const ListadoPacientes = ({setMostrarFormulario}) => {
  const {paciente} = usePaciente()
  
  return (
    <>
      {paciente.length ? (
        <>
          <h1 className=" text-2xl font-semibold text-center min-h-16 lg:min-h-0" 
          >Listado de tus<span className="text-indigo-600" 
          >&nbsp;Pacientes </span></h1> 

          {paciente.map(pac => (
            <Paciente
              key={pac._id}
              paciente={pac}
              setMostrarFormulario={setMostrarFormulario}
            />
          ))}
        </>
      ) : (
        <>
          <h1 className="uppercase text-2xl font-semibold text-center lg:min-h-16" 
          >No tienes
          <span className="text-indigo-600" 
          >&nbsp;pacientes </span> 
          registrados
          </h1>
        </>
      ) }
    
    </>
  )
}

export default ListadoPacientes