var username = process.argv[2],
    query = username ? { query: "username=" + username } : undefined,
    socket = require('socket.io-client')('http://localhost:8888', query),
    keypress = require('keypress'),
    line = '';

keypress(process.stdin);

socket.on('connect', function() {
    console.log('connected ...'); 
});

socket.on('disconnect', function() {
    console.log('disconnected');
});

socket.on('username', function(data){
    username = data;
    console.log('username is ' + username);
});

socket.on('message', function(message) {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(message.username + ': ' + message.text + '\n');
    if(line) process.stdout.write(line);
});

process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
        process.exit();
    } else if(key && key.name === 'return') {
        socket.emit('message', line);
        process.stdout.write('\n');
        line = '';
    } else if(key && key.name === 'backspace') {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        line = line.slice(0 , -1);
        process.stdout.write(line);
    } else {
        if(ch === undefined) return;
        line += ch;
        process.stdout.write(ch);
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();
