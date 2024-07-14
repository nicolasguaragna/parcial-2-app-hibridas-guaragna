import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import '../App.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [formData, setFormData] = useState({
    pelicula: '',
    nombre: '',
    comentario: '',
    calificacion: ''
  });
  const { auth } = useContext(AuthContext);
  const [showScroll, setShowScroll] = useState(false);
  const location = useLocation();
  const [pelicula, setPelicula] = useState('');

  // Extracting the movie ID from the URL
  const params = new URLSearchParams(location.search);
  const peliculaId = params.get('pelicula');

  useEffect(() => {
    // Fetch the movie details
    axios.get(`http://localhost:3000/peliculas/${peliculaId}`, { headers: { 'Authorization': `Bearer ${auth}` } })
      .then(response => {
        setPelicula(response.data.pelicula);
      })
      .catch(error => {
        console.error("Hubo un error al obtener los detalles de la película:", error);
      });

    // Only fetch reviews for the specified movie
    axios.get(`http://localhost:3000/reviews?pelicula=${peliculaId}`, { headers: { 'Authorization': `Bearer ${auth}` } })
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las reseñas:", error);
      });

    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [auth, peliculaId]);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateReview = () => {
    setFormData({
      pelicula: peliculaId,  // Set the movie ID in the form data
      nombre: '',
      comentario: '',
      calificacion: ''
    });
    setShowCreateModal(true);
  };

  const handleUpdateReview = (review) => {
    setCurrentReview(review);
    setFormData({
      pelicula: review.pelicula,
      nombre: review.nombre,
      comentario: review.comentario,
      calificacion: review.calificacion
    });
    setShowUpdateModal(true);
  };

  const handleDeleteReview = (id) => {
    const confirmed = window.confirm("¿Estás seguro de que quieres eliminar esta reseña?");
    if (confirmed) {
      axios.delete(`http://localhost:3000/reviews/${id}`, { headers: { 'Authorization': `Bearer ${auth}` } })
        .then(response => {
          setReviews(reviews.filter(review => review._id !== id));
        })
        .catch(error => {
          console.error("Hubo un error al eliminar la reseña:", error);
        });
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/reviews', formData, { headers: { 'Authorization': `Bearer ${auth}` } })
      .then(response => {
        setReviews([...reviews, response.data]);
        setShowCreateModal(false);
      })
      .catch(error => {
        console.error("Hubo un error al crear la reseña:", error);
      });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/reviews/${currentReview._id}`, formData, { headers: { 'Authorization': `Bearer ${auth}` } })
      .then(response => {
        setReviews(reviews.map(review => review._id === currentReview._id ? response.data : review));
        setShowUpdateModal(false);
        setCurrentReview(null);
      })
      .catch(error => {
        console.error("Hubo un error al actualizar la reseña:", error);
      });
  };

  return (
    <div>
      <h1>Lista de Reseñas de {pelicula}</h1>
      <button className="create-review-button" onClick={handleCreateReview}>Crear Nueva Reseña</button>
      <div className="cards-container">
        {reviews.map(review => (
          <div className="card" key={review._id}>
            <h2 className="card-title">{pelicula}</h2>
            <p><strong>Usuario:</strong> {review.nombre}</p>
            <p><strong>Comentario:</strong> {review.comentario}</p>
            <p><strong>Calificación:</strong> {review.calificacion}</p>
            <p><strong>Fecha:</strong> {new Date(review.fecha).toLocaleDateString()}</p>
            <button className="review-button update-button" onClick={() => handleUpdateReview(review)}>Actualizar</button>
            <button className="review-button delete-button" onClick={() => handleDeleteReview(review._id)}>Eliminar</button>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Crear Nueva Reseña</h2>
            <form onSubmit={handleCreateSubmit}>
              <input
                type="text"
                name="pelicula"
                placeholder="Película"
                value={formData.pelicula}
                onChange={handleInputChange}
                required
                readOnly
              />
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="comentario"
                placeholder="Comentario"
                value={formData.comentario}
                onChange={handleInputChange}
                required
              ></textarea>
              <input
                type="number"
                name="calificacion"
                placeholder="Calificación"
                value={formData.calificacion}
                onChange={handleInputChange}
                min="1"
                max="5"
                required
              />
              <button type="submit" className="update-button">Crear</button>
              <button type="button" className="delete-button" onClick={() => setShowCreateModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Actualizar Reseña</h2>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                name="pelicula"
                placeholder="Película"
                value={formData.pelicula}
                onChange={handleInputChange}
                required
                readOnly
              />
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="comentario"
                placeholder="Comentario"
                value={formData.comentario}
                onChange={handleInputChange}
                required
              ></textarea>
              <input
                type="number"
                name="calificacion"
                placeholder="Calificación"
                value={formData.calificacion}
                onChange={handleInputChange}
                min="1"
                max="5"
                required
              />
              <button type="submit" className="update-button">Actualizar</button>
              <button type="button" className="delete-button" onClick={() => setShowUpdateModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}

      <button
        className="scrollTop"
        onClick={scrollTop}
        style={{ display: showScroll ? 'flex' : 'none' }}
      >
        ↑
      </button>
    </div>
  );
};

export default Reviews;
