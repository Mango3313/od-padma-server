const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let historicoMedsSchema = new Schema({
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
    collection: 'historicoMeds'
})

module.exports = mongoose.model('historicoMedsSchema', historicoMedsSchema)