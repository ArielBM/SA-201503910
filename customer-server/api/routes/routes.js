module.exports = function(app){
    
    const main = require ('../controllers/MainController')
    const order = require ('../controllers/OrderController')

    app.route('/').get(main.initMain);
    app.route('/make-order').post(order.makeAnOrder);
    app.route('/get-restaurant-state/:id').get(order.getRestaurantState);
    app.route('/get-delivery-state/:id').get(order.getDeliverytState);
}