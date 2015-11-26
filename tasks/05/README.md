# ES2015 Задачи

## NodeJS Streams, Events, Http

1. Да се напише конструктор функция **FileReader**, която има properties:

```
    lastLine (число)
    buffer (масив)
    ... и каквито други са ви необходими
```

и [разширява](https://nodejs.org/api/util.html#util_util_inherits_constructor_superconstructor) [stream.Writable](https://nodejs.org/api/stream.html#stream_class_stream_writable).

При идване на данни към потока те трябва да се convert-нат към String, който се разцепва спрямо '\n'.
Ако последния елемент на стринга, не е '\n' и все още потокът не е затворен трябва да запомним (в `lastLine`)
последния елемен от масива (не е цял ред). На следващото писане трябва да го конкатенираме с
новополучените данни. Всички останали редове се слагат във вътрешния масив `buffer`. Четенето на нови 
данни от страна на потока трябва да става, когато масивът `buffer` е празен.

**[stream.Readable](https://nodejs.org/api/stream.html#stream_class_stream_readable)** (прочетен файл, мрежов източник, пр.) -----*data*-----> **FileReader** (наследник на stream.Writable, имплементира [write](https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback))

FileReader също трябва да има метод `fetchLine`, който извършва асинхронна операция, която трябва да
се реализира със `setTimeout`. Този метод трябва да хвърля евент `next-line` с поредния елемент от 
масива `buffer`, а ако той не съществува и все още потокът не е затворен трябва да се прочете нов 
chunk от данни и да се повтори същата операция. Ако потокът е затворен значи сме приключили с 
четенето на данни и можем да хвърлим евента с `null`.

Въпрос: Защо трябва `fetchLine` да е асинхронен и да използваме `setTimeout` вместо [`process.nextTick`](https://nodejs.org/api/process.html#process_process_nexttick_callback_arg)?

------

2. Да се реализира конструктор функция с името **RoundRobin**, която взима като аргументи масив streams от FileReader-и. RoundRobin разширява EventEmitter и има properties:

```
    streams,
    currentLine (масив), 
    generator
    ... и каквито други са ви необходими.
```

Обектите създадени с тази функция трябва да имат и метод start, който предизвиква стартирането на генератора.

Ако имаме n на брой файла трябва към всеки един от тях да има отворен [fs.ReadStream](https://nodejs.org/api/fs.html#fs_class_fs_readstream), който е pipe-нат
към FileReader. Искаме да обикаляме по всеки един от тези FileReader-и и да взимаме по един ред.
След първото преминаване по всички потоци резултатът намиращ се в currentLine (масив с N елемента в случая) трябва да изглежда така:

```
    ["file1-Line1", "file2-Line1", ... , "fileN-Line1"]
```

След създаването на string от вида:

```
    file1-Line1 file2-Line1 ... fileN-Line1
```

искаме да хвърлим евент `new-line` с получения резултат и да продължим нататък.
Процесът спира, когато всички неща в `currentLine` са `null` и трябва да хвърлим евент `finish`.
(Някои файлове може да са по-дълги от други)

------

3. Да се създаде http сървър работещ на порт, който сме подали при стартирането на скрипта. Когато дойде request искаме да вземем pathname-а (пример http://localhost/file1/file2/file3 - pathname е /file1/file2/file3) и да го разбием на '/'. В зависимост, колко файла има зададени в url-то и дали ги има на файловата система искаме да използваме нещата от задача 1 и 2 за да върнем резултат от вида:

```text
    file1-Line1 file2-Line1 file3-Line1
    file1-Line2 file2-Line2 file3-Line2
    ...
```

Когато получим request, който иска от сървъра да му върне favicon трябва да върнем 404 със съобщение "File not found".
