module.exports = function(app){
    
    //EXPORTACIÓN DE LOS MÓDULOS 
    const main = require ('../controllers/MainController')
    const order = require ('../controllers/ESBController')

    //RUTA PRINCIPAL
    app.route('/').get(main.initMain);

    //FUNCIÓN PARA ENRROLAR 
    app.route('/api/enroll').post(order.enrollService);


    //PETICIONES DEL CLIENTE
    app.route('/customer/make-order').post(order.makeAnOrder);
    app.route('/customer/get-restaurant-state/:id').get(order.getRestaurantState);
    app.route('/customer/get-delivery-state/:id').get(order.getDeliverytState);


    //PETICIONES DEL REPARTIDOR
    app.route('/delivery/take-order').post(order.takeOrder);
    app.route('/delivery/get-state/:id').get(order.getState);
    app.route('/delivery/order-delivered/:id').get(order.orderDelivered);


    //PETICIONES DEL RESTAURANTE
    app.route('/restaurant/make-order').post(order.makeAnOrder2);
    app.route('/restaurant/get-state/:id').get(order.getState2);
    app.route('/restaurant/order-ready/:id').get(order.orderIsReady);


}