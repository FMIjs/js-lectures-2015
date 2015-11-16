# Express.js Server

* Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

[API Reference](http://expressjs.com/api.html)


## Task 1 - Restful API

* `GET /all_books` - returns all the books for all the users
* `GET /books/:bookId` - returns the data for a book by a given bookId
* `POST /book` - expects user, author, title, descriptionText and rate in the body data. Creates a new book and returns a bookId, which should be unique for every book!
* `GET /all_users` - returns all the registered users.
* `GET /all_authors` - returns all the authors for the books we have in our library.
* `POST /register` - expects user as an argument. Creates a new user and returns a key for that user. If the user  exists just returns a 409 response code.
* `DELETE /book` - expects bookId as an argument. Deletes the bookId if the book exists, otherwise return a 403 response code.

* `GET /all_books?where[${someProp}]=:someVal` - A dynamic filter API endpoint which returns all books by a passed fiter properties
```
/all_books?where[rate]=7`
/all_books?where[title]=The%20Great%20Gatsby`
```

### Testing
```
curl -H "Content-Type: application/json" --data '{"user": "billy", "author": "Steinbeck",... }' http://localhost:8080/
```