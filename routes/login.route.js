const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
// Express route
const userExpressRoute = express.Router();

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
let userSchema = require('../model/user.model');

// Get users
userExpressRoute.route('/').get((req, res) => {
    userSchema.find((error, data) => {
        if (error) {
            res.status(500).json({ error: true, message: "Error" });
        } else {
            res.status(200).json({ error: false, message: data });
        }
    })
})

// Create user
userExpressRoute.route('/crear-usuario').post((req, res, next) => {
    userSchema.create(req.body, (error, data) => {
        if (error) {
            res.status(500).json({ error: true, message: "Error" });
        } else {
            res.status(200).json({ error: false, message: "Usuario registrado con exito" })
        }
    })
});


// Get single user
/*
userExpressRoute.route('/obtener-user/:id').get((req, res) => {
    userSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data._id)
        }
    })
})
*/
userExpressRoute.route('/login/').post((req, res) => {
    var dato = {nombre:req.body.nombre, password:req.body.password};
    userSchema.findOne(dato, (error, data) => {
        console.log(data);
        if (error) {
            res.status(500).json({ error: true, message: "Error" });
        } else {
            if(data !== null && typeof data !== 'undefined' && data !==''){
                
                jwt.sign({ data, exp: Math.floor(Date.now() / 1000) + (12 * 60 * 60) }, process.env.SECRET_KEY, (err, token) => {
                    //console.log(token)
                    res.status(200).json({ error: false, token })
                })
            }else{
                res.status(201).json({ error: true, message:"No existe el usuario o contrasenia" })
            }
        }
    })
})

// Update user
userExpressRoute.route('/update-user/:id').put(verificarToken,(req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        userSchema.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "Error" });
            } else {
                //res.json(data)
                res.status(200).json({ error: false, message: "Usuario actualizado con exito" })
            }
        })
        /*
        var tok = jwt.verify(req.token, process.env.SECRET_KEY)
        if (typeof tok === 'undefined') {
            res.status(403).json({error:true,message:"Token expirado o invalido"})
        } else {
            userSchema.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data)
                 res.status(200).json({ error: false, message: "Usuario actualizado con exito" })
            }
        })
            userSchema.create(req.body, (error, data) => {
                if (error) {
                    return next(error)
                } else {
                    res.status(200).json({ error: false, message: "Usuario registrado con exito" })
                }
            })
        }
        */
    }
})

// Delete student
userExpressRoute.route('/remove-user/:id').delete(verificarToken,(req, res, next) => {
    var tok = jwt.verify(req.token, process.env.SECRET_KEY)
    if (typeof tok === 'undefined') {
        res.status(403).json({ error: true, message: "Token expirado o invalido" })
    } else {
        userSchema.findByIdAndRemove(req.params.id, (error, data) => {
            if (error) {
                res.status(500).json({ error: true, message: "Error" });
            } else {
                res.status(200).json({ error: false, message: data })
            }
        })
    }
    /*
     var tok = jwt.verify(req.token, process.env.SECRET_KEY)
        if (typeof tok === 'undefined') {
            res.status(403).json({error:true,message:"Token expirado o invalido"})
        } else {
            userSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({ error: false, message: data })
        }
    })
    */
})

module.exports = userExpressRoute; 