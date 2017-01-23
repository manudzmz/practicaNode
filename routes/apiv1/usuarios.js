"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Usuario = mongoose.model("Usuario");

router.get('/', function (req, res, next) {
    Usuario.find().exec(function(err, usuarios){
        if (err){
            res.json({success: false, data: err});
            return;
        }
        res.json({success: true, data: usuarios});
    });
});


router.post('/', function (req, res, next) {
    const usuario = new Usuario(req.body);
    usuario.save(function (err, usuarioCreado){
        if (err){
            res.json({success: false, data: err});
            return;
        }
        res.json({success: true, data: usuarioCreado});
    });
});

module.exports = router;
