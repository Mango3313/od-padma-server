const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let medicamentosSchema = new Schema({
    nombre:{
        type:String
    },
    descripcion:{
        type:String
    },
    dosis:{
        type:Number
    },
    hora_aplicacion:{
        type:String
    },
    cantidad:{
        type:Number
    }, 
}, {
    collection: 'medicamentos'
})

module.exports = mongoose.model('medicamentosSchema', medicamentosSchema)