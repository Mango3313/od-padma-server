const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let solicitudSchema = new Schema({
    nombreRealizador:{
        type:String
    },
    descripcion:{
        type:String
    },
    estado:{
        type:String
    }
}, {
    collection: 'solicitudes'
})

module.exports = mongoose.model('solicitudSchema', solicitudSchema)