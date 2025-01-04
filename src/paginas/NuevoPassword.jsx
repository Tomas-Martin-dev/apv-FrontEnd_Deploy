import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import Alerta from "../componentes/Alerta";
import clienteAxios from '../config/axios';

const NuevoPassword = () => {
  const [contraseña, setContraseña] = useState("");
  const [repetirContraseña, setRepetirContraseña] = useState("");
  const [alerta, setAlerta] = useState("");
  const [tokenOk, setTokenOk] = useState(false);
  const [contraseñaUpdate, setContraseñaUpdate] = useState(false);

  const navigation = useNavigate()

  // Validar token
  const { token } = useParams();
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinario/reset-password/${token}`);
        setTokenOk(true)
      } catch (error) {
        console.log(error);
        setTokenOk(false)
      }
    }
    comprobarToken()
  }, [])


  const handleSubmit = async e => {
    e.preventDefault();
    if (contraseña !== repetirContraseña) {
      setAlerta({ msg: "Contraseñas incorrectas", error: true });
      return
    }
    if ([contraseña, repetirContraseña].includes("")) {
      setAlerta({ msg: "Formularios Vacios", error: true });
      return
    }
    if (contraseña.length < 6) {
      setAlerta({ msg: "La contraseña debe tener 6 caracteres de minimo", error: true });
      return
    }

    try {
      
      const url = `/veterinario/reset-password/${token}`
      await clienteAxios.post(url, { contraseña });
      setContraseñaUpdate(true);
      
      setAlerta({ msg: "Contraseña actuliazada", error: false });
      setTimeout(() => {
        navigation("/");
      }, 2000);
    } catch (error) {
      console.log(error.response.data.msg);
      setContraseñaUpdate(false);
    }
  }
  const { msg } = alerta;

  return (
    <>
      {tokenOk && <div className="justify-self-center bg-white px-4 py-12 rounded-lg shadow-xl select-none">

        <h1 className="text-violet-950 text-3xl font-bold text-center mt-7 mb-7 px-7">
          ¡Ingrese su Nueva
          <span className="text-gray-500"> Contraseña! </span>
        </h1>

        {msg && <Alerta
          alerta={alerta}
        />}

        <form
          action=""
          className=" flex flex-col gap-5 mt-7"
          onSubmit={handleSubmit}
        >

          <div>
            <label className=" uppercase text-gray-600 block text-lg font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Ingrese su nuevo Password"
              className="border w-full p-3 mt-1 bg-gray-50 rounded-xl"
              value={contraseña}
              onChange={e => setContraseña(e.target.value)}
            />
          </div>

          <div>
            <label className=" uppercase text-gray-600 block text-lg font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Repite el Password"
              className="border w-full p-3 mt-1 bg-gray-50 rounded-xl"
              value={repetirContraseña}
              onChange={e => setRepetirContraseña(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Registrarte"
            className="w-full md:max-w-72 mx-auto bg-indigo-600 text-white border rounded-xl py-2 px-12 uppercase hover:bg-indigo-700 hover:cursor-pointer transition-colors"
          />

        </form>

      </div>}

      {!tokenOk && <div className="justify-self-center bg-white px-4 py-12 min-h-min rounded-lg shadow-xl select-none flex flex-col justify-center">
        <h1 className="text-violet-950 text-3xl font-bold text-center mt-7 mb-7 px-7">
          Token no
          <span className="text-gray-500"> Valido </span>
        </h1>
        <p
          className=' font-medium text-center text-red-900 text-md'
        >Ocurrio un error al intentar validar su usuario, vuelva a intentarlo mas tarde</p>
        <Link
          to="/recuperar-password"
          className="my-3 block text-center text-gray-500 hover:text-gray-600"
        >Restablecer Contraseña
        </Link>
      </div>}
    </>

  )
}

export default NuevoPassword