import { Link, useNavigation } from "react-router-dom";
import clienteAxios from "../config/axios";
import { useState } from "react";
import Alerta from "../componentes/Alerta";


const Registrar = () => {
  const [ nombre, setNombre] = useState("");
  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const [ repetirPassword, setRepetirPassword] = useState("");
  const [ alerta, setAlerta] = useState({})
  
  const handleSubmit = async e =>{
    e.preventDefault();
    
    if ([nombre,email,password,repetirPassword].includes("")) {
      setAlerta({msg: "Hay campos vacios en el Formulario!!!", error: true});
      return
    }if (password !== repetirPassword) {
      setAlerta({msg: "Password incorrectos", error: true});
      return
    }if (password.length < 6) {
      setAlerta({msg: "El password debe tener 6 caracteres de minimo", error: true});
      return
    }
    setAlerta({}); // alerta vacia porque pasaron las validaciones

    // Crear User
    try {
      const repuesta = await clienteAxios.post(`/veterinario`, {nombre, email, password});
      setAlerta({
        msg: "Usuario Creado, Revisa tu Email para confirmar tu cuenta",
        error: false
      });
      setTimeout(() => {
        window.location.reload()
      }, 3000);
    } catch (error) {
      setAlerta({
        msg : error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } =  alerta;

  return (
    <>

        <div>
          <h1 className="text-violet-950 text-5xl font-bold md:text-left text-center mt-7">
          Registrate y Administra tus
            <span className="text-gray-500"> Pacientes </span>
          de Forma
            <span className="text-gray-500"> Rapida </span>
          y
            <span className="text-gray-500"> Segura </span>
          </h1>
        </div>

        <div className="bg-white px-4 py-10 rounded-lg shadow-xl">
          { msg && <Alerta
            alerta={alerta}
          /> } 

          <form 
            action="" 
            className=" flex flex-col gap-5 mt-7"
            onSubmit={handleSubmit}
            >
            
            <div>
              <label className=" uppercase text-gray-600 block text-xl font-bold">
                Nombre
              </label>
              <input 
              type="text" 
              placeholder="Ingrese su Nombre"
              className="border w-full p-3 mt-1 bg-gray-50 rounded-xl" 
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              />
            </div>
            <div>
              <label className=" uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input 
              type="text" 
              placeholder="Ingrese su Email"
              className="border w-full p-3 mt-1 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)} 
              />
            </div>
            <div>
              <label className=" uppercase text-gray-600 block text-xl font-bold">
                Contraseña
              </label>
              <input 
              type="password" 
              placeholder="Ingrese su Contraseña"
              className="border w-full p-3 mt-1 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)} 
              />
            </div>
            <div>
              <label className=" uppercase text-gray-600 block text-xl font-bold">
                Repite la Contraseña
              </label>
              <input 
              type="password" 
              placeholder="Vuelva a Escribir la Contraseña"
              className="border w-full p-3 mt-1 bg-gray-50 rounded-xl" 
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
              />
            </div>
            <input 
              type="submit" 
              value="Registrarte"
              className="w-full md:max-w-72 mx-auto bg-indigo-600 text-white border rounded-xl py-2 px-12 uppercase hover:bg-indigo-700 hover:cursor-pointer" 
            />
          </form>

          <nav className="mt-2 lg:flex lg:justify-center">
            <Link 
              to="/"
              className="my-3 block text-center text-gray-500"
              >Ya Tengo una Cuenta
            </Link>
          </nav>
        </div>

    </>
  )
}

export default Registrar