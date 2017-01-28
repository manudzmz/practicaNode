"use strict";

const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');

// Modulo que exporta un middleware de autenticación
module.exports = function() {
    return function(req, res, next){
        const token = req.body.token || req.query.token || req.get('x-access-token');

        if (!token) {
            next(new Error('No token provided'));
            return;
        }
        jwt.verify(token, localConfig.jwt.secret, function(err, tokenDecoded){
           if (err) {
               next(new Error('Invalid token'));
               return;
           }
           req.tokenDecoded = tokenDecoded;
           next();
        });
    }
};
