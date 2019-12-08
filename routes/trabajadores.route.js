const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// Express route
const trabajadoresExpressRoute = express.Router();

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
let trabajadoresSchema = require('../model/trabajadores.model');

// Get doctores
trabajadoresExpressRoute.route('/').get(verificarToken, (req, res) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        trabajadoresSchema.find((error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: data });
            }
        })
    }
})

// Create user
trabajadoresExpressRoute.route('/registrar-trabajador').post(verificarToken, (req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        trabajadoresSchema.create(req.body, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: "Taller registrado exitosamente" });
            }
        })
    }
});


// Get single user
trabajadoresExpressRoute.route('/detalles-trabajador/:id').get(verificarToken, (req, res) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        trabajadoresSchema.findById(req.params.id, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: data });
            }
        })
    }
})

// Update user
trabajadoresExpressRoute.route('/update-trabajador/:id').put(verificarToken, (req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        trabajadoresSchema.findByIdAndUpdate(req.params.id, {
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
trabajadoresExpressRoute.route('/remove-trabajador/:id').delete(verificarToken, (req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        trabajadoresSchema.findByIdAndRemove(req.params.id, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: "Registro eliminado exitosamente" });
            }
        })
    }
})

module.exports = trabajadoresExpressRoute;