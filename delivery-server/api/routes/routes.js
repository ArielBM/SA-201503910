module.exports = function(app){
    
    var main = require ('../controllers/MainController')
    var order = require ('../controllers/OrderController')

    app.route('/').get(main.initMain);
    
    app.route('/take-order').post(order.takeOrder);
    app.route('/get-state/:id').get(order.getState);
    app.route('/order-delivered/:id').get(order.orderDelivered);
}