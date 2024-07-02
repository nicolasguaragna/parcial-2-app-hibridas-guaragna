import express from "express"
import { getAllPeliculas, createPelicula, updatePelicula, getPeliculaById, deletePeliculaById } from "../controllers/peliculas_controller.js";
import verificarToken from "../middlewares/auth.js";

const ruta = express.Router();

ruta.get("/", verificarToken, async (req, res) => {
    try {
        const peliculas = await getAllPeliculas();
        res.status(200).json(peliculas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//ejemplo localhost:3000/peliculas/6636973d6e5d77efb0598e28
ruta.get("/:id", getPeliculaById)

// ej localhost:3000/peliculas
ruta.post("/", (req, res) => {
    let resultado = createPelicula(req);
    resultado
        .then((user) => { res.status(201).json(user) })
        .catch((error) => { res.status(400).json(error) })
})

//ejemplo localhost:3000/peliculas/6636973d6e5d77efb0598e28
ruta.put("/:id", updatePelicula)

//ejemplo localhost:3000/peliculas/6636973d6e5d77efb0598e28
ruta.delete("/:id", deletePeliculaById)


export default ruta;