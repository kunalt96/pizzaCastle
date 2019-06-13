var fs = require('fs');

var errorLogger = (err, req, res, next) => {
    if (err) {
        fs.appendFile('ErrorLogger.txt', new Date() + " - " + err.stack + "\n", (err) => {
            if (err) {
                console.log("Could not log the errors");
            }
        });
        if (err.status) {
            res.status(err.status);
        }
        else {
            res.status(500)
        }
        res.json({ "message": err.message })
    }
    next();
}

module.exports = errorLogger;