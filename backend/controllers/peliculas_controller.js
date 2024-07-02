import Pelicula from "../models/peliculas_model.js"

// Obtener todas las películas
const getAllPeliculas = async (req, res) => {
    try {
        const peliculas = await Pelicula.find();
        console.log(peliculas.length); 
        return peliculas;
    } catch (error) {
        throw error;
    }
}

// Obtener una película por su ID
const getPeliculaById = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await Pelicula.findById(id);
        if (!pelicula) {
            return res.status(404).json({ message: 'Pelicula no encontrada' });
        }
        res.status(200).json(pelicula);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Crear una nueva película
async function createPelicula(req){
    let peliculaNueva = new Pelicula({
        pelicula: req.body.pelicula,
        año: req.body.año,
        direccion: req.body.direccion,
        actores: req.body.actores,
        genero: req.body.genero,
        estado: true,
    });
    return await peliculaNueva.save()
}

// Actualizar información de una película
const updatePelicula = async (req, res) => {
    const id = req.params.id;
    const newData = req.body; // Los nuevos datos de la película a actualizar

    try {
        const pelicula = await Pelicula.findByIdAndUpdate(id, newData, { new: true });
        if (!pelicula) {
            return res.status(404).json({ message: 'Pelicula no encontrada' });
        }
        res.status(200).json(pelicula);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Eliminar una película por su ID
const deletePeliculaById = async (req, res) => {
    const id = req.params.id;
    try {
        const pelicula = await Pelicula.findByIdAndDelete(id);
        if (!pelicula) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }
        res.status(200).json({ message: 'Película eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getAllPeliculas, createPelicula , updatePelicula, getPeliculaById, deletePeliculaById};

