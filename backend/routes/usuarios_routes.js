import express from "express";
import { getAllUsuarios, registerUser, updateUsuario , getUsuarioById, deleteUsuario, filterUsuariosByNombre, searchUsuariosByName, loginUsuario} from "../controllers/usuarios_controller.js"
import Joi from "joi";
import verificarToken from '../middlewares/auth.js';

const ruta = express.Router();
// https://joi.dev/
const schema = Joi.object({
    nombre: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9 ]+$'))  // Permitir espacios
                .alphanum()
                .min(3)
                .max(10)
                .required(),
    password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,6}$')),
    email: Joi.string()
                .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})

})

ruta.post('/login', loginUsuario);

// Ruta para obtener todos los usuarios
ruta.get("/" , verificarToken, async (req, res) => {
    let resultado = getAllUsuarios();
    resultado
        .then((users) => { res.status(200).json(users) })
        .catch((error) => { res.status(400).json(error) });
})


// Ruta para crear un nuevo usuario
ruta.post("/register", async (req, res) => {
    let body = req.body;

    const { error } = schema.validate({ nombre: body.nombre, email: body.email, password: body.password });
    if (!error) {
        try {
            let resultado = await registerUser(req, res);
            res.status(201).json(resultado);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } else {
        res.status(400).json({ message: error.details[0].message });
    }
});

//ej localhost:3000/usuarios/searchByName?name=Tatiana
ruta.get("/searchByName", verificarToken, async (req, res) => {
    const name = req.query.name; // Obtenemos el parámetro de consulta "name" de la URL
    try {
        const usuarios = await searchUsuariosByName(name);
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


// Ruta para actualizar la información de un usuario
// ej localhost:3000/usuarios/rober@gmail.com
ruta.put("/:email", verificarToken, (req, res) => {
    let body = req.body;
    let resultado = updateUsuario(body, req.params.email);
    resultado
        .then((user) => { res.status(201).json(user) })
        .catch((error) => { res.status(400).json(error) });
})

// Ruta para filtrar usuarios cuyos nombres comiencen desde la A hasta la Z
// ej localhost:3000/usuarios/filterByNombre
ruta.get("/filterByNombre", verificarToken, async (req, res) => {
    try {
        const usuarios = await filterUsuariosByNombre();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Ruta para obtener un usuario por su ID
//ej localhost:3000/usuarios/663699316e5d77efb0598e38
ruta.get("/:id",  verificarToken, async (req, res) => {
    const userId = req.params.id;
    try {
        const usuario = await getUsuarioById(userId);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Ruta para eliminar un usuario
ruta.delete("/:email", verificarToken, (req, res) => {
    let resultado = deleteUsuario(req, res);
    resultado
        .then(() => { res.status(200).json({ message: 'Usuario eliminado exitosamente' }) })
        .catch((error) => { res.status(400).json(error) });
})

export default ruta;