"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Anuncio = mongoose.model("Anuncio");

router.get('/', function (req, res, next) {
    Anuncio.find().exec(function(err, anuncios){
        if (err){
            res.json({success: false, data: err});
            return;
        }
        res.json({success: true, data: anuncios});
    });
});

module.exports = router;
