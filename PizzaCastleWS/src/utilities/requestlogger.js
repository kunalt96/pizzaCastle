var fs = require('fs');

var requestLogger = (req, res, next) => {
    var logMessage = "" + new Date() + " " + req.method + " " + req.url + "\n"; 
    fs.appendFile('RequestLogger.txt', logMessage , (err) => {
        if (err) return next(err);
    });
    next();
}

module.exports = requestLogger;