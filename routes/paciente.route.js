const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// Express route
const pacienteExpressRoute = express.Router();

//========MIDDLEWARE=====
function verificarToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, process.env.SECRET_KEY, (error, result) => {
            if (error) {
                res.status(403).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

// User schema
let pacienteSchema = require('../model/paciente.model');

// Get doctores
pacienteExpressRoute.route('/').get(verificarToken, (req, res) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        pacienteSchema.find((error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "Error" });
            } else {
                res.status(200).json({ error: false, message: data});
            }
        })
    }
})

// Create user
pacienteExpressRoute.route('/registrar-paciente').post(verificarToken, (req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        pacienteSchema.create(req.body, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: "Paciente registrado exitosamente" });
            }
        })
    }
});


// Get single user
pacienteExpressRoute.route('/detalles-paciente/:nombre').get(verificarToken, (req, res) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        pacienteSchema.findOne({nombre:req.params.nombre}, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                if(data !== null && typeof data !== 'undefined' && data !==''){
                
                
                        //console.log(token)
                        res.status(200).json({ error: false, message:data })
                  
                }else{
                    res.status(201).json({ error: true, message:"No existe el usuario o contrasenia" })
                }
            }
        })
    }
})

// Update user
pacienteExpressRoute.route('/update-paciente/:id').put(verificarToken, (req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        pacienteSchema.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: "Paciente actualizado exitosamente" });
            }
        })
    }
})

// Delete student
pacienteExpressRoute.route('/remove-paciente/:id').delete(verificarToken, (req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        pacienteSchema.findByIdAndRemove(req.params.id, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: "Paciente removido exitosamente" });
            }
        })
    }
})

module.exports = pacienteExpressRoute;