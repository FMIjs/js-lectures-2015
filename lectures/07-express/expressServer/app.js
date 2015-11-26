var express = require('express');
var router = require('./router');
var fs = require('fs');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var app = express();
var port = 8888;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/books', router);

app.post('/upload', busboy(), function(req, res) {
    if(!req.busboy) return res.status(500).send('Incorrect post headers!');
    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        var ws = fs.createWriteStream('./uploads/'+ filename);
        ws.on('finish', function() {
            console.log('File saved ...');
            res.status(200).end();
        });
        file.pipe(ws);
    });
    req.pipe(req.busboy);
});

//Serve static content
app.use(express.static(__dirname + '/static'));

app.listen(port, function() {
    console.log('Server listening on ' + port + ' ...');
});