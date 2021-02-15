var path = require('path');

exports.initMain = function(req, res) {

    res.sendFile(path.join(__dirname + '../../templates/index.html'));
}


exports.Test = function(req, res) {
    res.send('Función de prueba');
}