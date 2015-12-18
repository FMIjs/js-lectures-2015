#jQuery

---

## Съдържание

*   Какво е jQuery?
*   Защо jQuery?
*   Какво е $?
*   Селектори
*   DOM
*   Събития
*   Ajax
*   Ефекти
*   Deferred

---

## Какво е jQuery

jQuery е cross-browser JavaScript библиотека, създадена за улеснение на разработката на клиентски JavaScript приложения. 

jQuery предоставя мощен набор от инструменти, които създават абстракция над стандартния API, който предлагат браузърите и ни
позволява да пишем еднакъв код независимо от това дали потребителят използва IE6 или Chrome 23. Освен с невъвместимостите между различните браузъри, jQuery ни предоставя лесен и удобен за използване internal DSL за работа с client-side JavaScript.

---

## Защо jQuery?

* Малък размер (32KB, до 10KB при custom build)
* Cross-browser
* Лесна манипулация на DOM
* По-компактен код
* Голямо community
* Лесен за използване
* Добре документиран

---

## Какво е $? (1)

```javascript
$ == jQuery //true
$ === jQuery //true
$ instanceof Object //true
$ instanceof Function //true
typeof $ === 'function' //true
```

---

## Какво е $? (2)

jQuery предоставя на своите потребители 2 глобални променливи $ и jQuery, които пазят референция към един и същ обект.
$ предлага "статични методи" ($.param, $.map, $.filter, $.ajax и други), но може да бъде използван и като функция ($('.form input[type="text"]')).

---

## Utilities

В по-стари браузъри (не поддържащи ECMAScript 5) липсват полезни методи като: `filter`, `map`, `forEach` и други.
jQuery ни предоставя методите като те могат да бъдат използвани с произволни масиви посредством "статични методи" на $.

