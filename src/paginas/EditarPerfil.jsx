import AdminNav from "../componentes/AdminNav"
import useAuth from "../hooks/useAuth"
import { useEffect, useState } from "react";
import Alerta from "../componentes/Alerta";

const EditarPerfil = () => {
    const { auth, actulizarPerfil } = useAuth();
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})

    useEffect(() => {        
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault();

        const { nombre, email } = perfil;
        if ([nombre, email].includes("")) {
            setAlerta({msg: "Email y Nombre son Obligatorios", error: true})
            setTimeout(() => {
                setAlerta({})
            }, 3000);
            return
        }
        const resultado = await actulizarPerfil(perfil);
        setAlerta(resultado)
        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

    const { msg } = alerta;
    return (
        <>
            <AdminNav />
            <h2 className=" font-bold text-3xl text-center mt-10">Editar Perfil</h2>
            <p className=" text-xl mt-5 mb-10 text-center">Modifica tu {""}
                <span className="text-indigo-600 font-bold">Informacion</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-5">
                    <div className=" my-4">
                        <label className="uppercase font-bold text-gray-600">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={perfil.nombre || ""}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name]: e.target.value
                            })}
                            className=" rounded-lg border bg-gray-50 w-full p-2 mt-2" />
                    </div>

                    <div className=" my-4">
                        <label className="uppercase font-bold text-gray-600">Sitio Web</label>
                        <input
                            type="text"
                            name="web"
                            value={perfil.web || ""}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name]: e.target.value
                            })}
                            className=" rounded-lg border bg-gray-50 w-full p-2 mt-2" />
                    </div>

                    <div className=" my-4">
                        <label className="uppercase font-bold text-gray-600">Telefono</label>
                        <input
                            type="number"
                            name="telefono"
                            value={perfil.telefono || ""}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name]: e.target.value
                            })}
                            className=" rounded-lg border bg-gray-50 w-full p-2 mt-2" />
                    </div>

                    <div className=" my-4">
                        <label className="uppercase font-bold text-gray-600">email</label>
                        <input
                            type="email"
                            name="email"
                            value={perfil.email || ""}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name]: e.target.value
                            })}
                            className=" rounded-lg border bg-gray-50 w-full p-2 mt-2" />
                    </div>

                    <input
                        type="submit"
                        value="confrimar"
                        onClick={handleSubmit}
                        className="w-full mx-auto my-5 bg-indigo-600 text-white  md:text-sm lg:text-base border rounded-xl py-2 md:px-10 lg:px-12 uppercase hover:bg-indigo-700 hover:cursor-pointer transition-colors"
                    />

                    {msg && <Alerta
                        alerta={alerta}
                    />}

                </div>
            </div>
        </>
    )
}

export default EditarPerfil