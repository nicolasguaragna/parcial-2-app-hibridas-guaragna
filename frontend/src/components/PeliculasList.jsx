import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css'; 

const PeliculasList = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [formData, setFormData] = useState({
    pelicula: '',
    año: '',
    direccion: '',
    actores: '',
    genero: ''
  });
  const { auth } = useContext(AuthContext); 
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/peliculas', { headers: { Authorization: `Bearer ${auth}` } }) 
      .then(response => {
        setPeliculas(response.data);
      })
      .catch(error => {
        console.error("Hubo un error al obtener las películas:", error);
      });
  }, [auth]);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400){
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400){
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

  const handleCreateMovie = () => {
    setFormData({
      pelicula: '',
      año: '',
      direccion: '',
      actores: '',
      genero: ''
    });
    setShowCreateModal(true);
  };

  const handleUpdateMovie = (pelicula) => {
    setCurrentMovie(pelicula);
    setFormData({
      pelicula: pelicula.pelicula,
      año: pelicula.año,
      direccion: pelicula.direccion.join(', '),
      actores: pelicula.actores.join(', '),
      genero: pelicula.genero.join(', ')
    });
    setShowUpdateModal(true);
  };

  const handleDeleteMovie = (id) => {
    const confirmed = window.confirm("¿Estás seguro de que quieres eliminar esta película?");
    if (confirmed) {
      axios.delete(`http://localhost:3000/peliculas/${id}`, { headers: { Authorization: `Bearer ${auth}` } })
        .then(response => {
          setPeliculas(peliculas.filter(pelicula => pelicula._id !== id));
        })
        .catch(error => {
          console.error("Hubo un error al eliminar la película:", error);
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
    axios.post('http://localhost:3000/peliculas', formData, { headers: { Authorization: `Bearer ${auth}` } })
      .then(response => {
        setPeliculas([...peliculas, response.data]);
        setShowCreateModal(false);
      })
      .catch(error => {
        console.error("Hubo un error al crear la película:", error);
      });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/peliculas/${currentMovie._id}`, formData, { headers: { Authorization: `Bearer ${auth}` } })
      .then(response => {
        setPeliculas(peliculas.map(pelicula => pelicula._id === currentMovie._id ? response.data : pelicula));
        setShowUpdateModal(false);
        setCurrentMovie(null);
      })
      .catch(error => {
        console.error("Hubo un error al actualizar la película:", error);
      });
  };

  return (
    <div className="peliculas-list">
      <h1>Lista de Películas</h1>
      <button className="create-movie-button" onClick={handleCreateMovie}>Crear Nueva Película</button>
      <div className="cards-container">
        {peliculas.map(pelicula => (
          <div className="card" key={pelicula._id}>
          
            <h2 className="card-title">{pelicula.pelicula}</h2>
            <p><strong>Año:</strong> {pelicula.año}</p>
            <p><strong>Dirección:</strong> {pelicula.direccion.join(', ')}</p>
            <p><strong>Actores:</strong> {pelicula.actores.join(', ')}</p>
            <p><strong>Género:</strong> {pelicula.genero.join(', ')}</p>
            <Link className="review-link" to={`/reviews?pelicula=${pelicula._id}`}>Reviews</Link>
            <button className="update-movie-button" onClick={() => handleUpdateMovie(pelicula)}>Actualizar</button>
            <button className="delete-movie-button" onClick={() => handleDeleteMovie(pelicula._id)}>Eliminar</button>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Crear Nueva Película</h2>
            <form onSubmit={handleCreateSubmit}>
              <input
                type="text"
                name="pelicula"
                placeholder="Título de la película"
                value={formData.pelicula}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="año"
                placeholder="Año"
                value={formData.año}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="actores"
                placeholder="Actores"
                value={formData.actores}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="genero"
                placeholder="Género"
                value={formData.genero}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="update-movie-button">Crear</button>
              <button type="button" className="delete-movie-button" onClick={() => setShowCreateModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Actualizar Película</h2>
            <form onSubmit={handleUpdateSubmit}>
              <input
                type="text"
                name="pelicula"
                placeholder="Título de la película"
                value={formData.pelicula}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="año"
                placeholder="Año"
                value={formData.año}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="actores"
                placeholder="Actores"
                value={formData.actores}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="genero"
                placeholder="Género"
                value={formData.genero}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="update-movie-button">Actualizar</button>
              <button type="button" className="delete-movie-button" onClick={() => setShowUpdateModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}

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

export default PeliculasList;
