import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import HeaderPerfil from '../componentes/Header-perfil';
import Footer from '../componentes/Footer';

function RutaAdmin() {
  const {auth, cargandoAuht} = useAuth();
  if (cargandoAuht) return "cargando..."
  
  return (
    <>
      <HeaderPerfil />
      {auth?._id ? (
        <main className='container mx-auto mt-10'>
          <Outlet />
        </main>
      ) : <Navigate to={"/"} />}
      <Footer/>
    </>
  )
}

export default RutaAdmin