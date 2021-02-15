module.exports = function(app){
    var main = require ('../controllers/MainController')

    app.route('/').get(main.initMain);
}