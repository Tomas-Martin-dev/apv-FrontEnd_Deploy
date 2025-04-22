import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../componentes/Alerta";

const AuhtContext = createContext();

const AuhtProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [cargandoAuht, setCargandoAuth] = useState(true);

    useEffect(() => {
        const autenticarUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setCargandoAuth(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {

                const { data } = await clienteAxios("veterinario/perfil", config);
                setAuth(data)
                
            } catch (error) {

                console.log(error.response.data.msg);
                setAuth({})
            }
            setCargandoAuth(false)
        }
        autenticarUser()
    }, [])

    const cerrarSession = ()=>{
        console.log("session cerrada");
        localStorage.removeItem("token");
        setAuth({});
    }

    const actulizarPerfil = async (perfilNuevo) =>{
        const {_id} = perfilNuevo;
        const token = localStorage.getItem("token");
        if (!token) {
            setCargandoAuth(false);
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };
    
        try {
           await clienteAxios.put(`/veterinario/perfil/${_id}`,{perfilNuevo},config);
            
            setAuth((prevAuth) => ({
                ...prevAuth,
                ...perfilNuevo,
            }));

            return {
                msg: "Datos Actualizados Correctamente"
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const actualizarPassword = async (newPass) =>{
        const token = localStorage.getItem("token");
        if (!token) {
            setCargandoAuth(false);
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        try {
            const url = "/veterinario/editar-password";
            const {data} = await clienteAxios.put(url, newPass, config);
            return {
                msg: data.msg,
            }                        
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <AuhtContext.Provider
            value={{
                auth,
                setAuth,
                cargandoAuht,
                cerrarSession,
                actulizarPerfil,
                actualizarPassword
            }}
        >
            {children}
        </AuhtContext.Provider>
    )
}

export {
    AuhtProvider
}

export default AuhtContext