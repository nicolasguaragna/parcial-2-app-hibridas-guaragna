import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css';

const CrearResena = () => {
  const [reviewData, setReviewData] = useState({
    pelicula: '',
    nombre: '',
    comentario: '',
    calificacion: 1,
  });
  // Defino el estado local reviewData con useState para almacenar los datos de la reseña.
  // Utilizo useContext para acceder al contexto de autenticación.
  const { auth } = useContext(AuthContext);

   // Defino el estado showScroll para controlar la visibilidad del botón de desplazamiento.
  const [showScroll, setShowScroll] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
     // Defino la función handleSubmit para manejar el envío del formulario.
    e.preventDefault();
    axios.post('http://localhost:3000/reviews', reviewData, { headers: { Authorization: `Bearer ${auth}` } })
      .then(response => {
        // Si la solicitud es exitosa, imprimo la respuesta y navego a /reviews.
        console.log(response.data);
        navigate('/reviews');
      })
      .catch(error => {
        console.error("Hubo un error al crear la reseña:", error);
      });
  };

  const checkScrollTop = () => {
      // Defino la función checkScrollTop para controlar la visibilidad del botón de desplazamiento.
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    // Defino la función scrollTop para desplazar la página hacia arriba suavemente.
    window.scrollTo({top: 0, behavior: 'smooth'});
  };
  const handleCreateReview = () => {
     // Defino la función handleCreateReview para navegar a la página de creación de reseñas.
    navigate('/crear-resena');
  };

  return (
    <div className="crear-resena">
      <h1>Crear Nueva Reseña</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pelicula</label>
          <input 
            type="text" 
            value={reviewData.pelicula} 
            onChange={(e) => setReviewData({...reviewData, pelicula: e.target.value})} 
            required 
          />
        </div>
        <div>
          <label>Nombre</label>
          <input 
            type="text" 
            value={reviewData.nombre} 
            onChange={(e) => setReviewData({...reviewData, nombre: e.target.value})} 
            required 
          />
        </div>
        <div>
          <label>Comentario</label>
          <textarea 
            value={reviewData.comentario} 
            onChange={(e) => setReviewData({...reviewData, comentario: e.target.value})} 
            required 
          />
        </div>
        <div>
          <label>Calificación</label>
          <input 
            type="number" 
            min="1" 
            max="5" 
            value={reviewData.calificacion} 
            onChange={(e) => setReviewData({...reviewData, calificacion: e.target.value})} 
            required 
          />
        </div>
        <button type="submit">Crear Reseña</button>
      </form>


    <button 
            className="scrollTop" 
            onClick={scrollTop} 
            style={{display: showScroll ? 'flex' : 'none'}}
            >
            ↑
    </button>

    </div>
  );
};

export default CrearResena;
