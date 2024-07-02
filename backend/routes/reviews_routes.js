import express from "express";
import { getAllReviews, getReviewById, createReview, updateReview, deleteReview } from "../controllers/reviews_controller.js";
import verificarToken from '../middlewares/auth.js';

const router = express.Router();

//get http://localhost:3000/reviews ok!
router.get("/", getAllReviews);

// Ruta para obtener una reseña por ID  
//get http://localhost:3000/reviews/667dc704e20c8969f0a7e8db ok!
router.get("/:id", verificarToken, getReviewById);

// Ruta para crear una nueva reseña
//post http://localhost:3000/reviews ok!
router.post("/", verificarToken, createReview);

// Ruta para actualizar una reseña
//put http://localhost:3000/reviews/667dc704e20c8969f0a7e8db ok!
router.put("/:id", verificarToken, updateReview);

// Ruta para eliminar una reseña
//delete http://localhost:3000/reviews/667dc704e20c8969f0a7e8db ok! 
router.delete("/:id", verificarToken, deleteReview);

export default router;
