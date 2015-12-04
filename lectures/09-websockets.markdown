class: center,middle
#websockets

---
.center[
#pros
]
.left-column[
#socket
* Живее „безкрайно“
* Изисква относително малко meta информация
* Комуникацията тече постоянно в двете посоки
]

.right-column[
#long polling
* Дава механизъм за оторизация
* Така или иначе имаме работещ web сървър
* Имаме добре дефинирана последователност request ⇨ response
]

---

.center[
#cons
]
.left-column[
#socket
* Low level операци ⇨ ред security забележки
* Нужно е сами да имплементираме протоколи
]

.right-column[
#long polling
* Твърде много повтаряща се meta информация
* Всяка заявка е отваряне на нов socket
]

---
class: center,middle
###DECISIONS
##DECISIONS
#DECISIONS

---
class: center,middle
![why don't we have both?](img/both.png)

---
#WebSockets

В крайна сметка една HTTP заявка се реализира чрез отваряне на TCP socket. Браузъра обаче затваря този socket след като получи response(при HTTP/1.1 може да направим няколко заявки по един socket)

WebSocket-ите са разширение на HTTP/1.1, което позволява да кажем, че искаме този socket да остане отворен неопределено време и по него да реализираме двупосочна комуникация между клиента и сървъра.

Това се случва, когато в HTTP заявката ни има header `Connection: Upgrade`

---
#WebSocket-и в клиента
```
WebSocket WebSocket(
  in DOMString url,
  in optional DOMString protocols
);

WebSocket WebSocket(
  in DOMString url,
  in optional DOMString[] protocols
);
```

---
#WebSocket-и в клиента
```javascript
var socket = new WebSocket("ws://www.example.com/socketserver");

socket.onopen = function(event) {
  console.log('connected!');
  socket.send('Very first transmission on this socket');
};

socket.onmessage = function(event) {
  console.log('The server sent', event.data, 'through the socket');
};
```

---
#WebSocket-и в клиента

Едно извикване на `send` в клиента предизвиква точно един `message` event в сървъра и обратното.

---
#Typed arrays

В някои случаи имаме нужда от данни в по-суров вид. Такива случаи могат да бъдат комуникация по websocket или пък комуникация с webworker.
Изпращането на инстанции на `Number` през websocket, или пък някаква форма на странно кодиране на числа в `String` би било доста неефективно.

---
#Typed arrays

За целта javascript ни предоставя `ArrayBuffer` обекти, които представляват буквално „парче памет“. Дължината им се измерва в байтове. Не можем директно да манипулираме елементите на един `ArrayBuffer`. За целта използваме типизирани масиви, които предоставят `DataView`, през което да достъпваме данните в него.

---
#Typed arrays

* `Int8Array`
* `Int16Array`
* `Int32Array`
* `Uint8Array`
* `Uint8CLampedArray`
* `Uint16Array`
* `Uint32Array`
* `Float32Array`
* `Float64Array`

---
#Typed arrays

![typed arrays](img/typed_arrays.png)

---
#Typed arrays = WebSockets

```javascript
var array = Int8Array(3);
array[0] = 13;
array[1] = 42;
array[2] = 66; //666 > 255 :(
socket.binaryType = 'arraybuffer';
socket.send(array);
```

---
#socket.io
И все пак светът е страшен, може пък да попаднем в среда, където няма websocket-и.

Според [Can I Use](http://caniuse.com/#search=websockets) около 82% от интернет потребителите ползват браузър поддържащ WebSocket-и. За някои проекти това число може да е малко.

Отделно в случаите когато не се интересуваме толкова много от пренасяне на binary данни, а предпочитаме по-лесна комуникация с json [socket.io](http://socket.io/) е прекрасно решение.

Съществуват servers имплементации за node, python, ruby, go, java, C#(WTF?!) etc…

---
#socket.io
##благини
Автоматичен fallback до различни транспорти според средата, в която се изпълнява кода.

* WebSockets
* AJAX long polling
* JSONP
* HTTP Streaming
* Flash sockets(евентуално с допълнителна конфигурация)

---
#socket.io
##благини

Имаме `EventEmitter` интерфейс(`on` метод) и можем да се закачаме за произволни event-и. Доста по-добре от един единствен `onmessage`.

```javascript
var socket = io('http://localhost');
socket.on('someeventwemadeup', function(dataр) {
  console.log('We got that custom event we just made up!');
});
```
--
Пращаме/получаваме директно js обекти.
```javascript
socket.send({ it: 'is', a: 'real', javascript: 'object'});
```

---
#socket.io
##namespaces
Всеки `socket.io` обект може да принадлежи на определен namespace. Това позволява separation of concerns, като едно съобщение може да бъде пращано само по определени socket-и, а не по всички.

```javascript
var socket = io('http://localhost/stats');
```

```javascript
io.emit('data', '/stats');
```

Това ще рече, че socket.io сървъра слуша на `http://localhost`, а нашия сокет обект ще бъде в `/stats` namespace-а.

---
#socket.io
##channels

Когато един socket.io обект се свърже към определен namespace, той не може да го промени. Можем обаче да групираме socket-ите в канали и да променяме каналите, в които се намират в runtime.

```javascript
socket.join('a channel');

…

socket.leave('a channel');
```

```javascript
io.to('a channel').emit('data');
```

---
class: center,middle
###VNC имплементацията на Минко е [в джитхюб](https://github.com/FMIjs/js-lectures-2014/tree/master/tasks/08/vnc)
