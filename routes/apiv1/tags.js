"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Anuncio = mongoose.model("Anuncio");

router.get('/', function(req, res, next){
    const tags = Anuncio.tags;
    console.log(tags);
    res.json({success: true, data: tags});
});

module.exports = router;

