//const clientIO = require('socket.io-client');
const clientIOProxy = require('socket.io-proxy');
var fs = require('fs');
var proxyIpList = new Array();
var proxyPortList = new Array();
var localPortList = new Array();
var proxyList = new Array();

var connectSocket = function() {
    var proxyIp = proxyIpList[Math.floor(Math.random() * proxyIpList.length)];
    var proxyPort = proxyPortList[Math.floor(Math.random() * proxyPortList.length)];
    var index = Math.floor(Math.random() * proxyPortList.length);
    var proxyUrl = proxyList[index];
    var localPort = localPortList[index];

    console.log('http://' + proxyUrl);

    //clientIOProxy.init('http://' + proxyIp + ":" + proxyPort);
    clientIOProxy.init('http://' + proxyUrl);
    var clientSocket = clientIOProxy.connect("https://chat1.neolive.kr", localPort);
    process.on('message', function (data) {
        var type = data["type"];
        var msg = data["msg"];
        console.log(type + " : ");
        console.log(msg);
        clientSocket.emit(type, msg);
    });

    clientSocket.on('connect', function () {
        console.log('=== 팬더 서버 소켓 콘넥 성공 ===');
        clientSocket.on('Init', function (data) {
            process.send({ type: "Init", msg: data });
        })
        clientSocket.on('UserInfo', function (data) {
            process.send({ type: "UserInfo", msg: data });
        })
        clientSocket.on('Login', function (data) {
            process.send({ type: "Login", msg: data });
        })
        clientSocket.on('WatchInfo', function (data) {
            process.send({ type: "WatchInfo", msg: data });
        })
        clientSocket.on('EnterRoom', function (data) {
            process.send({ type: "EnterRoom", msg: data });
        })
        clientSocket.on('MemberList', function (data) {
            process.send({ type: "MemberList", msg: data });
        })
        clientSocket.on('MissionInfo', function (data) {
            process.send({ type: "MissionInfo", msg: data });
        })
        clientSocket.on('MemberJoin', function (data) {
            process.send({ type: "MemberJoin", msg: data });
        })
        clientSocket.on('ChatMessage', function (data) {
            process.send({ type: "ChatMessage", msg: data });
        })
    });
}


function readProxy(callback)
{
    fs.readFile(__dirname + '/proxy.txt', function(err, data) {
        var proxyArray = data.toString().split("\n");
        for(var i = 0; i < proxyArray.length; i ++)
        {
            proxyIpList.push(proxyArray[i].split(":")[0]);
            proxyPortList.push(proxyArray[i].split(":")[1]);
            localPortList.push(Math.floor(Math.random() * 60000) + 5000);
            proxyList.push(proxyArray[i]);
        }
        callback();
    });
}

readProxy(connectSocket);

