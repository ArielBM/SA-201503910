var path = require('path');

exports.initMain = function(req, res) {
    res.send('<H1>Cutomer Server Online</H1>');
}


exports.Test = function(req, res) {
    res.send('Función de prueba');
}