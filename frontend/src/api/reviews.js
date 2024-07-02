import axios from 'axios';

const API_URL = "http://localhost:3000/reviews";

// Exporta una función llamada createReview que acepta reviewData y un token como argumentos.
export const createReview = async (reviewData, token) => {
  const response = await axios.post(API_URL, reviewData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

// Exporta una función llamada getAllReviews que acepta un token como argumento.
export const getAllReviews = async (token) => {
  // Realiza una solicitud GET a la URL de la API.
  const response = await axios.get(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};
