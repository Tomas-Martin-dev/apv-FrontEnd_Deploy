import { useState, useEffect } from 'react'
import Alerta from './Alerta';
import usePaciente from '../hooks/usePaciente';

const Formulario = () => {
    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [fechaAlta, setfechaAlta] = useState("");
    const [diagnostico, setDiagnostico] = useState("");
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({});
    
    const { guardarPaciente, pacienteEdit } = usePaciente();

    const handleSubmit = (e) => {
        e.preventDefault()
        if ([nombre, propietario, email, fechaAlta, diagnostico].includes("")) {
            setAlerta({ msg: "Hay Campos Vacios", error: true })
            return
        }
        guardarPaciente({nombre, propietario, email, fechaAlta, diagnostico, id})
        setAlerta({msg: "Guardado Correctamente"});        
        
        setTimeout(() => {
            setAlerta({});        
        }, 2000);

        setDiagnostico("");
        setEmail("");
        setId("");
        setNombre("");
        setPropietario("");
        setfechaAlta("");
    }

    useEffect(()=>{
        if (pacienteEdit?.nombre) {
            setNombre(pacienteEdit.nombre);
            setPropietario(pacienteEdit.propietario);
            setEmail(pacienteEdit.email);
            setfechaAlta(pacienteEdit.fechaAlta);
            setDiagnostico(pacienteEdit.diagnostico);
            setId(pacienteEdit._id)
        }
    },[pacienteEdit])

    const { msg } = alerta;
    return (
        <>
            <p className='text-lg text-center mb-10'>Añade tus pacientes y
                <span className='text-indigo-400 font-bold'> Administralos</span>
            </p>

            <form
                action=""
                className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md'
            >
                <div className='mb-5'>
                    <label
                        htmlFor="mascota"
                        className='text-gray-700 uppercase font-semibold'
                    >Nombre Mascota</label>
                    <input
                        type="text"
                        id='mascota'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        placeholder='Nombre de la Mascota'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    />
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor="propietario"
                        className='text-gray-700 uppercase font-semibold'
                    >Nombre Propietario</label>
                    <input
                        type="text"
                        id='propietario'
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                        placeholder='Nombre del Propietario'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    />
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor="email"
                        className='text-gray-700 uppercase font-semibold'
                    >Email</label>
                    <input
                        type="email"
                        id='email'
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Email del Propietario'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    />
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor="fecha"
                        className='text-gray-700 uppercase font-semibold'
                    >Fecha de Alta</label>
                    <input
                        type="date"
                        id='fecha'
                        value={fechaAlta}
                        onChange={e => setfechaAlta(e.target.value)}
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    />
                </div>
                <div className='mb-5'>
                    <label
                        htmlFor="sintomas"
                        className='text-gray-700 uppercase font-semibold'
                    >Sintomas</label>
                    <textarea
                        id='diagnostico'
                        value={diagnostico}
                        onChange={e => setDiagnostico(e.target.value)}
                        placeholder='Describe los sintomas del paciente'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    />
                </div>
                <input
                    type="submit"
                    value={id ? "Editar" : "Agregar Paciente"}
                    onClick={handleSubmit}
                    className='bg-indigo-500 w-full p-2 uppercase font-semibold hover:bg-indigo-600
                cursor-pointer transition-colors rounded-sm text-white mb-5' />
                
                {msg && <Alerta
                    alerta={alerta}
                />}
            </form>
        </>
    )
}

export default Formulario