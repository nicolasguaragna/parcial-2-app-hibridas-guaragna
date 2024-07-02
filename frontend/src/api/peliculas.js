import axios from 'axios';

// Define la URL base para las solicitudes a la API de películas.
const API_URL = "http://localhost:3000/peliculas"; 

// Exporta una función llamada getAllPeliculas que acepta un token como argumento.
export const getAllPeliculas = async (token) => {
  // Realiza una solicitud GET a la URL de la API.
  const response = await axios.get(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};
