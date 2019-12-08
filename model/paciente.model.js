const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pacienteSchema = new Schema({
    nombre:{
        type: String
    },
    estado:{
        type: String
    },
    progreso:{
        type: String
    },
    fecha_ingreso:{
        type: String
    },
    num_visitas:{
        type: Number
    },
    fecha_ultima_visita:{
        type: String
    },
    fecha_proxima_visita:{
        type: String
    },
    fecha_aprox_salida:{
        type: String
    },
    id_doctor:{
        type: Schema.Types.ObjectId,
        ref: 'doctorSchema'
    },
    id_med:{
        type: Schema.Types.ObjectId,
        ref: 'medicamentosSchema'
    },
    observaciones:{
        type: String
    },
}, {
    collection: 'pacientes'
})

module.exports = mongoose.model('pacienteSchema', pacienteSchema)