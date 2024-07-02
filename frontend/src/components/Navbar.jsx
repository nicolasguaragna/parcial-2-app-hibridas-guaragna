import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';

const Navbar = () => {
   // Utilizo useContext para acceder al contexto de autenticación y obtener los datos del usuario y la función de logout.
  const { usuario, logoutUsuario } = useContext(AuthContext);

  return (
    <header className="navbar">
      <h2>{usuario?.nombre ? "Usuario Logueado: " + usuario.nombre : "Usuario desconectado"}</h2>
        <ul>
          <li><NavLink to="/" exact="true">Home</NavLink></li>
          {usuario && (
            <>
              <li><NavLink to="/peliculas">Películas</NavLink></li>
              <li><NavLink to="/reviews">Reviews</NavLink></li>
            </>
          )}
          <li>
            {usuario ? (
              <NavLink to="/login" onClick={() => logoutUsuario()}>Logout</NavLink>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </li>
        </ul>
    </header>
  );
};

export default Navbar;
