const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// Express route
const doctorExpressRoute = express.Router();

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
let doctorSchema = require('../model/doctor.model');

// Get doctores
doctorExpressRoute.route('/').get(verificarToken, (req, res) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        doctorSchema.find((error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: data });
            }
        })
    }
})

// Create user
doctorExpressRoute.route('/registrar-doctor').post(verificarToken, (req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        doctorSchema.create(req.body, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: "Registrado con exito" });
            }
        })
    }
});


// Get single user
doctorExpressRoute.route('/detalles-doctor/:id').get(verificarToken, (req, res) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        doctorSchema.findById(req.params.id, (error, data) => {
            if (error) {
                return next(error)
            } else {
                res.json(data)
            }
        })
    }
})

// Update user
doctorExpressRoute.route('/update-doctor/:id').put(verificarToken, (req, res) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        doctorSchema.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "Ocurrio un error" })
            } else {
                res.json(data)
                console.log('Student successfully updated!')
            }
        })
    }
})

// Delete student
doctorExpressRoute.route('/remove-doctor/:id').delete(verificarToken, (req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        doctorSchema.findByIdAndRemove(req.params.id, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "Ocurrio un error" })
            } else {
                res.status(200).json({
                    msg: data
                })
            }
        })
    }
})

module.exports = doctorExpressRoute;