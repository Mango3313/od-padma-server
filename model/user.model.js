const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    nombre: {
        type: String
    },
    password: {
        type: String
    },
    //Se tiene planeado que los puestos vayan de 1 a N para cada ocupacion
    // 1 Dactores
    // 2 Enfermer@s
    // 3 Seguridad
    // 4 Mantenimiento
    // 5 Maestr@s
}, {
    collection: 'usuarios'
})

module.exports = mongoose.model('userSchema', userSchema)