
"use strict";

const mongoose = require('mongoose');

var usuarioSchema = mongoose.Schema({
    nombre: String,
    email: {type: String, text: true},
    clave: String
});


usuarioSchema.statics.list = function(filter, cb){
    const query = Usuario.find(filter);
    query.exec(cb);
}

var Usuario = mongoose.model('Usuario', usuarioSchema);