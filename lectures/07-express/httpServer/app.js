var http = require('http');
var port = 8888;

var server = http.createServer(function(req, res) {
    var allData = [];

    req.on('data', function(chunk) {
        allData.push(chunk);
    });

    req.on('end', function() {
       var host = allData.toString();
       var request = http.request({ host: host, path: '/' }, function(req) {
           var htmlData = [];
           req.on('data', function(htmlChunk) {
               htmlData.push(htmlChunk);
           });
           req.on('end', function() {
               res.setHeader('Status code', 200);
               res.write(htmlData.toString());
               res.end();
           });
       });
       request.end();
    });
});

server.listen(port, function(){
    console.log('Server listening on ' + port);
});