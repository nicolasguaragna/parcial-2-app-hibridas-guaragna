import axios from 'axios';

const API_URL = "http://localhost:3000/usuarios";

// Exporta una función  llamada loginUsuario que acepta usuarioData como argumento.
export const loginUsuario = async (usuarioData) => {
  // Realiza una solicitud POST a la URL de la API con los datos del usuario para iniciar sesión.
  const response = await axios.post(`${API_URL}/login`, usuarioData);
  return response.data;
};

// Exporta una función llamada getAllUsuarios que acepta un token como argumento.
export const getAllUsuarios = async (token) => {
  // Realiza una solicitud GET a la URL de la API.
  const response = await axios.get(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};
