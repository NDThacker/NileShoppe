//import neccessary modules

const fs = require('fs');

let errorLogger = (err, req, res, next) => {

	fs.appendFile('ErrorLogger.txt', new Date().toDateString() + " - " + err.stack + "\n", (error) => {
		if (error) {
			console.log(error);
		}
	});
	if (err.status) {
		res.status(err.status);
	} else {
		res.status(500)
	}

	res.json({ "message": err.message })
	next();
}

module.exports = errorLogger;
