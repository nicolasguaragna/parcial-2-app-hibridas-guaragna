import Usuario from "../models/usuarios_model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

// Obtener todos los usuarios
async function getAllUsuarios(req, res){
    try {
        let usuarios = await Usuario.find({estado: true});
        console.log("Usuarios obtenidos:", usuarios); // Agrega este log
        return usuarios;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
}

async function registerUser(req, res) {
    const { nombre, email, password } = req.body;
    
    console.log("Datos recibidos en el backend:", req.body);

    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        usuario = new Usuario({
            nombre,
            email,
            password: bcrypt.hashSync(password, 10),
            estado: true
        });

        await usuario.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente', usuario });
    } catch (error) {
        console.error("Error al registrar usuario:", error.message);
        res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
    }
}



// Actualizar información de un usuario
async function updateUsuario(body, email){
    console.log(body)
    console.log(email)
    let usuario = await Usuario.updateOne({"email": email}, {
        $set:{
            nombre: body.nombre, 
            password: bcrypt.hashSync(body.password, 10)
        }
    })
    return usuario;
}

// Obtener un usuario por su ID
const getUsuarioById = async (id) => {
    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        return usuario;
    } catch (error) {
        throw error;
    }
}

// Eliminar un usuario por su ID
const deleteUsuario = async (req, res) => {
    const email = req.params.email;
    try {
        const usuario = await Usuario.findOneAndDelete({ email });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const filterUsuariosByNombre = async (filter) => {
    try {
        const usuarios = await Usuario.find().sort({ nombre: 1 });
        return usuarios;
    } catch (error) {
        throw error;
    }
}

const searchUsuariosByName = async (name) => {
    const filter = {
        nombre: { $regex: new RegExp(name, 'i') } // Utilizamos una expresión regular para la búsqueda por nombre
    };
    try {
        const usuarios = await Usuario.find(filter);
        return usuarios;
    } catch (error) {
        throw error;
    }
}

const loginUsuario = async (req, res) => {
Usuario.findOne({ email: req.body.email })
        .then(data => {
            if(data){
                const passwordValido = bcrypt.compareSync(req.body.password, data.password);
                if(!passwordValido) return res.status(400).json({error:'ok', msj:'Usuario o contraseña incorrecta.'})
                const jwToken = jwt.sign({
                    usuario: {_id: data._id, nombre: data.nombre, email: data.email}
                }, process.env.SEED, { expiresIn: process.env.EXPIRATION });
                res.json({
                    usuario:{
                        _id:data._id,
                        nombre:data.nombre,
                        email:data.email,
                    },
                    jwToken
                });
            }else{
                res.status(400).json({
                    error:'ok',
                    msj:'Usuario o contraseña incorrecta.'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                error:'ok',
                msj:'Error en el servicio' + err
            })
        })
}

export { getAllUsuarios, registerUser, updateUsuario, getUsuarioById, deleteUsuario, filterUsuariosByNombre, searchUsuariosByName, loginUsuario };
