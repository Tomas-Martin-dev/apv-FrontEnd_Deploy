import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthLayout from "./layout/AuhtLayout";
import RutaAdmin from "./layout/RutaAdmin";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";
import AdministrarPacientes from "./paginas/AdministrarPacientes";
import EditarPerfil from "./paginas/EditarPerfil";
import EditarPassword from "./paginas/EditarPassword";

import { AuhtProvider } from "./context/AuthProvider";
import { PacienteProvider } from "./context/PacienteProvider";


function App() {

  return (
    <BrowserRouter>
      <AuhtProvider>
        <PacienteProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={< Registrar />} />
              <Route path="confirmar-cuenta/:id" element={< ConfirmarCuenta />} />
              <Route path="recuperar-password" element={< OlvidePassword />} />
              <Route path="recuperar-password/:token" element={< NuevoPassword />} />
            </Route>

            <Route path="/admin" element={<RutaAdmin />} >
              <Route index element={<AdministrarPacientes />} />
              <Route path="perfil" element={<EditarPerfil />} />
              <Route path="editar-password" element={<EditarPassword />} />
            </Route>
          </Routes>
        </PacienteProvider>
      </AuhtProvider>
    </BrowserRouter>
  )
}

export default App
