const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios')

const filename2 = path.join(__dirname + '../../files/logs.txt');
var logger2 = fs.createWriteStream(filename2, {
    flags: 'a' // 'a' means appending (old data will be preserved)
})

exports.makeAnOrder = function (req, res) {

    const filename = path.join(__dirname + '../../files/log.csv');
    var pedido_actual = 0;

    fs.readFile(filename, 'utf8', function (err, data) {

        if (err) throw err;
        var mis_registros = data.split("\n")
        pedido_actual = mis_registros[mis_registros.length - 1].split(",")[0]
        var id_order = Number(pedido_actual) + 1

        var direccion = req.body.direccion
        var lista_items = req.body.lista_items

        var logger = fs.createWriteStream(filename, {
            flags: 'a' // 'a' means appending (old data will be preserved)
        })

        axios
            .post('http://localhost:3002/make-order', {
                id_order: id_order,
                direccion: direccion,
                lista_items: lista_items

            })
            .then(res2 => {
                if (res2['data']['status'] == 200) {
                    lista_items.forEach(element => {
                        logger.write("\n" + id_order + "," + element + "," + direccion + "," + "recibido")
                    });

                    var current = new Date();
                    logger2.write("\nSe realizó un nuevo pedido con los elementos: " + lista_items + " y se almacenó con el ID: " + id_order + " FECHA: " + current)

                    res.json({
                        status: 200,
                        id_pedido: id_order,
                        info: "Pedido realizado correctamente",
                    })
                }
                else {
                    lista_items.forEach(element => {
                        logger.write("\n" + id_order + "," + element + "," + direccion + "," + "recibido")
                    });

                    res.json({
                        status: 500,
                        id_pedido: id_order,
                        info: "Ocurrió un error al momento de realizar el pedido",
                    })
                }
            })
            .catch(error => {
                console.error(error)
            })
    })
}

exports.getRestaurantState = function (req, res) {

    const id_order = req.params.id

    axios
        .get('http://localhost:3002/get-state/' + id_order)
        .then(res2 => {

            res.json({
                status: 200,
                info: res2['data']['info'],
            })
        })
        .catch(error => {
            console.error(error)
        })
}


exports.getDeliverytState = function (req, res) {

    const id_order = req.params.id

    axios
        .get('http://localhost:3001/get-state/' + id_order)
        .then(res2 => {

            res.json({
                status: 200,
                info: res2['data']['info'],
            })
        })
        .catch(error => {
            console.error(error)
        })
}