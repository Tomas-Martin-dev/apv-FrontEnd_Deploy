import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clientesAxios from "../config/axios"
import Alerta from "../componentes/Alerta";
import ClipLoader from "react-spinners/ClipLoader"


const ConfirmarCuenta = () => {
  const [cuentaOK, setCuentaOk] = useState(false);
  const [cuentaCargando, setCuentaCargando] = useState(true);
  const [alerta, setAlerta] = useState({});
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinario/confirmar/${id}`;
        const { data } = await clientesAxios(url);
        setCuentaOk(true);
        setAlerta({
          msg: data.msg,
          error: false
        });

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg + " - La cuenta no fue confirmada - Vuelva a intertar luego",
          error: true
        });
      }
      setCuentaCargando(false);
    }
    setTimeout(() => {
      setLoading(false)
    }, 1500);
    confirmarCuenta();
  }, [])

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
        <div className="justify-self-center bg-white px-4 py-12 rounded-lg shadow-xl select-none">

          {cuentaOK && <h1 className="text-violet-950 text-3xl font-bold text-center mt-7 mb-7 px-7">
            ¡Usuario
            <span className="text-gray-500"> Confirmado! </span>
          </h1>}

          {!cuentaOK && <h1 className="text-violet-950 text-3xl font-bold text-center mt-7 mb-7 px-7">
            Ocurrio un
            <span className="text-gray-500"> Error </span>
          </h1>}


          {!cuentaCargando && <Alerta
            alerta={alerta}
          />}

          {cuentaOK && <Link
            to="/"
            className="my-3 block text-center text-gray-500"
          >Iniciar Sesion
          </Link>}

        </div>
      )}
    </>
  )
}

export default ConfirmarCuenta