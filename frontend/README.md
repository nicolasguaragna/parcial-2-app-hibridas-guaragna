# Fernando Nicolas Guaragna 
# Aplicaciones Híbridas
# Camila Belen Marcos Galban
# DWN4AV
# 2024

# Parcial 2 - App Híbridas

## Descripción

Este proyecto es una aplicación web para gestionar películas y reseñas. 
Los usuarios pueden registrarse, iniciar sesión, ver una lista de películas, añadir nuevas películas y reseñas, y actualizar o eliminar las existentes.

## Estructura del Proyecto
frontend/
├── node_modules/
├── public/
├── src/
│   ├── api/
│   │   ├── peliculas.js
│   │   ├── reviews.js
│   │   └── usuarios.js
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Peliculas/
│   │   │   ├── Card.jsx
│   │   │   ├── CrearPelicula.jsx
│   │   │   ├── PeliculasDetail.jsx
│   │   │   └── PeliculasList.jsx
│   │   ├── Reseñas/
│   │   │   ├── CrearResena.jsx
│   │   │   └── Reviews.jsx
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── utils/
│   │   └── ProtectedRoutes.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── index.js
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
└── .env

## Para levantar el proyecto de Back
// Levantar el Proyecto 

## cd frontend
## npm run dev
