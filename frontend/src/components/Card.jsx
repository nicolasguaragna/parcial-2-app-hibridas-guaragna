import React from 'react';
import '../App.css';

// Declaro el componente funcional Card que acepta props (title, year, director, actors, genre).
const Card = ({ title, year, director, actors, genre }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <p><strong>Año:</strong> {year}</p>
      <p><strong>Dirección:</strong> {director}</p>
      <p><strong>Actores:</strong> {actors}</p>
      <p><strong>Género:</strong> {genre}</p>
    </div>
  );
};

export default Card;
