import usePaciente from "../hooks/usePaciente";

const Paciente = ({paciente}) => {
    
    const { email, fechaAlta, nombre, propietario, diagnostico, _id } = paciente;
    
    const { setEdicion, eliminarPaciente } = usePaciente();

    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha); // Crear objeto Date
        return new Intl.DateTimeFormat("es-AR", { 
            dateStyle: "long", 
            timeZone: "UTC" // Forzar que se interprete como UTC
        }).format(nuevaFecha);
    };
    

    return (
        <div className='px-5 bg-white my-2 shadow-md py-5 rounded-xl '>
            <p className=' font-medium uppercase text-gray-600 mb-1'>
                Nombre: <samp className='font-normal normal-case text-black'>
                    {nombre}
                </samp>
            </p>
            <p className=' font-medium uppercase text-gray-600 mb-1'>
                Propietario: <samp className='font-normal normal-case text-black'>
                    {propietario}
                </samp>
            </p>
            <p className=' font-medium uppercase text-gray-600 mb-1'>
                Email: <samp className='font-normal normal-case text-black'>
                    {email}
                </samp>
            </p>
            <p className=' font-medium uppercase text-gray-600 mb-1'>
                Fecha de ALta: <samp className='font-normal normal-case text-black'>
                    {formatearFecha(fechaAlta)}
                </samp>
            </p>
            <p className=' font-medium uppercase text-gray-600 mb-1'>
                Sintomas: <samp className='font-normal normal-case text-black'>
                    {diagnostico}
                </samp>
            </p>

            <div className="flex justify-between my-5">
                <button 
                type="button"
                className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase rounded-lg"
                onClick={ () => setEdicion(paciente)}
                >Editar
                </button>
                <button 
                type="button" 
                className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase rounded-lg"
                onClick={()=> eliminarPaciente(_id)}
                >Elimiar
                </button>
            </div>
        </div>
    )
}

export default Paciente