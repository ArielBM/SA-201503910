var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

var routes = require('./api/routes/routes.js');
routes(app);

app.listen(port, () => {
    console.log(`El Servidor de "Repartidor" está corriendo en: http://localhost:${port}`);
    const axios = require('axios')

    axios
        .post('http://localhost:3010/api/enroll', {

            puerto: port,
            servidor: "repartidor"

        })
        .then(res2 => {
            //console.log(res2["data"])
        })
        .catch(error => {
            console.log(error)
        })
});