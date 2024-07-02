import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';// Importo useNavigate para redirigir al usuario
import '../../App.css'; 

const Register = () => {
  // Defino el estado inicial para los datos del usuario
  const [usuarioData, setUsuarioData] = useState({
    nombre: '',
    email: '',
    password: ''
  });
  // Defino el estado para manejar errores y mensajes de éxito
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    console.log("Datos enviados:", usuarioData);
    // Realizo una petición POST para registrar al usuario
    axios.post("http://localhost:3000/usuarios/register", usuarioData)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Usuario registrado exitosamente. Redirigiendo al login...");
        setTimeout(() => {
          navigate('/login');// Redirijo al usuario al login después de 3 segundos
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        const message = error.response?.data?.message || 'Error al registrar';
        setError(message);
      });
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Nombre</label>
          <input 
            type="text" 
            value={usuarioData.nombre} 
            onChange={(e) => setUsuarioData({ ...usuarioData, nombre: e.target.value })}
            required
          />
        </div>
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
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export { Register };
