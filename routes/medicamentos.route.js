const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// Express route
const medicamentosExpressRoute = express.Router();

//========MIDDLEWARE=====
function verificarToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, process.env.SECRET_KEY, (error, result) => {
            if (error) {
                console.log(error)
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
let medicamentosSchema = require('../model/medicamentos.model');

// Get doctores
medicamentosExpressRoute.route('/').get(verificarToken, (req, res) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        medicamentosSchema.find((error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: data});
            }
        })
    }
})

// Create user
medicamentosExpressRoute.route('/registrar-meds').post(verificarToken, (req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        medicamentosSchema.create(req.body, (error, data) => {
            if (error) {
                console.log(error)
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: "Doctor registrado exitosamente"});
            }
        })
    }
});


// Get single user
medicamentosExpressRoute.route('/detalles-meds/:id').get(verificarToken, (req, res) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        medicamentosSchema.findById(req.params.id, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "Error" });
            } else {
                res.status(200).json({ error: false, message: data });
            }
        })
    }
})

// Update user
medicamentosExpressRoute.route('/update-meds/:id').put(verificarToken, (req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        medicamentosSchema.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: "Doctor actualizado exitosamente" });
            }
        })
    }
})

// Delete student
medicamentosExpressRoute.route('/remove-meds/:id').delete(verificarToken, (req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        medicamentosSchema.findByIdAndRemove(req.params.id, (error, data) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: true, message: "TOKEN INVALIDO" });
            } else {
                res.status(200).json({ error: false, message: "Doctor eliminado exitosamente" });
            }
        })
    }
})

module.exports = medicamentosExpressRoute;