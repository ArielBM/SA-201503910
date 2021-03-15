let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);
const url = 'http://localhost:3002';
const bodyParser = require("body-parser");
const { json } = require('body-parser');
const urlencodedParser = bodyParser.json({ extended: false });

const id_actual = 3;


describe('Realizar un pedido.', () => {
    it('Se envían los parámetros necesarios para realizar un pedido.', (done) => {
        chai.request(url)
            .post('/make-order')
            .send({
                "id_order": id_actual,
                "direccion": "Orden realizada desde las pruebas",
                "lista_items": ["este","es","un","test"]
            })
            .end(function (err, res) {
                if (err) console.log(err);
                chai.assert.equal(`{"status":200}`, `{"status":${res.body.status}}`, "Prueba de creación de pedido superada")
                done();
            });
    });
});


describe('Verificar el estado del pedido.', () => {
    it('Se envía el id del pedido para verificar que fue creado y obtener su estado.', (done) => {
        chai.request(url)
            .get('/get-state/' + id_actual)
            .end(function (err, res) {
                if (err) console.log(err);
                chai.assert.equal(`{"status":200}`, `{"status":${res.body.status}}`, "Prueba de obtención de estado de pedido superada")
                done();
            });
    });
});



describe('Marcar el pedido como listo para la entrega.', () => {
    it('Se envía el id del pedido para que este se marque como entregado para el repartidor.', (done) => {
        chai.request(url)
            .get('/order-ready/' + id_actual)
            .end(function (err, res) {
                if (err) console.log(err);
                chai.assert.equal(`{"status":200}`, `{"status":${res.body.status}}`, "Prueba de obtención de estado de pedido superada")
                done();
            });
    });
});


