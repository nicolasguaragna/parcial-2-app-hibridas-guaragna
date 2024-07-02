import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';// Importo Link para la navegación entre rutas
import '../../App.css';

const Home = () => {
    // Estado para almacenar la lista de películas
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(false);
      // Extraigo la función logoutUsuario y el token auth del contexto de autenticación
    const { logoutUsuario, auth } = useContext(AuthContext);

    useEffect(() => {
        setLoading(true);
        // Realizo una petición GET para obtener las películas
        axios.get("http://localhost:3000/peliculas", { headers: { 'Authorization': `Bearer ${auth}` } })
            .then((response) => {
                console.log(response.data);
                // Uso setTimeout para simular un tiempo de carga
                setTimeout(() => {
                    setLoading(false);
                    setPeliculas(response.data);
                }, 2000);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                // Si el token ha expirado, muestro una alerta y deslogueo al usuario
                if (error.response?.data?.error?.message === "jwt expired") {
                    alert("Token expired");
                    logoutUsuario();
                }
            });
    }, [auth, logoutUsuario]);


    return (
        <div>
            <h1>Bienvenido a la API de películas</h1>
            <p>Explora las películas disponibles:</p>
            {loading ? (
                <ClipLoader color="#000" loading={loading} />
            ) : (
                <>
                    <div className="home-cards-container">
                        {peliculas.slice(0, 3).map((pelicula) => (
                            <div className="home-card" key={pelicula._id}>
                                <h2 className="card-title">{pelicula.pelicula}</h2>
                                <p>Año: {pelicula.año}</p>
                                <p>Dirección: {pelicula.direccion}</p>
                                <p>Actores: {pelicula.actores}</p>
                                <p>Género: {pelicula.genero}</p>
                            </div>
                        ))}
                    </div>
                    <Link to="/peliculas">
                        <button className='home-view-more-button'>Ver más</button>
                    </Link>
                </>
            )}
        </div>
    );
}

export { Home };
