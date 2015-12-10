var port = 8888,
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    counter = 0;

io.on('connection', function(socket) {
    socket.username = socket.handshake.query.username || 'user' + (++counter);
    socket.emit('username', socket.username);

    socket.on('message', function(msg) {
        console.log('new message from ' + socket.username + ': ' + msg);
        this.broadcast.emit('message', { text: msg, username: this.username });
    });

    socket.on('disconnect', function() {
        console.log('user ' + this.username + ' disconnected');
        counter--;
    });
});

http.listen(port, function() {
  console.log('listening on ' + port);
});