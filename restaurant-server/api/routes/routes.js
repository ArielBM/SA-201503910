module.exports = function(app){
    
    const main = require ('../controllers/MainController')
    const order = require ('../controllers/OrderController')

    app.route('/').get(main.initMain);
    app.route('/make-order').post(order.makeAnOrder);
    app.route('/get-state/:id').get(order.getState);
    app.route('/order-ready/:id').get(order.orderIsReady);
}