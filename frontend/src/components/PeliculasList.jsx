import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../App.css'; 

const PeliculasList = () => {

   // Declaro el estado peliculas y su función de actualización setPeliculas, inicializado como un array vacío.
  const [peliculas, setPeliculas] = useState([]);
  // Declaro el estado showCreateModal y su función de actualización setShowCreateModal, inicializado en false.
  const [showCreateModal, setShowCreateModal] = useState(false);
  // Declaro el estado showUpdateModal y su función de actualización setShowUpdateModal, inicializado en false.
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [formData, setFormData] = useState({
    pelicula: '',
    año: '',
    direccion: '',
    actores: '',
    genero: ''
  });
  // Utilizo useContext para obtener el token de autenticación del contexto AuthContext.
  const { auth } = useContext(AuthContext); 
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    // Hago una solicitud GET a la API para obtener la lista de películas, incluyendo el token en los encabezados.
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
    // Inicializo el formulario con valores vacíos y muestro el modal para crear una nueva película.
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
    // Configuro los datos de la película actual en el formulario y muestro el modal para actualizar la película.
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
        // Actualizo el estado formData con los valores ingresados en el formulario.
    });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/peliculas', formData, { headers: { Authorization: `Bearer ${auth}` } })
      .then(response => {
        setPeliculas([...peliculas, response.data]);
        setShowCreateModal(false);
        // Si la solicitud es exitosa, agrego la nueva película al estado peliculas y oculto el modal.
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
            <Link className="card-link" to={`/peliculas/${pelicula._id}`}></Link>
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
