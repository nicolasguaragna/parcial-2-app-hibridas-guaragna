import express from "express";
import { getAllReviews, getReviewById, createReview, updateReview, deleteReview } from "../controllers/reviews_controller.js";
import verificarToken from '../middlewares/auth.js';

const router = express.Router();

// Ruta para obtener todas las reseñas con filtrado opcional por película
// get http://localhost:3000/reviews?pelicula=<pelicula_id>
router.get("/", verificarToken, async (req, res) => {
  try {
    const { pelicula } = req.query; // Obtén el parámetro de consulta 'pelicula' de la URL
    const query = pelicula ? { pelicula } : {}; // Si hay un parámetro 'pelicula', filtra por él
    const reviews = await getAllReviews(query); // Encuentra las reseñas que coinciden con el filtro
    res.json(reviews); // Devuelve las reseñas como respuesta
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reseñas', error }); // Manejo de errores
  }
});

// Ruta para obtener una reseña por ID  
// get http://localhost:3000/reviews/667dc704e20c8969f0a7e8db ok!
router.get("/:id", verificarToken, getReviewById);

// Ruta para crear una nueva reseña
// post http://localhost:3000/reviews ok!
router.post("/", verificarToken, createReview);

// Ruta para actualizar una reseña
// put http://localhost:3000/reviews/667dc704e20c8969f0a7e8db ok!
router.put("/:id", verificarToken, updateReview);

// Ruta para eliminar una reseña
// delete http://localhost:3000/reviews/667dc704e20c8969f0a7e8db ok! 
router.delete("/:id", verificarToken, deleteReview);

export default router;