* `$.map` - прилага дадена функция към всички елементи на даден масив (или полета на обект).
* `$.filter` - филтрира масив според някакво условие зададено в callback.
* `$.each` - извиква функция подадена като аргумент с всеки един от елементите на дадена колекция.
* `$.inArray` - проверява дали даден елемент се среща в даден масив.
* `$.isArray` - проверява дали подаденият параметър е масив.
* `$.extend` - прави shallow или deep copy на даден обект.
* `$.trim` - премахва whitespace от началото и края на даден низ.
* [И други...](http://api.jquery.com/category/utilities/)

---

## Селектори (1)

Посредством jQuery можем да обхождаме DOM дървото и да селектираме елементи със специфични характеристики/свойства.
За тази цел jQuery използва CSS селекторът Sizzle. След като елементите бъдат селектирани jQuery създава техен декоратор, чрез който
могат да бъдат изпълнявани често необходими DOM манипулации.

---

## Селектори (2)

* `$(DOM_ELEMENT)` - създава jQuery wrapper на даден DOM елемент (използва се в редки случаи).
* `$('elementname')` - селектира DOM елементи по име на елемент.
* `$('#id')` - селектира DOM елемент по даден идентификатор (стойност на id атрибут).
* `$('.className')` - селектира DOM елементи по име на клас.
* `$('[attribute="value"]')` - селектира DOM елементи по стойност на атрибут.
* `$('parent > child')` - селектира всички дъщерни елементи на даден родител (в случая parent е селектор).

---

## Селектори (3)

* `$(':contains("text")')` - селектира всички елементи, които съдържат даден подниз.
* `$(':button')` - селектира всички бутони.
* `$(':image')` - селектира всички картинки.
* ...

Всички споменати селектори могат да се комбинират. В случай, че резултатното множество от селектирани елементи съдържа повече от един елемент
се връща масив от елементите.

---

## Селектори (4)

Няколко примера за използване на $ с DOM елемент.
```javascript
$(document.getElementById('input')).remove();
$(document.querySelector('#inpit')).empty();
```

* В примерите експлицитното извикване на `document.getElementById` и `document.jquerySelector` е напълно излишно Sizzle автоматично ще извика
`document.getElementById` вътрешно, при използване на `$('#input')`.

Използването на $ с DOM елемент е полезно когато имаме референция към даден DOM елемент и искаме върху него да приложим някой от методите, които ни предлага jQuery.
---

## Селектори (5)

В случай, че сме получили масив от елементи посредством "chaining" можем да приложим дадена функция върху всички:

```javascript
$('div').filter(function (idx, el) {
  return !!(idx % 2);
}).each(function (idx, el) {
  $(el).css('background-color', 'red');
});
```
Методът `each` може да бъде разгледан като функция от по-висок ред. 
Кодът в примера ще зададе червен цвят на фона на всеки втори `div` елемент.

---

## Селектори (6)

HTML псевдо елементи не могат да се селектират.
Единствено тяхното съдържание може да бъде променяно чрез "tricky" метод, който ще разгледаме по-късно.

---

## Манипулация на DOM (1)

### Създаване на DOM елементи

Посредством функцията $ могат да бъдат създавани нови DOM елементи. Подобно на употребата на $ за селектиране на елементи подаваме низ,
който обаче трябва да бъде валиден HTML:

```javascript
$('<div>Hello world!</div>');
```

Кодът по-горе ще извика: `document.createElement('div').innerHTML = 'Hello world';`


---

## Манипулация на DOM (2)

За разлика от `document.createElement`, $ може да бъде извикван и с HTML със сложна структура:

```javascript
$('<div><span class="something">Foo</span><div>Bar</div>Baz</div>')
```

В този случай, се генерира поредица от `document.createElement` извиквания за всеки бъдещ DOM елемент.

---

## Манипулации на DOM (3)

### Добавяне на елемент

* `$(child).appendTo(parent);` - Добавя дъщерен DOM елемент като последен в даден родителски
* `$(parent).append(child);` - Добавя дъщерен DOM елемент като последен в даден родителски
* `$(parent).prepend(child);` - Добавя дъщерен DOM елемент като първи в даден родителски
* `$(child1).insertAfter(child2);` - Добавя child1 преди child2
* `$(child1).insertBefore(child2);` - Добавя child1 след child2

---

## Манипулации на DOM (4)

* `$(child2).after(child1);` - Добавя child2 след child1
* `$(child2).before(child1);` - Добавя child2 преди child1
* `$(child).wrap(parent)` - "Опакова" структура от всички селектирани елемент с parent
* `$(selector).wrapInner(wrapper)` - "Опакова" HTML структура представляваща съдържанието на всеки елемент от списъка селектирани елементи
* `$(selector).wrapAll(wrapper)` - "Опакова" HTML структурата около всички елементи представляващи списъка от селектирани елементи
* Забележка в случай, че като аргумент е използван списък от елементи или селектор, който селектира множество елементи, то операциите се прилагат към всички.


---

## Манипулация на DOM (5)

### wrap vs wrapAll

```html
<div class="elem"></div>
<div class="elem"></div>
```

* wrap

```html
<script>
  $('.elem').wrap('<div class="parent"></div>');
</script>
//Result
<div class="parent">
  <div class="elem"></div>
  </div>
<div class="parent">
  <div class="elem"></div>
</div>
```

*   wrapAll

```html
$('.elem').wrap('<div class="parent"></div>');
</script>
//Result
<div class="parent">
  <div class="elem"></div>
  <div class="elem"></div>
</div>
```

---

## Манипулация на DOM (6)

### Премахване елементи

* `$(child).empty();` - Премахва всички дъщерни DOM елементи от даден родителски елемент.
* `$(child).remove();` - Изтрива даден DOM елемент и цялата информация, която jQuery е асоциирала към него.
* `$(child).detach();` - Изтрива даден DOM елемент от DOM дървото, но запазва информацията, която jQuery е асоциирала към него.
* `$(child).unwrap();` - Изтрива родителският елемент на даден дъщерен, като оставя дъщерният непроменен.
* Забележка в случай, че като аргумент е използван списък от елементи или селектор, който селектира множество елементи, то операциите се прилагат към всички.

---

## Манипулация на DOM (7)

Когато бъде извикан методът `document.createElement`, новосъздаденият елемент все още не е част от DOM дървото. Това означава, че
дори да бъде изрично зададен даден клас на елемента, то стиловете от него няма да бъдат приложени.

```javascript
<style>
.red {
  background-color: red;
}
</style>
<script>
//...
var elem = $('<div class="red"></div>');
console.log(elem.css('background-color')); //''
$(document.body).append(elem);
console.log(elem.css('background-color')); //'rgb(255, 0, 0)'
</script>
```

---

## Манипулация на DOM (8)

Можем да добавяме нови елементи към вече създадени такива дори преди да са добавени в DOM дървото:

```javascript
var elem = $('<div>foo</div>').append('<span>bar</span>');
$(document.body).append(elem);
```

---

## Манипулация на DOM (9)

Както виждате методите предлагащи изтриване и добавяне на DOM елементи предоставят по-удобен начин за работа.
Например добавянето на един елемент, последвано от неговото изтриване със стандартните средства на DOM:

```javascript
var div = document.createElement('div');
document.body.appendChild(div);
div.parentNode.removeChild(div);
```

Докато с jQuery:

```javascript
$('<div/>').appendTo(document.body).remove();
```

---

## Манипулация на DOM (10)

Замяна на елементи:

* `$(selector).replaceWith(elem)` - Заменя всички селектирани елементи с посочените, като аргумент на `replaceWith`
* `$(elem).replaceAll(selector)` - Заменя всички елементи, които съвпадат с аргумента на `replaceAll` с `elem`.

---

## Манипулация на DOM (11)

* `$(selector).html(htmlContent)` - Кратък начин за задаване на съдържанието на даден DOM елемент (алтернатива на `innerHTML`).
* `$(selector).html()` - Връща съдържаните DOM елементи на първият селектиран елемент в HTML формат.
* `$(selector).attr(key, value)` - Задава стойност `value` на атрибута `key`. В случай, че селекторът е селектирал повече от един елемент то стойността на атрибута `key` на всички селектирани елементи придобива стойност `value`.
* `$(selector).attr(key)` - Връща стойността на атрибута `key` на първият елемент от списъкът селектирани елементи.
* `$(selector).text(textValue)` - Задава текстовото съдържание на всички елементи от списъкът селектирани елементи.

---

## Манипулация на DOM (12)

* `$(selector).prop(key, value)` - Задава стойност `value` на полето `key` на всички елементи от списъкът селектирани елементи.
* `$(selector).text()` - Връща текстовото съдържание на първият елемент от колекцията и неговите наследници.
* `$(selector).prop(key)` - Връща стойността на полето `key` на първият елемент от списъкът селектирани елементи.
* `$(selector).val(value)` - Задава стойност `value` на всички елементи от списъкът селектирани елементи.
* `$(selector).val()` - Връща стойността на първият елемент от списъкът селектирани елементи.


---

## Манипулация на DOM (13)

### prop vs attr

`attr` се използва единствено за атрибути (cols, rols, type, for...), , докато `prop` за свойства на дадените елементи (disabled, checked,...).

```html
<input type="checkbox" checked="checked" />
<script>
console.log($('input').attr('checked'));    //checked
console.log($('input').prop('checked'));    //true
</script>
```
---

## Манипулация на DOM (14)

### text vs val

`val` се използва за задаване/извличане на стойността на различни контроли (select, text input, textarea).
`text` се използва за задаване на текстовата стойност на даден елемент, не е нужно той да бъде контрола. Не е добра практика за input елемент да се задава стойност, чрез text, въпреки, че в някои случаи това е възможно (textarea).

```html
<input type="text" />
<span></span>
<script>
$('input').val('foo');
$('span').text('bar');
</script>
```

---

## Манипулация на DOM (15)

Задаването на стилове на елементите се осъществява посредством задаване на различни свойства на полетата на обекта `style`:

```javascript
document.querySelector('#div').style.borderColor = '#ffcc11';
```

jQuery предлага методът `css`. Той дава възможност за задаване на няколко стила с едно негово извикване:

```javascript
$('#elem').css({
  borderColor: '#ffcc11',
  color: 'red',
  '-webkit-transform': 'rotate(30deg)',
  '-moz-transform': 'rotate(30deg)',
  '-o-transform': 'rotate(30deg)',
  '-ms-transform': 'rotate(30deg)',
  transform: 'rotate(30deg)'
});
```

Имената на полетата на обектът литерал, подаден като аргумент могат да бъдат зададени чрез имената на CSS свойствата или техните JavaScript алтернативи
(border-color или borderColor).

---

## Манипулация на DOM (16)

jQuery предлага редица методи предлагаща директна манипулация на някои от CSS свойствата:

*   `$(selector).height()` - Връща височината на първият селектиран елемент.
*   `$(selector).height(height)` - Задава височина `height` на всички селектирани елементи.
*   `$(selector).innerHeight()` - Връща височината на първият селектиран елемент.
*   `$(selector).outerHeight()` - Връща височината на първият селектиран елемент.


---

## Манипулация на DOM (17)

### height vs innerHeight vs outerHeight vs outerHeight(true)

*   `height` - връща височината на елемента (без padding).
*   `innerHeight` - връща височината на елемента като включва padding.
*   `outerHeight`- връща височината на елемента като включва padding, border
*   `outerHeight(true)` - връща височината на елемента като включва padding, border и margin


---

## Манипулация на DOM (18)

*   `$(elem).offset()` - Връща обект показващ положението на първият от селектираните елементи, спрямо горният десен ъгъл на браузъра.
*   `$(elem).position()` - Връща обект показващ положението на първият от селектираните елементи, спрямо горният десен ъгъл на родителският елемент.
*   `$(elem).scrollLeft()` - Връща позицията на хоризонталния scrollbar за първият елемент от списъкът селектирани елементи.
*   `$(elem).scrollLeft(value)` - Задава позиция на хоризонталния scrollbar за всички селектирани елемент.
*   `$(elem).scrollTop()` - Връща позицията на вертикалния scrollbar за първият елемент от списъкът селектирани елементи.
*   `$(elem).scrollTop(value)` - Задава позиция на вертикалния scrollbar за всички селектирани елемент.
* `offset` и `position` връщат обект от типа `{ top: y-value, left: x-value }`.


---

## Манипулация на DOM (19)

В стари версии на различните браузъри единственият начин за добавяне и премахване на CSS класове на елементите е чрез манипулация на низът:
`elem.className`. Низът представлява списъкът от класовете разделени с интервал. Обработката му без писане на допълнителен код е неудобна.
jQuery предлага методите `addClass`, `removeClass`, `hasClass`, които ни спестяват от следните utility функции:

```javascript
function hasClass(elem, className) {
  return elem.className.indexOf(className) >= 0;
}

function addClass(elem, className) {
  if (hasClass(elem, className)) return elem;
  elem.className += ' ' + className;
  return elem; 
}

function removeClass(elem, className) {
  if (!hasClass(elem, className)) return elem;
  elem.className = elem.className.replace(RegExp('\\s?' + className), '');
  return elem;
}
```

---

## Манипулация на DOM (20)

В нови версии на браузърите (IE10+, Firefox 3.6+, Chrome 8.0+, Safari 5.1+, Opera 11.5+) имаме полето `classList`, което е обект позволяващ ни да манипулираме класовете на деденият елемент подобно на начина, по който бихме го направили с jQuery.
jQuery ни предоставя и методът `toggleClass`, който при извикване с параметър име на клас проверява дали целевият елемент притежава този клас, в случай, че го има, то той бива премахнат, в противен случай добавен.



---

## Събития (1)

Client-side JavaScript е свързан с изпълнението на някакви събития и тяхната обработка. Това, което разработчикът е длъжен да направи, за обработката на
дадено събитие е да зададе callback, който да бъде изпълнен при случване на самото събитие. Всичко от по-ниско ниво се изпълнява от браузъра. Браузърът поддържа event loop. При случването на дадени събития те се подреждат в опашка (FIFO) и се обработват в реда на постъпването им чрез event handlers зададени от разработчикът.

```javascript
document.getElementById('btn').addEventListener('mousedown', function () {
  alert('Hello world!');
}, false); //Use capture, not supported by jQuery
```

* Забележка: addEventListener се поддържа от IE9+, Chrome 1.0+, Firefox 1.0+ (и 6.0 use capture), Opera 11.60, Safari 1.0+.

---

## Събития (2)

Стандартизирани от W3C са 2 посоки на обработка на събитията capturing и bubbling. Тъй като IE поддържа capturing от версия 9, jQuery не го поддържа изобщо (дори във версия 2+), за да запази съвместимост.
Пример:
<table>
<tr>
<td><iframe width="500" height="300" src="http://jsfiddle.net/mgechev/pcUQG/2/embedded/result,js" allowfullscreen="allowfullscreen" frameborder="0"></iframe></td>
<td><iframe width="500" height="300" src="http://jsfiddle.net/mgechev/pcUQG/1/embedded/result,js" allowfullscreen="allowfullscreen" frameborder="0"></iframe></td>
</tr>
</table>


---

## Събития (3)

jQuery създава едно допълнително ниво на абстракция над стандарните DOM събития. Освен съвместимост между APIs на различните браузъри тази индиректност помага за по-голяма независимост между конкретната имплементация на браузъра и начина на използване. Например, методът `on` ни помага да закачаме event handlers към елементи, които все още не са добавени в DOM дървото:
<iframe width="500" height="300" src="http://jsfiddle.net/mgechev/ppK7n/embedded/result,js" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


---

## Събития (4)

`on` се използва по следния начин:
```javascript
  $(selector).on('event-names', 'targets-selector' /* optional */, callback)
```
Възможни стойности за <cde>event-name</code> са: ` blur, focus, focusin, focusout, load, resize, scroll, unload, click, dblclick
, mousedown, mouseup, mousemove, mouseover, mouseout, mouseenter, mouseleave
, change, select, submit, keydown, keypress, keyup, error, contextmenu`.


---

## Събития (5)

За да избегнете memory leaks е важно, когато нямате нужда от даден елемент да извикате `remove`.
Ако искате да премахнете само един event handler можете да използвате: 

`$(selector).off('event-names', 'targets-selector' /* optional */, callback);`

За всички handlers за дадени събития: 

`$(selector).off('event-names')`

За всички събития на елементи: 

`$(selector).off()`

---

## Събития (6)

Една от най-честите причини за memory leaks са event handler-те. JavaScript GC не може да "изчисти" паметта, която се използва от event handler-те.
За да бъде премахнат даден event handler на `off`, трябва да бъде подадена същата функция, която по-рано е била подадена на `on`.
Пример:
```javascript
//Only this callback cannot be detached
$(selector).on('click', function () {
  //do something
});
```
```javascript
var callback = function () {
  //do something  
};
$(selector).on('click', callback);
$(selector).off('click', callback);
```

---

## Събития (7)

Чест проблем при обработката на събития е загубата на контекста (this).

```javascript
$(selector).on('click', function () {
  console.log(this); //DOM element
});
```

Начините за справяне са, чрез предварително съхраняване на контекста или чрез промяна на контекста на callback.

```javascript
var self = this;
$(selector).on('click', function () {
  console.log(self);
});

//Using ECMAScript 5's bind
$(selector).on('click', function () {
  console.log(this);
}.bind(this));

//Using jQuery.proxy
$(selector).on('click', jQuery.proxy(function () {
  console.log(this);
}, this));
```

---

## Събития (8)

jQuery предлага и други alias методи, които вътрешно извикват `on` или `off`. Това са `bind`, `unbind`, `blur`, `click`, `mouseenter`... и други.
Те предоставят по-малка функционалност от `on` и `off`, но в някои случаи позволяват семантично по-ясен код.

---

## Събития (9)

* `$(selector).one(event, data /* optional */, callback)` - Добавя event handler към дадени елементи, който ще бъде извикан най-много веднъж за всеки от елементите.
* `$(selector).trigger(eventName)` - Извиква всички event handler, които са добавени към селектираните елементи за даденото събитие
* `$(selector).triggerHandler(eventName)` - Извиква всички event handlers, добавени към първият от селектираинте елементи.

---

## Събития (10)

### trigger vs triggerHandler

* `trigger` предизвиква bubbling и поведението при даденото събитие по подразбиране
* `trigger` извиква всички event handlers за всички селектирани елементи, докато triggerHandler извиква само за първия
* `trigger` позволява chaining, докато triggerHandler връща последната върната стойност от извиканите event handlers.

---

## Събития (11)

### Bubbling и поведение по подразбиране

За да се предотврати поведението по подразбиране при дадено събитие (например submit на форма) се използва методът:
`preventDefault` на събитието подадено на event handler.

За предотвратяване на bubbling на събитие се използва:
`stopImmediatePropagation`

Пример:
<table>
<tr>
<td><iframe width="400" height="300" src="http://jsfiddle.net/mgechev/czre2/2/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe></td>
<td><iframe width="400" height="300" src="http://jsfiddle.net/mgechev/czre2/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe></td>
</tr>
</table>

---

## Ajax (1)

> Job interview for web developer:
> 
> - Do you know what Ajax is?
> - CORS I do.
> - Hired!

---

## Ajax (2)

Ajax позволява осъществяването на HTTP заявки от клиента към сървъра без презареждане на страницата.
Неща, които трябва да бъдат взети под внимание са:

* Same origin policy
* Асинхронност на заявките
* CORS
* Cross-browser compatibility (ако харесвате IE6)

---

## Ajax (3)

jQuery ни предлага façade за работа с API предлаган ни от браузъра. За по-стари версии на IE освен по-високо нива на абстрация получавахме и еднакъв API.
(в далечното минало IE не поддържаше XMLHttpRequest).
В момента jQuery ни позволява да не изпадаме в подробности...:

```javascript
function createXMLHttp() {
  //If XMLHttpRequest is available then using it
  if (typeof XMLHttpRequest !== 'undefined') {
    return new XMLHttpRequest;
  //if window.ActiveXObject is available than the user is using IE...so we have to create the newest version XMLHttp object
  } else if (window.ActiveXObject) {
    var ieXMLHttpVersions = ['MSXML2.XMLHttp.5.0', 'MSXML2.XMLHttp.4.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp', 'Microsoft.XMLHttp'],
    xmlHttp;
    //In this array we are starting from the first element (newest version) and trying to create it. If there is an
    //exception thrown we are handling it (and doing nothing ^^)
    for (var i = 0; i < ieXMLHttpVersions.length; i++) {
      try {
        xmlHttp = new ActiveXObject(ieXMLHttpVersions[i]);
        return xmlHttp;
      } catch (e) {
      }
    }
  }
}
```

---

## Ajax (4)

...и още...:

```javascript
function getData(url, success, error) {
  var xmlHttp = createXMLHttp(success, error);
  xmlHttp.open('get', url, true);
  xmlHttp.send(null);
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState === 4) {
      if (xmlHttp.status === 200) {
        success.call(null, xmlHttp.responseText);
      } else {
        error.call(null, xmlHttp.responseText);
      }
    } else {
      //still processing
    }
  };
}
```

---

## Ajax (5)

Като напишем просто:
`$.get(url).done(function () { /**/ }).fail(function () { /**/ });`

---

## Ajax (6)

* `$.ajax` - Изпълнява ajax заявка с параметри зададени като object literal подаден на метода и връща jqXHR.
* `$.get` - Изпълнява get заявка и връща jqXHR.
* `$.post` - Изпълнява post заявка и връща jqXHR.
* `$(elem).load(url, data, complete)` - Изпълнява get заявка с параметри зададени в data и callback, който бива извикан при успешен и неуспешен request. При успешен request съдържанието на `elem` бива променено според върнатият отговор.
* `$.getJSON()` - Подобен на `$.get`, но при успешен response имплицитно се извиква `$.parseJSON`.
* `$.getScript()` - Подобен на `$.get`, но при успешна заявка изпълнява върнатият код (не използва `eval`).

---

## Ajax (7)

### Събития

Глобални събития, чиито callbacks се извикват при настъпване на даденото събитие.

* `$(elem).ajaxComplete()` - Извиква при изпълнение на ajax заявка.
* `$(elem).ajaxError()` - Извиква при неуспешно изпълнение на ajax заявка.
* `$(elem).ajaxSend()` - Извиква преди изпращане на ajax заявка.
* `$(elem).ajaxStart()` - Извиква се при изпращане на ajax заявка.
* `$(elem).ajaxStop()` - Извиква се, когато изпълнението на всички ajax заявки е приключило.
* `$(elem).ajaxSuccess()` - Извиква се, когато изпълнението на ajax заявка е успешно.
* Полезни са в различни случаи - logging, debugging, responsive app.

---

## Ajax (8)

### APIs от ниско ниво

* `$.ajaxPrefilter(callback(options, originalOptions, jqXHR))` - Извиква се преди изпълнението на всяка ajax заявка. `options` са настройките, които ще бъдат използвани за ajax заявката, `originalOptions` са настройките, които са подадени от потребителя при извикване на ajax заявката.
* `$.ajaxSetup(options)` - Задава стойности по подразбиране за аргументите, които не са специфицирани (bad practise).
* `$.ajaxTransport(callback(options, originalOptions, jqXHR))` - Използва се за модификация на начина, по който `$.ajax` работи. Подаденият callback трябва да върне обект с методи: `abort`, `send`. Това ще са методите, които `$.ajax` ще използва за изпращане и прекратяване на заявката.
* По-добре не използвайте споменатите методи.

---

## Ajax (9)

### Ajax Utils

* `$(form).serializeArray()` - Създава масив от двойки - име, стойност отговарящи на всички контроли от дадената форма.
* `$(selector).serialize()` - Създава URL-encoded низ от селектираните елементи.
* `$.param` - Създава URL-encoded низ от масив или обект.

---

## Ajax (10)

### Примери

```javascript
$.ajax({
  url: 'http://example.com/api',
  type: 'post',
  data: { some: 'data' }
});
```

```javascript
$.ajax({
  url: 'http://example.com/api',
  type: 'post',
  contentType: 'application/json',
  data: JSON.stringify({ some: 'data' })
});
```

```javascript
$.post('http://example.com/api', { some: 'data' }).always(function () {
  console.log(arguments);
});
```

---

## Ефекти (1)

jQuery предлага методи за различни визуални ефекти - fade, транслация, анимация на произволни CSS стилове.
Всички тези ефекти прави постъпково чрез промяна на анимираното свойство всеки 10 ms със стойност зависеща от разликата между началната и крайната стойност, както и евентуално използваният easing.
В случай, че анимираме твърде много елементи по този начин или някой callback отнема твърде много време за изпълнение можем да получим накъсване на анимацията. Броят фреймове, които получаваме за 1 секунда са `1000/(16 + N)`, където `N` е броят милисекунди, които изпълнението на нашия код отнема, средно за всеки фрейм.
В съвременните браузъри това не е най-ефективният начин за анимиране, затова са създадени няколко third-party плъгини за използване на `requestAnimationFrame` и CSS3 преходи.

---

## Ефекти (2)

Няколко полезни метода:

* `$(selector).animate()` - Анимира произволни CSS свойства на елементите селектирани от дадения селектор.
* `$(selector).fadeIn(duration, callback)` - Анимира opacity на елементите селектирани от дадения селектор.
* `$(selector).fadeOut(duration, callback)` - Анимира opacity на елементите селектирани от дадения селектор.
* `$(selector).fadeToggle(duratio, easing, callback)` - Показва или скрива елемента спрямо текущата стойност на неговото opacity свойство.
* `$(selector).slideUp(duration, callback)` - Анимира височината на селектираните елементи.
* `$(selector).slideDown(duration, callback)` - Анимира височината на селектираните елементи.
* `$(selector).show(duration, callback)` - Показва елементите селектирани от дадения селектор. Този метод анимира размера на елементите, тяхното opacity и задава display block.
* `$(selector).hide(duration, callback)` - Скрива дадените елементи, като при приключване на анимациите по размера на елементе и тяхното opacity задава display - none.

---

## Ефекти (3)

Примери:
<table>
<tr>
<td><iframe width="300" height="300" src="http://jsfiddle.net/mgechev/5gqpD/embedded/result,js" allowfullscreen="allowfullscreen" frameborder="0"></iframe></td>
<td><iframe width="300" height="300" src="http://jsfiddle.net/mgechev/5gqpD/4/embedded/result,js" allowfullscreen="allowfullscreen" frameborder="0"></iframe></td>
</tr>
</table>

---

## Ефекти (4)

jQuery ни предлага `:animated` селектор, чрез който можем да селектираме всички елементи, които биват анимирани към текущия момент:
`
$(':animated').stop(); //Stop the animations of all currently animated elements
`
`stop` спира анимацията на даден елемент.

---

## Deferred (1)

Двата най-използвани начина за обработка на асинхронни събития в JavaScript са чрез callbacks (много странични ефекти, callback hell) и futures, promises.

jQuery (след версия 1.5) имплементира и двата подхода. Futures и promises са подход въведен още през 70-те години. По-късно е използван от езици като MultiLisp, Act 1.

Често използването на promises води до значително по-лесно четим код, избягване на callback hell:

```javascript
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
      // Do something with value4
      });
    });
  });
});
```

---

## Deferred (2)

### Примерна реализация (1)

[По-пълна имплементация тук](https://github.com/mgechev/light-q)

```javascript
function Promise() {
  this._doOnFail = [];
  this._doOnSuccess = [];
  this._alwaysDo = [];
}
Promise.prototype.fail = function (f) {
  this._doOnFail.push(f);
  return this;
};
Promise.prototype.success = function (f) {
  this._doOnSuccess.push(f);
  return this;
};
Promise.prototype.always = function (f) {
  this._alwaysDo.push(f);
  return this;
};
```

---

## Deferred (3)

### Примерна реализация (2)

[По-пълна имплементация тук](https://github.com/mgechev/light-q)

```javascript
function Deferred() {
  this.promise = new Promise();
}
Deferred.prototype.reject = function (reason) {
  this.promise._doOnFail.concat(this.promise._alwaysDo).forEach(function (f) {
    f.call(null, reason);
  });
};
Deferred.prototype.resolve = function (reason) {
  this.promise._doOnSuccess.concat(this.promise._alwaysDo).forEach(function (f) {
    f.call(null, reason);
  });
};
```

---

## Deferred (4)

### Начин на използване

```javascript
function doAjaxRegistration() {
  var deferred = new Deferred();
  //do some ajax stuff
  //on ajax success deferred.resolve(result);
  //on ajax error deferred.reject(error);
  return deferred.promise;
}

disableForm();
doAjaxRegistration()
.always(function () {
  enableForm();
})
.success(function () {
  showSuccessfullRegister();
})
.fail(function () {
  showUnsuccessfullRegister();
});
```

---

## Deferred (5)

jQuery предлага подобен API:

* `promise.then()` - Handlers се извикват при resolve, reject или когато deferred обектът е все още в прогрес. Позволява chaining.
* `deferred.promise()`
* `deferred.reject()`
* `deferred.resolve()`
* `promise.done()`
* `promise.fail()`
* `promise.always()`

---

## Deferred (7)

### Chaining с валидация на форма

<iframe width="500" height="300" src="http://jsfiddle.net/mgechev/fRNdK/1/embedded/result,js" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

---

## Благодаря за вниманието!
