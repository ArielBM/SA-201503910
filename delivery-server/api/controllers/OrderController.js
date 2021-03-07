const fs = require('fs');
const path = require('path');
const filename = path.join(__dirname + '../../files/log.csv');
const converter = require('json-2-csv');

const filename2 = path.join(__dirname + '../../files/logs.txt');
var logger2 = fs.createWriteStream(filename2, {
    flags: 'a' // 'a' means appending (old data will be preserved)
})

const options = {
    delimiter: {
        wrap: '"', // Double Quote (") character
        field: ',', // Comma field delimiter
        eol: '\n' // Newline delimiter
    },
    prependHeader: true,
    sortHeader: false,
    excelBOM: true,
    trimHeaderValues: true,
    trimFieldValues: true,
    keys: ['order_id', 'item', 'address', 'state']
};


exports.takeOrder = function (req, res) {

    var id_order = req.body.id_order
    var direccion = req.body.direccion
    var lista_items = req.body.lista_items

    var logger = fs.createWriteStream(filename, {
        flags: 'a' // 'a' means appending (old data will be preserved)
    })

    lista_items.forEach(element => {

        logger.write("\n" + id_order + "," + element + "," + direccion + "," + 1)

    });
    var current = new Date();
    logger2.write("\nEl pedido con el ID: " + id_order + " con los elementos: " + lista_items + " está listo para ser entregado. FECHA: " + current)
    res.json({
        status: 200,
        id_pedido: id_order,
        info: "Pedido recibido",
    })
}


exports.getState = function (req, res) {

    const id_order = req.params.id

    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;

        var mis_registros = data.split("\n")
        var info = ""
        var i;
        var element;
        for (i = 0; i < mis_registros.length; i++) {
            element = mis_registros[i];
            var actual = element.split(",");

            if (actual[0] == id_order) {
                if (actual[3] == 1) {
                    info = "En camino"
                }
                else {
                    info = "Entregado"
                }
                break;
            }
        }
        res.json({
            status: 200,
            info: info
        })
    })
}


exports.orderDelivered = function (req, res) {

    const id_order = req.params.id;
    var direccion = ""
    var array2 = [];
    var lista_items = [];
    var columns = ["order_id", "item", "address", "state"];
    require("csv-to-array")({
        file: filename,
        columns: columns
    }, function (err, array) {
        let i = 0
        for (i = 1; i < array.length; i++) {
            let element = array[i]
            if (element['order_id'] == id_order) {
                element['state'] = 2
                lista_items.push(element['item'])
                direccion = element['address']
            }
            array2.push(element)
        }

        let json2csvCallback = function (err, csv) {
            if (err) throw err;
            fs.writeFile(filename, csv, 'utf8', function (err) {
                if (err) return console.log(err)
                var current = new Date();
                logger2.write("\nEl pedido con el ID: " + id_order + " se marcó como ENTREGADO. FECHA: " + current)
                res.json({
                    status: 200,
                    id_pedido: id_order,
                    info: 'Pedido se marcó como "Entregado"',
                })
            })
        };

        converter.json2csv(array2, json2csvCallback, options);

    });


}