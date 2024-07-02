import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const CrearPelicula = () => {
  const [peliculaData, setPeliculaData] = useState({
    pelicula: '',
    año: '',
    direccion: '',
    actores: '',
    genero: ''
  });

  // Defino el estado local peliculaData con useState para almacenar los datos de la película.
  // Utilizo useContext para acceder al contexto de autenticación.
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Defino la función handleChange para actualizar el estado peliculaData.
    setPeliculaData({
      ...peliculaData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    // Defino la función handleSubmit para manejar el envío del formulario.
    e.preventDefault();
    axios.post('http://localhost:3000/peliculas', peliculaData, { headers: { Authorization: `Bearer ${auth}` } })
      .then(response => {
        // Si la solicitud es exitosa, imprime la respuesta y navega a /peliculas.
        console.log(response.data);
        navigate('/peliculas');
      })
      .catch(error => {
        // Si hay un error, lo imprime en la consola.
        console.error("Hubo un error al crear la película:", error);
      });
  };

  return (
    <div className="crear-pelicula">
      <h1>Crear Nueva Película</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Película</label>
          <input type="text" name="pelicula" value={peliculaData.pelicula} onChange={handleChange} required />
        </div>
        <div>
          <label>Año</label>
          <input type="number" name="año" value={peliculaData.año} onChange={handleChange} required />
        </div>
        <div>
          <label>Dirección</label>
          <input type="text" name="direccion" value={peliculaData.direccion} onChange={handleChange} required />
        </div>
        <div>
          <label>Actores</label>
          <input type="text" name="actores" value={peliculaData.actores} onChange={handleChange} required />
        </div>
        <div>
          <label>Género</label>
          <input type="text" name="genero" value={peliculaData.genero} onChange={handleChange} required />
        </div>
        <button type="submit">Crear Película</button>
      </form>
    </div>
  );
};

export default CrearPelicula;
