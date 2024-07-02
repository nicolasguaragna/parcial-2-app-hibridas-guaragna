import mongoose from "mongoose"

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    },
    imagen: {
        type: String,
        required: false
    }
})

export default mongoose.model('Usuario', usuarioSchema)