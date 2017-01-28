"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Usuario = mongoose.model("Usuario");

const jwt = require('jsonwebtoken');
const localConfig = require('../../localConfig');


// Esto comentarlo porque no se pueden consultar los usuarios
router.get('/', function(req, res, next) {
    Usuario.find().exec(function(err, usuarios){
        if (err){
            res.json({success: false, data: err});
            return;
        }
        res.json({success: true, data: usuarios});
    });
});


router.post('/', function(req, res, next) {
    const usuario = new Usuario(req.body);
    usuario.save(function (err, usuarioCreado){
        if (err){
            res.json({success: false, data: err});
            return;
        }
        res.json({success: true, data: usuarioCreado});
    });
});


router.post('/authenticate', function(req, res, next){
    const userName = req.body.username;
    const password = req.body.password;

    console.log('username: ', userName);
    console.log('password: ', password);

    var filter = {};

    //Buscar al usuario en la BD y comprobar que su contraseña es correcta
    filter = {nombre: userName};

    console.log('Filtro: ', filter);

    Usuario.list(filter, function(err, usuario){
        if (err){
            res.json({success: false, data: err});
            return;
        }
        console.log(typeof usuario);    //---------------------
        console.log('----->', usuario); //---------------------
        if ((usuario.length == '0') || (usuario[0].clave != password)) {
            next(new Error('Usuario o contraseña incorrectos'));
        }
        else {
            console.log('Usuario: ', usuario[0].nombre);  //---------------------
            console.log('Password: ', usuario[0].clave);  //---------------------
            console.log("Estoy antes del IF");            //---------------------
            if (usuario[0].clave == password) {
                console.log("Estoy justo despues del IF"); //---------------------
                // Si coincide creamos el token
                const token = jwt.sign({_id: usuario[0]._id}, localConfig.jwt.secret, {
                    expiresIn: localConfig.jwt.expiresIn
                });
                res.json({success: true, token: token});
            }
        }

    });
});

module.exports = router;
