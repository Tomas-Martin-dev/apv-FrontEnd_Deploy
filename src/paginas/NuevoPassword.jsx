import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import Alerta from "../componentes/Alerta";
import clienteAxios from '../config/axios';
import ClipLoader from "react-spinners/ClipLoader"

const NuevoPassword = () => {
  const [contraseña, setContraseña] = useState("");
  const [repetirContraseña, setRepetirContraseña] = useState("");
  const [alerta, setAlerta] = useState("");
  const [tokenOk, setTokenOk] = useState(false);
  const [contraseñaUpdate, setContraseñaUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

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
    setTimeout(() => {
      setLoading(false)
    }, 1500);
  }, [])


  const handleSubmit = async e => {
    e.preventDefault();
    if (contraseña !== repetirContraseña) {
      setAlerta({ msg: "Contraseñas incorrectas", error: true });
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return
    }
    if ([contraseña, repetirContraseña].includes("")) {
      setAlerta({ msg: "Formularios Vacios", error: true });
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return
    }
    if (contraseña.length < 6) {
      setAlerta({ msg: "La contraseña debe tener 6 caracteres de minimo", error: true });
      setTimeout(() => {
        setAlerta({})
      }, 3000);
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
      {loading &&
        <div className=' w-full flex justify-center'>
          <ClipLoader
            color="#000"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier={.9}
          />
        </div>
      }

      {!loading && (
        tokenOk ? (
          <div className="justify-self-center bg-white px-4 py-12 rounded-lg shadow-xl select-none">
            <h1 className="text-violet-950 text-3xl md:text-5xl font-bold text-center mt-7 mb-7 md:mb-11 px-7">
              ¡Ingrese su Nueva
              <span className="text-gray-500"> Contraseña! </span>
            </h1>

            {msg && <Alerta alerta={alerta} className="mb-6" />}

            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="uppercase text-gray-600 block md:text-xl font-bold">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Ingrese su nuevo Password"
                  className="border w-full p-3 mt-1 bg-gray-50 rounded-xl text-sm md:text-base"
                  value={contraseña}
                  onChange={e => setContraseña(e.target.value)}
                />
              </div>

              <div>
                <label className="uppercase text-gray-600 block md:text-xl font-bold">
                  Repetir Password
                </label>
                <input
                  type="password"
                  placeholder="Repite el Password"
                  className="border w-full p-3 mt-1 bg-gray-50 rounded-xl text-sm md:text-base"
                  value={repetirContraseña}
                  onChange={e => setRepetirContraseña(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Registrarte"
                className="w-full md:max-w-80 mx-auto bg-indigo-600 text-white border rounded-xl py-2 uppercase text-sm md:text-lg hover:bg-indigo-700 hover:cursor-pointer transition-colors"
              />
            </form>
          </div>
        ) : (
          <div className="justify-self-center bg-white px-4 py-12 min-h-min rounded-lg shadow-xl select-none flex flex-col justify-center">
            <h1 className="text-violet-950 text-3xl font-bold text-center mt-7 mb-7 px-7">
              Token no
              <span className="text-gray-500"> Válido </span>
            </h1>
            <p className="font-medium text-center text-red-900 text-md">
              Ocurrió un error al intentar validar su usuario, vuelva a intentarlo más tarde.
            </p>
            <Link
              to="/recuperar-password"
              className="my-3 block text-center text-gray-500 hover:text-gray-600"
            >
              Restablecer Contraseña
            </Link>
          </div>
        )
      )}
    </>

  )
}

export default NuevoPassword