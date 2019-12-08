const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let trabajadoresSchema = new Schema({
    nombre:{
        type:String
    },
    telefono:{
        type:String
    },
    puesto:{
        type:String
    }
}, {
    collection: 'trabajadores'
})

module.exports = mongoose.model('trabajadoresSchema', trabajadoresSchema)