import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Alerta from "../componentes/Alerta"
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [alerta, setAlerta] = useState("");
  const { auth, setAuth } = useAuth();
  const { cerrarSession } = useAuth()
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  const navigation = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault();

    if ([contraseña, email].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return
    }
    if (contraseña.length < 6) {
      setAlerta({ msg: "La contraseña debe tener 6 caracteres de minimo", error: true });
      return
    }
    setAlerta({})

    try {
      const { data } = await clienteAxios.post("/veterinario/login", { email, contraseña })
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigation("/admin");
    }
    catch (error) {
      console.log(error);
      setAlerta({ msg: error.response.data.msg, error: true })
    }
  }

  // funcion que verifica si quedo un token de veterinario alamacenado en storage, lo elimina ya que estamos en login;
  useEffect(() => {
    const verificarTokenExistente = () => {
      const token = localStorage.getItem('token');
      if (token) {
        localStorage.removeItem('token');
        return
      } 
    };
    verificarTokenExistente();
  }, [])

  const { msg } = alerta;
  
  return (
    <>
      <div className="my-16 md:flex overflow-hidden justify-center items-center max-h-full hidden ">
        <img
          src="../public/shield-cat-solid.svg"
          alt="logo"
          className="max-h-[600px] 3xl:max-h-[800px]"
        />
      </div>

      <div className="my-16 bg-white flex flex-col items-center rounded-lg shadow-xl
        max-h-[600px] h-full pb-24 pt-24 px-3
        md:max-h-[515px] md:pb-10 md:pt-10 
        lg:max-h-[515px] lg:my-10
        xl:max-h-[640px] xl:pb-20 xl:pt-16
        2xl:max-h-[700px] 2xl:pb-28 2xl:pt-24 2xl:my-4
        3xl:max-h-[800px] 3xl:pb-48 3xl:pt-32 3xl:my-4">

        <div className=" flex flex-col items-center mb-auto w-full">

          <h1 className="text-indigo-600 text-3xl md:text-3xl lg:text-4xl font-bold text-center lg:max-w-xl lg:min-w-[385px] w-full">
            Inicia Sesión
          </h1>

          <h3 className="text-gray-600 text-xl md:text-2xl lg:text-3xl font-normal text-center md:mt-2 lg:mt-3 lg:max-w-xl lg:min-w-[385px] w-full">Administra tus Pacientes</h3>

        </div>

        <div className=" w-full lg:max-w-xl ">

          <form action="" className=" flex flex-col gap-6 px-5 " onSubmit={handleSubmit}>

            {msg && <Alerta
              alerta={alerta}
            />}

            <div>
              <label className=" uppercase text-gray-600 block md:text-base lg:text-xl font-bold">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Ingrese su Email"
                className="border w-full p-2 lg:p-3 mt-1 bg-gray-50 rounded-xl md:placeholder:text-sm lg:placeholder:text-base"
              />
            </div>

            <div>
              <label className=" uppercase text-gray-600 block md:text-base lg:text-xl font-bold">
                Contraseña
              </label>
              <input
                type="password"
                value={contraseña}
                onChange={e => setContraseña(e.target.value)}
                placeholder="Ingrese su Contraseña"
                className="border w-full p-2 lg:p-3 mt-1 bg-gray-50 rounded-xl md:placeholder:text-sm lg:placeholder:text-base"
              />
            </div>

            <input
              type="submit"
              value="Ingresar"
              className="w-full mx-auto bg-indigo-600 text-white  md:text-sm lg:text-base border rounded-xl py-2 md:px-10 lg:px-12 uppercase hover:bg-indigo-700 hover:cursor-pointer transition-colors"
            />

          </form>

          <nav className="lg:flex lg:justify-between px-5 mt-5">
            <Link
              to="/registrar"
              className="my-1 block text-sm lg:text-base text-center text-gray-500 hover:text-gray-600"
            >¿No tienes Cuenta? Registrate
            </Link>
            <Link
              to="/recuperar-password"
              className="my-1 text-sm lg:text-base block text-center text-gray-500 hover:text-gray-600"
            >¿Olvidaste tu Contraseña?
            </Link>
          </nav>

        </div>

      </div>
    </>
  )
}

export default Login