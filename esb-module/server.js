var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3010;

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
    console.log(`Enterprise Service Bus online on: http://localhost:${port}`);
});