const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// Express route
const peticionesExpressRoute = express.Router();

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
let peticionesSchema = require('../model/solicitud.model');

// Get doctores
peticionesExpressRoute.route('/').get(verificarToken, (req, res) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        peticionesSchema.find((error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: data });
            }
        })
    }
})

// Create user
peticionesExpressRoute.route('/registrar-peticion').post(verificarToken, (req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        peticionesSchema.create(req.body, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: "Registro enviado exitosamente" });
            }
        })
    }
});


// Get single user
peticionesExpressRoute.route('/obtener-peticion/:nombre').get(verificarToken, (req, res) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        peticionesSchema.findOne({nombreRealizador:req.params.nombre}, (error, data) => {
            console.log(data)
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                console.log(data)
                res.status(200).json({ error: false, message: data });
            }
        })
    }
})

// Update user
peticionesExpressRoute.route('/update-peticion/:id').put(verificarToken, (req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        peticionesSchema.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: "Registro actualizado exitosamente" });
            }
        })
    }
})

// Delete student
peticionesExpressRoute.route('/remove-peticion/:id').delete(verificarToken, (req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        peticionesSchema.findByIdAndRemove(req.params.id, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: "Registro eliminado exitosamente" });
            }
        })
    }
})

module.exports = peticionesExpressRoute;