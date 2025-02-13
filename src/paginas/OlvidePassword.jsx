import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../componentes/Alerta"
import clienteAxios from "../config/axios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({})
  const [enviado, setEnviado] = useState(false)

  const handlerSubmit = async e => {
    console.log(enviado);
    
    e.preventDefault();
    if (email === "") {
      setAlerta({ msg: "Es obligarotio ingresar el email de registro", error: true })
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return
    }

    try {
      const { data } = await clienteAxios.post("/veterinario/reset-password", { email });
      
      setAlerta({
        msg: data.msg,
        error: false
      });
    } catch (error) {
      console.log(error);
      
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })

      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return
    }
    setEnviado(true)
  }
  const { msg } = alerta;

  return (
    <>
      <div className="justify-self-center bg-white px-4 py-12 rounded-lg shadow-xl select-none">

        <h1 className="text-violet-950 text-3xl md:text-5xl font-bold text-center mt-2 mb-12">
          Recupera tu
          <span className="text-gray-500"> Password </span>
        </h1>

        <div>

          {msg && <Alerta
            alerta={alerta}
            className= "mb-6"
          />}

          <form action="" className=" flex flex-col gap-2" onSubmit={handlerSubmit}>

            <div>
              <label className=" uppercase text-gray-600 block font-bold md:text-xl">
                Email
              </label>
              <input
                type="email"
                placeholder="Ingrese su Email"
                disabled={enviado}
                className="border w-full p-3 mt-1 bg-gray-50 rounded-xl text-sm md:text-base disabled:bg-gray-200 disabled:cursor-not-allowed"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <h3 className="text-slate-600 md:text-lg px-1 md:px-6 text-center">
              Te enviaremos por Email las instrucciones para recuperar tu contraseña
            </h3>

            <input
              type="submit"
              value="Enviar Correo"
              disabled={enviado}
              className="w-full md:max-w-80 mx-auto bg-indigo-600 text-white border rounded-xl py-2 mt-10 uppercase text-sm md:text-lg hover:bg-indigo-700 hover:cursor-pointer transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed"
            />

            <Link
              to="/registrar"
              className="my-1 block text-sm lg:text-base text-center text-gray-500 hover:text-gray-600"
            >¿No tienes Cuenta? Registrate
            </Link>

            <Link
              to="/"
              className="my-1 block text-sm lg:text-base text-center text-gray-500 hover:text-gray-600"
            >Iniciar Session
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default OlvidePassword
