// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {

  // when the client emits 'new message', this listens and executes
  socket.on('v', function (data) {
    socket.broadcast.emit('newv', {
      vx: data[0], 
      vy: data[1]
    });
  });

});
