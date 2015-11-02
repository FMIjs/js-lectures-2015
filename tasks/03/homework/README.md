# Observers

## Directory structure

```
.
├── index.js
├── lib
│   ├── observables
│   │   ├── Observable.js
│   │   └── PostsCollection.js
│   └── observers
│       ├── LogObserver.js
│       ├── MailObserver.js
│       └── Observer.js
├── logs
├── package.json
└── public
    ├── index.html
    └── src
        └── main.js
```

Run `npm install` in the root of the bootstrap directory in order to install all node dependencies.

Run `node index.js` in order to start the express application. When you open the URL [http://localhost:3000](http://localhost:3000), you should see HTML page with text input, text area and a button.

Take a look at the implementation of the constructor function `Observable`.
Review the "interface" `Observer`.

Extend the constructor function `Observable` in `PostsCollection` and implement the method `addPost`.

### Implement the "interface" of `Observer` in `LogObserver` and `MailObserver`.

When the method update of `LogObserver` is being called it should create a new file with name `Date.now() + '.txt'` and content: "[current date] Title Content".
When the method update of `MailObserver` is being called it should send a new email message with subject the title of the post and content, the post's content.

Instructions about the required APIs are available in `LogObserver.js` and `MailObserver.js`.

Inside `index.js` create new instances of the both observers and set the appropriate configuration. Add the observers to a new object, instance of `PostsCollection`.

If the implementation is correct, when you add new post through the web interface or `addPost` method, the application should create new file in the `logs` directory and email with the title of the article should be sent, to the destination you've set.
