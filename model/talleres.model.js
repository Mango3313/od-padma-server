const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let talleresSchema = new Schema({
    nombreInstruc:{
        type: String
    },
    lugar:{
        type: String
    },
    personas:{
        type:[{
            type: String
        }]
    }
}, {
    collection: 'talleres'
})

module.exports = mongoose.model('talleresSchema', talleresSchema)