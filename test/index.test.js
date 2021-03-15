const request =  require('supertest')
const server =  require('../restaurant-server/api/controllers/MainController')

const id_actual = 2;

describe('Verificar Estado de un Pedido', () => {
    it('Se envía el id del pedido para verificar que fue creado y obtener su estado.', async (done) => {
        const res =  await  request(server)
        .get('/get-state/' + id_actual)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('info');
        done();
    })
})
afterAll(async  done  => {
    // close server conection
    //server.close();
    done();
});