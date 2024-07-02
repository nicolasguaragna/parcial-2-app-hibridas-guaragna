import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PeliculasDetail = () => {
  // Utilizo useParams para obtener el parámetro de la ruta (id) que corresponde al identificador de la película.
  const { id } = useParams();
  // Declaro el estado pelicula y su función de actualización setPelicula, inicializado en null.
  const [pelicula, setPelicula] = useState(null);
  const { auth } = useContext(AuthContext); // Obtener el token de autenticación

   // Utilizo useEffect para ejecutar el código cuando el componente se monta o cuando cambian las dependencias (id y auth).
  useEffect(() => {
    axios.get(`http://localhost:3000/peliculas/${id}`, { headers: { Authorization: `Bearer ${auth}` } }) // Agregar el token en los encabezados
      .then(response => {
        setPelicula(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los detalles de la película:", error);
      });
  }, [id, auth]); // Defino las dependencias del useEffect, que son el id de la película y el token de autenticación.

  if (!pelicula) {
    // Si los datos de la película aún no están disponibles, muestro un mensaje de carga.
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>{pelicula.pelicula}</h2>
      <p>Año: {pelicula.año}</p>
      <p>Dirección: {pelicula.direccion}</p>
      <p>Actores: {pelicula.actores}</p>
      <p>Género: {pelicula.genero}</p>
    </div>
  );
}

export default PeliculasDetail;
