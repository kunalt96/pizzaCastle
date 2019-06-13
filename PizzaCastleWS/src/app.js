var express = require('express');
var create = require('./model/dbsetup');
var bodyParser = require('body-parser');
var myErrorLogger = require('./utilities/errorlogger');
var myRequestLogger = require('./utilities/requestlogger');
var router = require('./routes/routing')

var cors = require('cors');
var app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(myRequestLogger);
app.use('/', router);

app.use(myErrorLogger);


app.post('/create', (req, res, next) => {
    create.setupDb().then((data) => {
        res.send(data)
    }).catch((err) => {
        next(err)
    })
})

app.listen(3000);
console.log("Server listening in port 3000");


module.exports = app