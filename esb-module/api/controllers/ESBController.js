const fs = require('fs');
const path = require('path');

const filename2 = path.join(__dirname + '../../files/logs.txt');
var logger2 = fs.createWriteStream(filename2, {
    flags: 'a' // 'a' means appending (old data will be preserved)
})

const axios = require('axios')

var misServicios = []

//===============================================================================================
//=================================== REDIRECCIÓN AL CLIENTE ====================================
exports.makeAnOrder = function (req, res) {


    const puerto = retornarPuerto("cliente");

    var direccion = req.body.direccion;
    var lista_items= req.body.lista_items;

    axios
        .post('http://localhost:' + puerto + '/make-order', {

            direccion: direccion,
            lista_items: lista_items

        })
        .then(res2 => {
            var current = new Date();
            logger2.write(`${current}: Se realizó una petición POST al servicio del "cliente", endpoint: "/make-order" con los parámetros: {direccion: ${direccion}, lista_items: ${lista_items}}\n`)
            res.json(res2["data"])
        })
        .catch(error => {
            res.json(error)
        })
}

exports.getRestaurantState = function (req, res) {

    const puerto = retornarPuerto("cliente");

    const id_order = req.params.id

    axios
        .get('http://localhost:' + puerto + '/get-restaurant-state/' + id_order)
        .then(res2 => {
            var current = new Date();
            logger2.write(`${current}: Se realizó una petición GET al servicio del "cliente", endpoint: "/get-restaurant-state" con el parámetro: {id: ${id_order}}\n`)
            res.json(res2['data']);
        })
        .catch(error => {
            res.json(error);
        })
}

exports.getDeliverytState = function (req, res) {

    const puerto = retornarPuerto("cliente");

    const id_order = req.params.id

    axios
        .get('http://localhost:' + puerto + '/get-delivery-state/' + id_order)
        .then(res2 => {
            var current = new Date();
            logger2.write(`${current}: Se realizó una petición GET al servicio del "cliente", endpoint: "/get-delivery-state" con el parámetro: {id: ${id_order}}\n`)
            res.json(res2['data']);
        })
        .catch(error => {
            res.json(error);
        })
}

//===============================================================================================
//================================== REDIRECCIÓN AL REPARTIDOR ==================================
exports.takeOrder = function (req, res) {

    var id_order = req.body.id_order
    var direccion = req.body.direccion
    var lista_items = req.body.lista_items

    const puerto = retornarPuerto("repartidor");

    axios
        .post('http://localhost:' + puerto + '/take-order', {
            id_order: id_order,
            direccion: direccion,
            lista_items: lista_items
        })
        .then(res2 => {
            var current = new Date();
            logger2.write(`${current}: Se realizó una petición POST al servicio del "repartidor", endpoint: "/take-order" con los parámetros: {id_order: ${id_order}, direccion: ${direccion}, lista_items: ${lista_items}}\n`)
            res.json(res2["data"])
        })
        .catch(error => {
            res.json(error)
        })

}

exports.getState = function (req, res) {

    const puerto = retornarPuerto("repartidor");

    const id_order = req.params.id

    axios
        .get('http://localhost:' + puerto + '/get-state/' + id_order)
        .then(res2 => {
            var current = new Date();
            logger2.write(`${current}: Se realizó una petición GET al servicio del "repartidor", endpoint: "/get-state" con el parámetro: {id: ${id_order}}\n`)
            res.json(res2['data']);
        })
        .catch(error => {
            res.json(error);
        })

}

exports.orderDelivered = function (req, res) {

    const puerto = retornarPuerto("repartidor");

    const id_order = req.params.id

    axios
        .get('http://localhost:' + puerto + '/order-delivered/' + id_order)
        .then(res2 => {
            var current = new Date();
            logger2.write(`${current}: Se realizó una petición GET al servicio del "repartidor", endpoint: "/order-delivered" con el parámetro: {id: ${id_order}}\n`)
            res.json(res2['data']);
        })
        .catch(error => {
            res.json(error);
        })
}

//===============================================================================================
//================================== REDIRECCIÓN AL RESTAURANTE =================================
exports.makeAnOrder2 = function (req, res) {

    const puerto = retornarPuerto("restaurante");

    var id_order = req.body.id_order
    var direccion = req.body.direccion
    var lista_items = req.body.lista_items

    axios
        .post('http://localhost:' + puerto + '/make-order', {
            id_order: id_order,
            direccion: direccion,
            lista_items: lista_items
        })
        .then(res2 => {
            var current = new Date();
            logger2.write(`${current}: Se realizó una petición POST al servicio del "restaurante", endpoint: "/make-order" con los parámetros: {id_order: ${id_order}, direccion: ${direccion}, lista_items: ${lista_items}}\n`)
            res.json(res2["data"])
        })
        .catch(error => {
            res.json(error)
        })
}

exports.getState2 = function (req, res) {

    const puerto = retornarPuerto("restaurante");

    const id_order = req.params.id

    axios
        .get('http://localhost:' + puerto + '/get-state/' + id_order)
        .then(res2 => {
            var current = new Date();
            logger2.write(`${current}: Se realizó una petición GET al servicio del "restaurante", endpoint: "/get-state" con el parámetro: {id: ${id_order}}\n`)
            res.json(res2['data']);
        })
        .catch(error => {
            res.json(error);
        })

}

exports.orderIsReady = function (req, res) {

    const puerto = retornarPuerto("restaurante");

    const id_order = req.params.id

    axios
        .get('http://localhost:' + puerto + '/order-ready/' + id_order)
        .then(res2 => {
            var current = new Date();
            logger2.write(`${current}: Se realizó una petición GET al servicio del "restaurante", endpoint: "/order-ready" con el parámetro: {id: ${id_order}}\n`)
            res.json(res2['data']);
        })
        .catch(error => {
            res.json(error);
        })

}

//===============================================================================================
//====================================== SERVICIOS DEL BUS ======================================

exports.enrollService = function (req, res) {

    var puerto = req.body.puerto;
    var servidor = req.body.servidor;
    var flag = false;

    for (i = 0; i < misServicios.length; i++) {
        if (misServicios[i]["puerto"] == puerto && misServicios[i]["servidor"] == servidor) {
            console.log(`El servidor: "` + servidor + `" con puerto: "` + puerto + `" ya se encuentra registrado.`);
            flag = true;
            break;
        }
    }

    if (!flag) {
        misServicios.push({ "puerto": puerto, "servidor": servidor });
        console.log("El servidor: " + servidor + " se registró con éxito en el puerto: " + puerto)
    }

    res.json({
        status: 200,
        info: "El servidor: " + servidor + " se registró con éxito en el puerto: " + puerto
    });


}

function retornarPuerto(servidor) {
    for (i = 0; i < misServicios.length; i++) {

        if (misServicios[i]["servidor"] == servidor) {

            return misServicios[i]["puerto"]
        }
    }
}

