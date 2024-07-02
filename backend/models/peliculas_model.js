import mongoose from "mongoose";

const peliculaSchema = new mongoose.Schema({
    pelicula: {
        type: String,
        required: true
    },
    año: {
        type: Number,
        required: true
    },
    direccion: {
        type: [String],
        required: true
    },
    actores: {
        type: [String],
        required: true
    },
    genero: {
        type: [String],
        required: true
    }
})

export default mongoose.model('peliculas', peliculaSchema)