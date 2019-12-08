const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let doctorSchema = new Schema({
    nombre:{
        type:String
    },
    telefono:{
        type:String
    },
    pacientes: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'pacienteSchema'
        }],
        validate:[validarPacientes,'{PATH} excede el limite de 8 pacientes'],
    }
}, {
    collection: 'doctores'
})
function validarPacientes(val){
    return val.length <= 10;
}

module.exports = mongoose.model('doctorSchema', doctorSchema)