import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';// Importo la librería js-cookie para manejar las cookies
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../../api/usuarios';// Importo la función loginUsuario para autenticar al usuario
import '../../App.css';

const Login = () => {
  const [usuarioData, setUsuarioData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState("");
  // Extraigo la función setUsuario del contexto de autenticación
  const { setUsuario } = useContext(AuthContext);
  // Inicializo el hook de navegación
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
       // Intento autenticar al usuario con los datos proporcionados
      const res = await loginUsuario(usuarioData);
      console.log(res);
      setUsuario(res.usuario);// Guardo el usuario en el contexto
      Cookies.set('jwToken', res.jwToken, { expires: 2 });
      // Redirijo al usuario a la página principal
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || 'Error de autenticación');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={usuarioData.email} 
            onChange={(e) => setUsuarioData({ ...usuarioData, email: e.target.value })}
            required 
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={usuarioData.password} 
            onChange={(e) => setUsuarioData({ ...usuarioData, password: e.target.value })}
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export { Login };
