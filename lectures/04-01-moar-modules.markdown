# Modules (в малко повече детайл)

Разделяме кода в отделни файлове с цел по-добра изолация на отделните парчета от програмата ни.

Спазваме DRY <small><small><small>(Don't repeat yourself)</small></small></small> принципа - модулите са удобен начин за преизползване на код.

Възползваме се от ["стандартната библиотека"](https://nodejs.org/api/) на Node.js и [огромната база](http://npmjs.com/) от допълнителни модули.

---

# Собствен модул - библиотека

```javascript
	// file math.js
  	function add(x, y) {
		return x + y;
	}

	module.exports = {
		add: add
	};

```

```javascript
	// file index.js
	var math = require('./math');
	console.log(math.add(4, 6));
```

---

# Собствен модул - клас

```javascript
	// file my_class.js
	var MyClass = function() {
		this.member = 42;
	}

	module.exports = MyClass;

```

```javascript
	// file index.js
	var myClass = require('./my_class');
	var instance = new myClass();

	console.log(instance.member);
```

---

# Модули от "стандартната библиотека"

```javascript
var fs = require('fs');

// `__dirname` връща пътя към текущия модул
var fileName = __dirname + '/out.txt';
fs.writeFileSync(fileName, "This will go in the file");
```

Документация - в страничката на [съответния модул](https://nodejs.org/api/fs.html).

---

# Външни модули

Инсталираме с `npm install <име>` в основната папка на нашето приложение:

```bash
	# в терминала
	npm install uuid
```

```javascript
	// в някой сорс файл

	var uuid = require('uuid');
	console.log(uuid.v1());
```

Документация - в страничка на модула в NPM repository-то, в случая [uuid](https://www.npmjs.com/package/uuid).

---

# Пътища за зареждане

Забележете require-ването само по име на модула - Node търси за файл/папка с това име в подпапка **node_modules** на нашата основна папка. Ако не намери, продължава да търси **node_modules** нагоре по дървото с папки.

```bash
    /home/modder/some_project/node_modules/uuid
    /home/modder/node_modules/uuid
    /home/node_modules/uuid
    /node_modules/uuid
```

Повече информация за начина, по който Node търси модули - [тук](https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders).
