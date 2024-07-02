import Usuario from "../models/usuarios_model.js"
import bcrypt from "bcrypt"
import express from "express"
import jwt from "jsonwebtoken"
import "dotenv/config"

const ruta = express.Router()

ruta.post('/', (req, res) => {
    Usuario.findOne({email: req.body.email})
    .then(data => {
        if(data){
            // "2222" ==  "$2b$10$em7fCmrtis87yxcYxkun1eFWRBvry2LHFjTgR9aLudAuSF.DFDzP6"
            const passwordValido = bcrypt.compareSync(req.body.password, 
                data.password)
                if(!passwordValido) return res.status(400).json({msj: "password incorrecto"})
                const jwToken = jwt.sign({
                usuario: {
                    _id: data._id,
                    nombre: data.nombre,
                    email: data.email
                }  
                }, process.env.SEED, {expiresIn: process.env.EXPIRATION})
                res.json({
                    usuario: {
                        _id: data._id,
                        nombre: data.nombre,
                        email: data.email
                    }, jwToken
            }) 
            }else{
            res.status(400).json({msj: "email incorrecto"})
        }
    })
})

export default ruta;
