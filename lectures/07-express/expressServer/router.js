var expressRouter = require('express').Router();
var fs = require('fs');

var books = [{
    id: '1',
    author: 'None',
    name: 'book1'
},{
    id: '2',
    author: 'None1',
    name: 'book2'
},{
    id: '3',
    author: 'None',
    name: 'book3'
}];

expressRouter.get('/', function(req, res) {
    var filter = req.query;
    if(Object.keys(filter).length === 0) return res.json(books);
    var result = books.filter(function(book) {
        var flag = true;
        for(var prop in filter) {
            flag = (filter[prop] === book[prop]);
        }
        return flag;
    });
    res.json(result);
});

expressRouter.get('/:bookId', function(req, res) {
    var book = books[req.params.bookId];
    if(!book) res.status(404).send('Book not found!');
    res.json(book);
});

expressRouter.post('/', function(req, res) {
    books.push(req.body);
    res.status(201).end();
});

module.exports = expressRouter;
