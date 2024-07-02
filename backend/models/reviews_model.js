import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
        nombre: {
            type: String,
            required: true
        },
        pelicula: {
            type: String,
            required: true
        },
        comentario: {
            type: String,
            required: true
        },
        calificacion: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        fecha: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Review", reviewSchema);
