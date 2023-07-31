require('rootpath')();
var fs = require('fs');

exports.uploadProxy = function(req, res, next) {
	console.log("upload-proxy");
    fs.writeFile(__dirname + '/proxy.txt', req.body["data"], {flag:'w'}, function (err, data) {
    });
    return res.json({
        success: "true"
    });
};