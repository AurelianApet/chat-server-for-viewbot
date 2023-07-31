const serverIO = require('socket.io');
//const clientIO = require('socket.io-client');
const clientIOProxy = require('socket.io-proxy');
var child_process = require("child_process");
var fs = require('fs');

module.exports = function(app, port) {

    var proxyList = new Array();
    
    var server = app.listen(port, function(){
        console.log("Express Server has started on port.",port);
    });

    

    var serverSocket = serverIO(server);
    console.log('start-server');
    serverSocket.on('connection', function(sSocket)
    {
        console.log('local-server-connect: ', new Date());
        var clientSocket = null;

        sSocket.on('connect-online', function(data){
            let proxy = data.proxyUrl;

            console.log(proxy);

            clientIOProxy.init('http://' + proxy);
            clientSocket = clientIOProxy.connect("https://chat1.neolive.kr");
            //clientSocket = clientIO.connect("http://localhost:4000");

            clientSocket.on('connect', function () {
                console.log('send-connect-client');
                sSocket.emit('connect-client', {});
            });

            clientSocket.on('Init', function (data) {
                console.log('send-init-client');
                sSocket.emit('Init', data);
            });

            clientSocket.on('UserInfo', function (data) {
                console.log('send-userinfo-client');
                sSocket.emit('UserInfo', data);
            });

            clientSocket.on('Login', function (data) {
                console.log('send-login-client');
                sSocket.emit('Login', data);
            });

            clientSocket.on('WatchInfo', function (data) {
                console.log('send-watchinfo-client');
                sSocket.emit('WatchInfo', data);
            });

            clientSocket.on('EnterRoom', function (data) {
                console.log('send-EnterRoom-client');
                sSocket.emit('EnterRoom', data);
            });

            clientSocket.on('MemberList', function (data) {
                console.log('send-MemberList-client');
                sSocket.emit('MemberList', data);
            });

            clientSocket.on('MissionInfo', function (data) {
                console.log('send-MissionInfo-client');
                sSocket.emit('MissionInfo', data);
            });

            clientSocket.on('MemberJoin', function (data) {
                console.log('send-MemberJoin-client');
                sSocket.emit('MemberJoin', data);
            });

            clientSocket.on('ChatMessage', function (data) {
                console.log('send-ChatMessage-client');
                sSocket.emit('ChatMessage', data);
            });
        });

        sSocket.on('Init', function(data){
            console.log('call-init-remote');
            clientSocket.emit('Init', data);
        });

        sSocket.on('UserInfo', function(data){
            console.log('call-UserInfo-remote');
            clientSocket.emit('UserInfo', data);
        });
        sSocket.on('Login', function(data){
            console.log('call-Login-remote');
            clientSocket.emit('Login', data);
        });

        sSocket.on('WatchInfo', function(data){
            console.log('call-WatchInfo-remote');
            clientSocket.emit('WatchInfo', data);
        });

        sSocket.on('EnterRoom', function(data){
            console.log('call-EnterRoom-remote');
            clientSocket.emit('EnterRoom', data);
        });

        sSocket.on('MemberList', function(data){
            console.log('call-MemberList-remote');
            clientSocket.emit('MemberList', data);
        });

        sSocket.on('MissionInfo', function(data){
            console.log('call-MissionInfo-remote');
            clientSocket.emit('MissionInfo', data);
        });

        sSocket.on('MemberJoin', function(data){
            console.log('call-MemberJoin-remote');
            clientSocket.emit('MemberJoin', data);
        });

        sSocket.on('ChatMessage', function(data){
            console.log('call-ChatMessage-remote');
            clientSocket.emit('ChatMessage', data);
        });
    });
};