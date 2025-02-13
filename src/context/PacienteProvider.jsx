import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacienteContext = createContext();

export const PacienteProvider =  ({children}) => {
    const [paciente, setPaciente] =  useState([]);
    const [pacienteEdit, setPacienteEdit] =  useState({});
    const { auth } = useAuth();
    
    useEffect(()=>{
        const traerPacientesGuardados = async ()=>{
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setPaciente([])
                    return   
                }
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} =  await clienteAxios("/paciente", config);
                setPaciente(data)            
                
            } catch (error) {
                console.log(error);
            }
        }
        traerPacientesGuardados()
    },[auth])
    
    const guardarPaciente = async (pac)=>{

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (pac.id) {
            try {
                const {data} = await clienteAxios.put(`/paciente/${pac.id}`, pac, config);          
                const paceintesActualizados = paciente.map(pacState => pacState._id === data._id ? data : pacState)
                setPaciente(paceintesActualizados)
            } catch (error) {
                console.log(error);
            }
        }
        else{
            try {
                const {data} =  await clienteAxios.post("/paciente", pac, config);
                const {createdAt, updatedAt, __v, ...ObjNow } = data;
                setPaciente([ObjNow, ...paciente]);
                                
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    } 
    
    const setEdicion = paciente =>{
        setPacienteEdit(paciente)        
    }

    const eliminarPaciente = async id => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        } 
        const comfirmar = confirm("¿Quieres eliminar este usuario? No podras recuperar su historial")
        if (comfirmar) {
            try {
                const {data} = await clienteAxios.delete(`paciente/${id}`,config);
                console.log("Paciente ELIMINADO!");
                const paceintesActualizados =  paciente.filter( paceinteState => paceinteState._id !== id );
                setPaciente(paceintesActualizados);
            } catch (error) {
                console.log(error.response.date.msg);
                
            }
        } 
    }

    return(
        <PacienteContext.Provider
        value={{
            paciente,
            guardarPaciente,
            setEdicion,
            pacienteEdit,
            eliminarPaciente
        }}>{children}
        </PacienteContext.Provider>
    )
}

export default PacienteContext