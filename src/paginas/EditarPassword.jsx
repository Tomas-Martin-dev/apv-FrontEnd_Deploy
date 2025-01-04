import { useState } from "react"
import AdminNav from "../componentes/AdminNav"
import Alerta from "../componentes/Alerta"
import useAuth from "../hooks/useAuth";

const EditarPassword = () => {
    const [alerta, setAlerta] = useState({}); 
    const [password, setPassword] = useState({
        pwd_actual: "",
        pwd_nuevo: ""
    }); 

    const {actualizarPassword} = useAuth();

    const handleSubmit = async e => {
        e.preventDefault();

        if (Object.values(password).some(campos => campos === "")) {
            setAlerta({ 
                msg: "Campos Incompletos", 
                error: true 
                });                
            setTimeout(() => {
                setAlerta({})
            }, 3000);
          return
        }

        if (password.pwd_nuevo.length < 6) {
            setAlerta({
                msg: "Minimo de 6 caracteres la contraseña",
                error: true
            })
            setTimeout(() => {
                setAlerta({});
            }, 3000);
            return
        }
        
        const respuesta = await actualizarPassword(password);
        console.log(respuesta);
        
        setAlerta(respuesta);
    }

    const {msg} = alerta;
    return (
        <>
            <AdminNav/>

            <h2 className=" font-bold text-3xl text-center mt-10">Editar Contraseña</h2>
            <p className=" text-xl mt-5 mb-10 text-center">Modifica tu {""} 
                <span className="text-indigo-600 font-bold">Contraseña Aqui</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-5">

                    <div className=" my-4">
                        <label className="uppercase font-bold text-gray-600">Contraseña Actual</label>
                        <input
                            type="password"
                            name="pwd_actual"
                            placeholder="Escribe tu contraseña"
                            onChange={e => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
                            })}
                            className=" rounded-lg border bg-gray-50 w-full p-2 mt-2" />
                    </div>

                    <div className=" my-4">
                        <label className="uppercase font-bold text-gray-600">Nueva Contraseña</label>
                        <input
                            type="password"
                            name="pwd_nuevo"
                            placeholder="Escribe tu nueva contraseña"
                            onChange={e => setPassword({
                                ...password,
                                [e.target.name] : e.target.value
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

export default EditarPassword