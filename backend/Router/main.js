require('rootpath')();

let UploadController = require('backend/Controller/UploadController');

module.exports = function (app) {
    app.route('/uploadProxy')
        .post(UploadController.uploadProxy)
}