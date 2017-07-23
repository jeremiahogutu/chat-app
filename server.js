//we are requiring express and socket.io to create a new server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//deliver the html file easily
app.get('/', function(req, res, next) {
  	res.sendFile(__dirname + '/public/index.html')
  });

//all static(Html, css and js) files are in the public folder
app.use(express.static('public'));


//logs a message once the client is connected. Also listens for the join event(client.js) and logs data from the client
io.on('connection', function(client) {
  	console.log('Client connected...');

  	client.on('join', function(data) {
  		console.log(data);
  	});

  	client.on('messages', function(data){
  		client.emit('thread', data);
  		client.broadcast.emit('thread', data);
  	});
  });

server.listen(7777);