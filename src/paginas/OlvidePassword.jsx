import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../componentes/Alerta"
import clienteAxios from "../config/axios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({})

  const handlerSubmit = async e => {
    e.preventDefault();
    if (email === "") {
      setAlerta({ msg: "Es obligarotio ingresar el email de registro", error: true })
      return
    }

    try {
      const { data } = await clienteAxios.post("/veterinario/reset-password", { email });
      console.log(data);
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
    }

  }
  const { msg } = alerta;

  return (
    <>
      <div className="justify-self-center bg-white px-4 py-12 rounded-lg shadow-xl select-none">

        <h1 className="text-violet-950 text-5xl font-bold text-center mt-7 mb-12">
          Recupera tu
          <span className="text-gray-500"> Password </span>
        </h1>

        <div>

          {msg && <Alerta
            alerta={alerta}
          />}

          <form action="" className=" flex flex-col gap-2" onSubmit={handlerSubmit}>

            <div>
              <label className=" uppercase text-gray-600 block text-xl font-bold">
                Email
              </label>
              <input
                type="email"
                placeholder="Ingrese su Email"
                className="border w-full p-3 mt-1 bg-gray-50 rounded-xl"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <h3 className="text-slate-600 text-lg px-6">
              Te enviaremos por Email las instrucciones para recuperar tu contraseña
            </h3>

            <input
              type="submit"
              value="Enviar Correo"
              className="w-full md:max-w-80 mx-auto bg-indigo-600 text-white border rounded-xl py-3 px-13 mt-10 uppercase hover:bg-indigo-700 hover:cursor-pointer transition-colors"
            />

            <Link
              to="/registrar"
              className="my-1 block text-sm lg:text-base text-center text-gray-500 hover:text-gray-600"
            >¿No tienes Cuenta? Registrate
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default OlvidePassword
