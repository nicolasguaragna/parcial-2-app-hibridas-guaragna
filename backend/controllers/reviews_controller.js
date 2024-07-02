import Review from "../models/reviews_model.js";

// Obtener todas las reseñas
const getAllReviews = async (req,res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una reseña por su ID
const getReviewById = async (req, res) => {
    try {
        const id = req.params.id;
        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ message: "Reseña no encontrada" });
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva reseña
const createReview = async (req, res) => {
    try {
        const review = new Review({
            nombre: req.body.nombre,
            pelicula: req.body.pelicula,
            comentario: req.body.comentario,
            calificacion: req.body.calificacion,
            fecha: req.body.fecha || Date.now()
        });
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una reseña
async function updateReview(req, res) {
    try {
      const { id } = req.params;
      const { pelicula, nombre, comentario, calificacion } = req.body;
  
      const updatedReview = await Review.findByIdAndUpdate(
        id,
        { pelicula, nombre, comentario, calificacion },
        { new: true } // Esto asegura que se devuelva el documento actualizado
      );
  
      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la reseña', error });
    }
  }

// Eliminar una reseña
const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res.status(404).json({ message: 'Reseña no encontrada' });
        }
        res.json({ message: 'Reseña eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getAllReviews, getReviewById, createReview, updateReview, deleteReview };
